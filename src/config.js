/**
 * Bot configuration
 * Centralized configuration options for the bot
 */
module.exports = {
    // Bot presence configuration
    presence: {
        activities: [{
            name: '/help',
            type: 'LISTENING'
        }],
        status: 'online'
    },

    // Colors for embeds
    colors: {
        primary: '#5865F2',    // Discord blurple
        success: '#57F287',    // Green
        error: '#ED4245',      // Red
        warning: '#FEE75C'     // Yellow
    },

    // Command categories
    categories: {
        GENERAL: 'General',
        UTILITY: 'Utility',
        ADMIN: 'Administration'
    },

    // Development options
    development: {
        debugLevel: process.env.NODE_ENV === 'development' ? 'debug' : 'warn',
        enableCommandLogging: true
    },

    // Cooldown settings (in seconds)
    cooldowns: {
        default: 3,
        commands: {
            // Specific command cooldowns
            ping: 5
        }
    }
};