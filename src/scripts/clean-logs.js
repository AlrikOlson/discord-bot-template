import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logsDir = path.join(__dirname, '../../logs');

try {
    // Create logs directory if it doesn't exist
    if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir, { recursive: true });
        console.log('Created logs directory');
    }

    // Read all files in the logs directory
    const files = fs.readdirSync(logsDir);

    // Delete each .log file
    let deletedCount = 0;
    for (const file of files) {
        if (file.endsWith('.log')) {
            fs.unlinkSync(path.join(logsDir, file));
            deletedCount++;
        }
    }

    console.log(`Successfully deleted ${deletedCount} log files`);
} catch (error) {
    console.error('Error cleaning log files:', error);
    process.exit(1);
}
