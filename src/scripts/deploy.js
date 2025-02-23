import { REST, Routes } from 'discord.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { env } from '../config/env.js';
import logger from '../utils/logger.js';

// ES Module dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Command Deployment Script
 *
 * This script is intentionally separate from the main bot code for several important reasons:
 * 1. Security: Prevents accidental command deployments during runtime
 * 2. Rate Limiting: Discord limits how often you can update commands
 * 3. Best Practices: Follows Discord.js recommended patterns
 * 4. Resource Management: Keeps deployment code out of the running bot's memory
 *
 * Usage:
 * - Development: npm run deploy:dev (instantly updates commands in your test server)
 * - Production: npm run deploy:prod (updates global commands, takes up to 1 hour to propagate)
 */

const commands = [];
// Note: Going up one directory since we're now in scripts/
const commandsPath = path.join(__dirname, '..', 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// Load all command files
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const commandURL = `file://${filePath}`;
    const commandModule = await import(commandURL);
    const command = commandModule.default;

    if ('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON());
        logger.info(`Loaded command: ${command.data.name}`);
    } else {
        logger.warn(`Command at ${file} is missing required properties`);
    }
}

const rest = new REST().setToken(env.TOKEN);

// Deploy commands
try {
    logger.info(`Started refreshing ${commands.length} application (/) commands.`);

    let data;
    if (env.NODE_ENV === 'production') {
        // Global commands - can take up to 1 hour to update
        logger.info('Deploying GLOBAL commands (can take up to 1 hour to propagate)...');
        data = await rest.put(
            Routes.applicationCommands(env.CLIENT_ID),
            { body: commands },
        );
    } else {
        // Guild-specific commands - update instantly
        if (!env.GUILD_ID) {
            throw new Error('GUILD_ID is required for development environment');
        }
        logger.info('Deploying GUILD commands (development mode - instant update)...');
        data = await rest.put(
            Routes.applicationGuildCommands(env.CLIENT_ID, env.GUILD_ID),
            { body: commands },
        );
    }

    logger.info(`Successfully reloaded ${data.length} application (/) commands.`);
} catch (error) {
    logger.error('Error deploying commands:', error);
    process.exit(1);
}
