import dotenv from 'dotenv';
import { Client, GatewayIntentBits, Collection, Partials } from 'discord.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import config from './config.js';
import ErrorHandler from './events/errorHandler.js';

// Initialize dotenv
dotenv.config();

// ES Module dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Discord Bot Main Class
 * Note: Command deployment is handled separately via src/scripts/deploy.js
 * This separation is intentional for security and best practices
 */
class Bot {
    constructor() {
        this.client = new Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildMembers,
            ],
            partials: [
                Partials.Channel,
                Partials.Message,
                Partials.User,
                Partials.GuildMember,
            ],
        });

        // Attach commands collection to the client itself
        this.client.commands = new Collection();

        // Initialize bot systems
        this.initialize();
    }

    /**
     * Initializes all bot systems and handlers
     */
    async initialize() {
        // Initialize error handlers first
        ErrorHandler.initializeProcessErrorHandlers(this.client);

        await this.loadCommands();
        this.setupEventHandlers();
        this.setupCooldowns();
    }

    /**
     * Loads all command files from the commands directory
     */
    async loadCommands() {
        const commandsPath = path.join(__dirname, 'commands');

        try {
            const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

            for (const file of commandFiles) {
                const filePath = path.join(commandsPath, file);
                const commandURL = `file://${filePath}`;
                const commandModule = await import(commandURL);
                const command = commandModule.default;

                if ('data' in command && 'execute' in command) {
                    this.client.commands.set(command.data.name, command);
                    console.log(`Loaded command: ${command.data.name}`);
                } else {
                    console.warn(`[WARNING] Command at ${file} is missing required properties`);
                }
            }
        } catch (error) {
            console.error('Error loading commands:', error);
            process.exit(1);
        }
    }

    /**
     * Sets up the command cooldown system
     */
    setupCooldowns() {
        this.client.cooldowns = new Collection();
    }

    /**
     * Handles command cooldown checking
     * @param {Object} interaction - Discord interaction object
     * @param {Object} command - Command object
     * @returns {boolean} Whether the command is on cooldown
     */
    handleCooldown(interaction, command) {
        if (!this.client.cooldowns.has(command.data.name)) {
            this.client.cooldowns.set(command.data.name, new Collection());
        }

        const now = Date.now();
        const timestamps = this.client.cooldowns.get(command.data.name);
        const cooldownAmount = (command.cooldown || config.cooldowns.default) * 1000;

        if (timestamps.has(interaction.user.id)) {
            const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                interaction.reply({
                    content: `Please wait ${timeLeft.toFixed(1)} more second(s) before using \`${command.data.name}\` again.`,
                    ephemeral: true,
                });
                return true;
            }
        }

        timestamps.set(interaction.user.id, now);
        setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
        return false;
    }

    /**
     * Sets up all event handlers for the bot
     */
    setupEventHandlers() {
        // Ready event
        this.client.once('ready', () => {
            console.log(`Logged in as ${this.client.user.tag}`);
            this.setPresence();
        });

        // Handle interactions
        this.client.on('interactionCreate', async (interaction) => {
            if (!interaction.isCommand()) return;

            const command = this.client.commands.get(interaction.commandName);
            if (!command) return;

            // Check cooldown before executing command
            if (this.handleCooldown(interaction, command)) return;

            try {
                await command.execute(interaction);
            } catch (error) {
                const errorResponse = await ErrorHandler.handleError(error, {
                    command: interaction.commandName,
                    user: interaction.user,
                    guild: interaction.guild,
                    channel: interaction.channel,
                });

                if (interaction.replied || interaction.deferred) {
                    await interaction.editReply(errorResponse);
                } else {
                    await interaction.reply(errorResponse);
                }
            }
        });

        // Handle client errors
        this.client.on('error', async (error) => {
            await ErrorHandler.handleError(error, { type: 'Client Error' });
        });

        // Handle shard errors if sharding is enabled
        this.client.on('shardError', async (error, shardId) => {
            await ErrorHandler.handleError(error, {
                type: 'Shard Error',
                shardId: shardId,
            });
        });
    }

    /**
     * Sets the bot's presence status
     */
    setPresence() {
        try {
            this.client.user.setPresence({
                activities: config.presence.activities,
                status: config.presence.status,
            });
        } catch (error) {
            console.error('Failed to set presence:', error);
        }
    }

    /**
     * Starts the bot and handles login
     */
    async start() {
        try {
            // Log startup mode
            console.log(`Starting bot in ${process.env.NODE_ENV} mode`);
            console.log('Note: Command deployment is handled separately via "npm run deploy"');

            // Login to Discord
            await this.client.login(process.env.TOKEN);
        } catch (error) {
            console.error('Failed to start bot:', error);
            process.exit(1);
        }
    }
}

// Create and start the bot
const bot = new Bot();
bot.start();

// Export the bot instance for testing purposes
export default bot;
