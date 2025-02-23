import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Export environment configuration
export const env = {
    // Node Environment
    NODE_ENV: process.env.NODE_ENV || 'development',

    // Discord Configuration
    TOKEN: process.env.TOKEN,
    CLIENT_ID: process.env.CLIENT_ID,
    GUILD_ID: process.env.GUILD_ID,

    // Logging Configuration
    LOG_LEVEL: process.env.LOG_LEVEL || 'info',
    LOG_FORMAT: process.env.LOG_FORMAT || 'json',
    LOG_MAX_FILES: parseInt(process.env.LOG_MAX_FILES || '5'),
    LOG_MAX_SIZE: process.env.LOG_MAX_SIZE || '5m',

    // Error Reporting
    SENTRY_DSN: process.env.SENTRY_DSN,
};

// Validate required environment variables
const requiredEnvVars = ['TOKEN', 'CLIENT_ID'];
const missingEnvVars = requiredEnvVars.filter(varName => !env[varName]);

if (missingEnvVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
}

export default env;
