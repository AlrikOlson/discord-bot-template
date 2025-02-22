require('dotenv').config();
const { Client, GatewayIntentBits, Collection, Partials } = require('discord.js');
const fs = require('fs');
const path = require('path');

class Bot {
  constructor() {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
      ],
      partials: [
        Partials.Channel,
        Partials.Message,
        Partials.User,
        Partials.GuildMember
      ]
    });

    this.commands = new Collection();
    this.loadCommands();
    this.setupEventHandlers();
  }

  loadCommands() {
    const commandsPath = path.join(__dirname, 'commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command = require(filePath);

      if ('data' in command && 'execute' in command) {
        this.commands.set(command.data.name, command);
        console.log(`Loaded command: ${command.data.name}`);
      } else {
        console.log(`[WARNING] Command at ${file} is missing required properties`);
      }
    }
  }

  setupEventHandlers() {
    // Ready event
    this.client.once('ready', () => {
      console.log(`Logged in as ${this.client.user.tag}`);
    });

    // Handle interactions
    this.client.on('interactionCreate', async (interaction) => {
      if (!interaction.isCommand()) return;

      const command = this.commands.get(interaction.commandName);
      if (!command) return;

      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(error);
        const reply = {
          content: 'There was an error executing this command!',
          ephemeral: true
        };
        
        if (interaction.replied || interaction.deferred) {
          await interaction.editReply(reply);
        } else {
          await interaction.reply(reply);
        }
      }
    });

    // Handle errors
    this.client.on('error', (error) => {
      console.error('Discord client error:', error);
    });
  }

  async start() {
    try {
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

// Handle process termination
process.on('SIGINT', () => {
  console.log('Bot is shutting down...');
  bot.client.destroy();
  process.exit(0);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled promise rejection:', error);
});