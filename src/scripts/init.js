import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import { env } from '../config/env.js';
import logger from '../utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Ensures required directories exist for the application
 */
function initializeDirectories() {
    const directories = [
        // Relative paths from project root
        'logs',
        'src/commands',
        'src/events',
        'src/utils',
    ];

    const rootDir = path.join(__dirname, '../../');

    directories.forEach(dir => {
        const fullPath = path.join(rootDir, dir);
        if (!fs.existsSync(fullPath)) {
            try {
                fs.mkdirSync(fullPath, { recursive: true });
                logger.info(`Created directory: ${dir}`);
                console.log(chalk.green(`✓ Created directory: ${dir}`));
            } catch (error) {
                logger.error(`Failed to create directory: ${dir}`, { error });
                console.error(chalk.red(`✗ Failed to create directory: ${dir}`));
                console.error(chalk.dim(error.message));
                process.exit(1);
            }
        } else {
            logger.debug(`Directory already exists: ${dir}`);
            console.log(chalk.blue(`○ Directory already exists: ${dir}`));
        }
    });

    // Log initialization complete
    logger.info('Directory initialization complete', {
        environment: env.NODE_ENV,
        directories: directories,
    });
}

// Run initialization
initializeDirectories();
