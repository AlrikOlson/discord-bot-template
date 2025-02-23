export const categories = {
    GENERAL: 'General',
    UTILITY: 'Utility',
    ADMIN: 'Administration',
};

export const colors = {
    primary: '#5865F2',    // Discord blurple
    success: '#57F287',    // Green
    error: '#ED4245',      // Red
    warning: '#FEE75C',     // Yellow
};

export const presence = {
    activities: [{
        name: '/help',
        type: 'LISTENING',
    }],
    status: 'online',
};

export const development = {
    debugLevel: process.env.NODE_ENV === 'development' ? 'debug' : 'warn',
    enableCommandLogging: true,
};

export const cooldowns = {
    default: 3,
    commands: {
        // Specific command cooldowns
        ping: 5,
    },
};

export const deployment = {
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
};

export const commandSchema = {
    requiredProperties: ['data', 'execute'],
    optionalProperties: ['cooldown', 'permissions', 'category'],
};

export default {
    categories,
    colors,
    presence,
    development,
    cooldowns,
    deployment,
    commandSchema,
};
