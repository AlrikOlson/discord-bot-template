import { EmbedBuilder, WebhookClient } from 'discord.js';
import { colors } from '../config.js';

// Optional: Create a webhook for logging errors to a Discord channel
const errorWebhook = process.env.ERROR_WEBHOOK_URL
    ? new WebhookClient({ url: process.env.ERROR_WEBHOOK_URL })
    : null;

class ErrorHandler {
    static async handleError(error, context = {}) {
        // Log to console
        console.error('Error occurred:', error);
        console.error('Context:', context);

        // Format error for logging
        const errorEmbed = new EmbedBuilder()
            .setColor(colors.error)
            .setTitle('Error Occurred')
            .setDescription(`\`\`\`${error.stack || error.message}\`\`\``)
            .addFields(
                { name: 'Type', value: error.name || 'Unknown', inline: true },
                { name: 'Environment', value: process.env.NODE_ENV || 'development', inline: true },
            )
            .setTimestamp();

        // Add context information if available
        if (context.command) {
            errorEmbed.addFields({
                name: 'Command',
                value: context.command,
                inline: true,
            });
        }

        if (context.user) {
            errorEmbed.addFields({
                name: 'User',
                value: `${context.user.tag} (${context.user.id})`,
                inline: true,
            });
        }

        // Log to Discord webhook if available
        if (errorWebhook) {
            try {
                await errorWebhook.send({ embeds: [errorEmbed] });
            } catch (webhookError) {
                console.error('Failed to send error to webhook:', webhookError);
            }
        }

        // Return user-friendly error message
        return {
            content: 'An error occurred while processing your request.',
            ephemeral: true,
        };
    }

    static initializeProcessErrorHandlers(client) {
        // Handle promise rejections
        process.on('unhandledRejection', (error) => {
            this.handleError(error, { type: 'Unhandled Promise Rejection' });
        });

        // Handle uncaught exceptions
        process.on('uncaughtException', (error) => {
            this.handleError(error, { type: 'Uncaught Exception' });
            // Give time for error to be logged before exiting
            setTimeout(() => process.exit(1), 1000);
        });

        // Handle cleanup before shutdown
        const cleanup = async () => {
            console.log('Shutting down gracefully...');
            if (client) {
                await client.destroy();
            }
            process.exit(0);
        };

        process.on('SIGINT', cleanup);
        process.on('SIGTERM', cleanup);
    }
}

export default ErrorHandler;
