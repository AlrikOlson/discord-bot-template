/**
 * Bot Configuration
 * Centralized configuration options for the bot
 * Note: Command deployment settings are for reference only as deployment is handled separately
 */
module.exports = {
    // Bot presence configuration
    presence: {
        activities: [{
            name: '/help',
            type: 'LISTENING',
        }],
        status: 'online',
    },

    // Colors for embeds
    colors: {
        primary: '#5865F2',    // Discord blurple
        success: '#57F287',    // Green
        error: '#ED4245',      // Red
        warning: '#FEE75C',     // Yellow
    },

    // Command categories
    categories: {
        GENERAL: 'General',
        UTILITY: 'Utility',
        ADMIN: 'Administration',
    },

    // Development options
    development: {
        debugLevel: process.env.NODE_ENV === 'development' ? 'debug' : 'warn',
        enableCommandLogging: true,
    },

    // Cooldown settings (in seconds)
    cooldowns: {
        default: 3,
        commands: {
            // Specific command cooldowns
            ping: 5,
        },
    },

    // Deployment configuration reference
    // Note: These settings are for documentation only
    // Actual deployment is handled by src/scripts/deploy.js
    deployment: {
        development: {
            type: 'guild',
            updateTime: 'instant',
            requiresGuildId: true,
        },
        production: {
            type: 'global',
            updateTime: '1 hour',
            requiresGuildId: false,
        },
    },

    // Command validation schema
    // Used to ensure all commands follow the same structure
    commandSchema: {
        requiredProperties: ['data', 'execute'],
        optionalProperties: ['cooldown', 'permissions', 'category'],
    },
};
