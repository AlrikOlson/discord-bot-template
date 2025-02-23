import winston from 'winston';
import path from 'path';
import { fileURLToPath } from 'url';
import { env } from '../config/env.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define log formats
const consoleFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp, ...metadata }) => {
        let msg = `${timestamp} [${level}]: ${message}`;
        if (Object.keys(metadata).length > 0) {
            msg += `\n${JSON.stringify(metadata, null, 2)}`;
        }
        return msg;
    }),
);

const jsonFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
);

// Create the logger
const logger = winston.createLogger({
    level: env.LOG_LEVEL,
    format: env.LOG_FORMAT === 'json' ? jsonFormat : consoleFormat,
    transports: [
        // Console transport
        new winston.transports.Console({
            format: consoleFormat,
        }),
        // File transport for errors
        new winston.transports.File({
            filename: path.join(__dirname, '../../logs/error.log'),
            level: 'error',
            format: jsonFormat,
            maxsize: parseFileSize(env.LOG_MAX_SIZE),
            maxFiles: env.LOG_MAX_FILES,
        }),
        // File transport for all logs
        new winston.transports.File({
            filename: path.join(__dirname, '../../logs/combined.log'),
            format: jsonFormat,
            maxsize: parseFileSize(env.LOG_MAX_SIZE),
            maxFiles: env.LOG_MAX_FILES,
        }),
    ],
    // Handle exceptions and rejections
    exceptionHandlers: [
        new winston.transports.File({
            filename: path.join(__dirname, '../../logs/exceptions.log'),
            format: jsonFormat,
            maxsize: parseFileSize(env.LOG_MAX_SIZE),
            maxFiles: env.LOG_MAX_FILES,
        }),
    ],
    rejectionHandlers: [
        new winston.transports.File({
            filename: path.join(__dirname, '../../logs/rejections.log'),
            format: jsonFormat,
            maxsize: parseFileSize(env.LOG_MAX_SIZE),
            maxFiles: env.LOG_MAX_FILES,
        }),
    ],
});

/**
 * Parse file size string to bytes
 * @param {string} size - Size string (e.g., '5m', '1g')
 * @returns {number} Size in bytes
 */
function parseFileSize(size) {
    const units = {
        'b': 1,
        'k': 1024,
        'm': 1024 * 1024,
        'g': 1024 * 1024 * 1024,
    };

    const match = size.toLowerCase().match(/^(\d+)([bkmg])?$/);
    if (!match) return 5 * 1024 * 1024; // Default to 5MB

    const number = parseInt(match[1]);
    const unit = match[2] || 'b';

    return number * units[unit];
}

// Log initial configuration in development only
if (env.NODE_ENV !== 'production') {
    logger.info('Logger initialized with configuration:', {
        level: env.LOG_LEVEL,
        format: env.LOG_FORMAT,
        maxFiles: env.LOG_MAX_FILES,
        maxSize: env.LOG_MAX_SIZE,
        nodeEnv: env.NODE_ENV,
    });
}

export default logger;
