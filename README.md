# Discord Bot Template

A minimal Discord bot template using discord.js v14, featuring a clean and modular architecture.

## Features

- Modern Discord.js v14 implementation
- Slash command support with secure, separate command deployment
- Environment-based configuration (development/production)
- Robust error handling and logging with optional Discord webhook support
- Command Collection system with cooldowns
- Modular command structure with categories
- Configurable presence and embed colors
- Built-in error handling system
- Comprehensive event handling
- Development and production deployment modes

## Prerequisites

- [Node.js](https://nodejs.org/) (v16.9.0 or higher)
- A Discord Bot Token ([Discord Developer Portal](https://discord.com/developers/applications))

## Project Structure

```
├── src/
│   ├── commands/        # Slash commands
│   │   ├── help.js     # Help command with category support
│   │   └── ping.js     # Ping command with latency check
│   ├── events/         # Event handlers
│   │   └── errorHandler.js # Centralized error handling
│   ├── scripts/        # Utility and admin scripts
│   │   └── deploy.js   # Command deployment script
│   ├── config.js       # Bot configuration
│   └── index.js        # Main bot file
├── .env.example        # Environment variables template
├── .gitignore         # Git ignore rules
├── package.json       # Project dependencies and scripts
└── README.md         # Project documentation
```

## Setup

1. Clone the repository:
```bash
git clone [your-repo-url]
cd discord-bot-template
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Fill in the following required variables:
     - `TOKEN`: Your Discord bot token
     - `CLIENT_ID`: Your bot's client ID
     - `GUILD_ID`: Your development server ID (required for development environment)
     - `NODE_ENV`: Set to 'development' or 'production'
     - `ERROR_WEBHOOK_URL`: (Optional) Discord webhook URL for error logging

4. Deploy slash commands:
```bash
# For development (guild-specific, instant update)
npm run deploy:dev

# For production (global, takes up to 1 hour)
npm run deploy:prod
```

5. Start the bot:
```bash
# Production mode
npm start

# Development mode with auto-reload
npm run dev
```

## Available Commands

### General
- `/help [category]` - Shows all available commands or commands in a specific category

### Utility
- `/ping` - Checks the bot's latency and API response time

## Command Structure

Commands are stored in `src/commands/`. Each command module must export:

```javascript
module.exports = {
    data: new SlashCommandBuilder()
        .setName('command')
        .setDescription('Command description'),
    category: 'CATEGORY_NAME', // From config.categories
    cooldown: 3, // Optional: Cooldown in seconds
    async execute(interaction) {
        // Command logic
    }
};
```

## Configuration

The bot's configuration (`src/config.js`) includes:

- Presence settings
- Embed colors
- Command categories
- Development options
- Command cooldowns
- Deployment configurations
- Command validation schema

## Available Scripts

- `npm start`: Start the bot in production mode
- `npm run dev`: Start the bot with nodemon for development
- `npm run deploy`: Deploy commands based on NODE_ENV
- `npm run deploy:prod`: Deploy commands globally
- `npm run deploy:dev`: Deploy commands to development guild

## Dependencies

- `discord.js`: ^14.18.0
- `dotenv`: ^16.4.1
- `nodemon`: ^3.0.3 (dev dependency)

## Environment Variables

| Variable           | Description                    | Required | Default     |
|-------------------|--------------------------------|----------|-------------|
| TOKEN             | Discord bot token              | Yes      | -           |
| CLIENT_ID         | Bot's client ID               | Yes      | -           |
| GUILD_ID          | Development server ID          | Dev only | -           |
| NODE_ENV          | Environment mode              | No       | development |
| ERROR_WEBHOOK_URL | Discord webhook for error logs | No       | -           |

## Error Handling

The bot includes comprehensive error handling through `src/events/errorHandler.js`:
- Command execution error handling
- Process termination handling
- Unhandled promise rejection catching
- Discord client error handling
- Optional Discord webhook error logging

## License

MIT