import { randomUUID } from 'crypto';
import logger from '../utils/logger.js';
import { env } from '../config/env.js';

class ErrorHandler {
    static async handleError(error, context = {}) {
        // Generate unique error ID for tracking
        const errorId = randomUUID();

        // Create structured error object
        const errorDetails = {
            id: errorId,
            timestamp: new Date().toISOString(),
            name: error.name,
            message: error.message,
            stack: error.stack,
            context,
            environment: env.NODE_ENV,
        };

        // Log the error with all details
        // Wrap in Promise to ensure async operation
        await new Promise((resolve) => {
            logger.error('Error occurred', errorDetails);
            resolve();
        });

        // Return user-friendly message with error ID for reference
        return {
            content: env.NODE_ENV === 'development'
                ? `An error occurred (ID: ${errorId})\n\`\`\`${error.stack}\`\`\``
                : `An error occurred (ID: ${errorId}). If this persists, please report this ID to the bot administrators.`,
            ephemeral: true,
        };
    }

    static initializeProcessErrorHandlers(client) {
        logger.info('Initializing error handlers');

        // Handle cleanup before shutdown
        const cleanup = async (signal) => {
            try {
                logger.info(`Received ${signal}. Shutting down gracefully...`);

                if (client) {
                    await client.destroy();
                    logger.info('Discord client destroyed');
                }

                // Flush logs synchronously before exit
                logger.info('Shutdown complete');
                logger.end(); // Add this line to flush logs

                // Exit immediately after ensuring logs are written
                process.exit(0);
            } catch (error) {
                logger.error('Error during shutdown:', error);
                process.exit(1);
            }
        };

        // Process handlers
        process.on('SIGINT', () => cleanup('SIGINT'));
        process.on('SIGTERM', () => cleanup('SIGTERM'));

        // Additional error logging for unhandled cases
        process.on('unhandledRejection', (error) => {
            logger.error('Unhandled Promise Rejection', {
                error: error instanceof Error ? error.stack : error,
            });
        });

        process.on('uncaughtException', (error) => {
            logger.error('Uncaught Exception', {
                error: error instanceof Error ? error.stack : error,
            });
            // Exit after uncaught exception
            setTimeout(() => {
                process.exit(1);
            }, 1000);
        });

        logger.info('Error handlers initialized');
    }
}

export default ErrorHandler;
