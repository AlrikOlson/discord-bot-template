# Discord Bot Template

A minimal Discord bot template using discord.js v14, featuring a clean and modular architecture.

## Features

- Modern Discord.js v14 implementation
- Slash command support with automated command deployment
- Environment-based configuration (development/production)
- Robust error handling and logging
- Command Collection system
- Modular command structure
- Configurable presence and embed colors
- Built-in cooldown system
- Comprehensive event handling

## Prerequisites

- [Node.js](https://nodejs.org/) (v16.9.0 or higher)
- A Discord Bot Token ([Discord Developer Portal](https://discord.com/developers/applications))

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

4. Deploy slash commands:
```bash
npm run deploy
```

5. Start the bot:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## Project Structure

```
├── src/
│   ├── commands/         # Slash commands
│   ├── config.js         # Bot configuration
│   ├── deploy-commands.js# Command deployment script
│   └── index.js         # Main bot file
├── .env.example         # Environment variables template
├── .gitignore          # Git ignore rules
├── package.json        # Project dependencies and scripts
└── README.md          # Project documentation
```

## Command Structure

Commands are stored in `src/commands/`. Each command module must export:

```javascript
module.exports = {
    data: new SlashCommandBuilder()
        .setName('command')
        .setDescription('Command description'),
    async execute(interaction) {
        // Command logic
    }
};
```

## Configuration

The bot's configuration is centralized in `src/config.js` and includes:

- Presence settings
- Embed colors
- Command categories
- Development options
- Command cooldowns

## Available Scripts

- `npm start`: Start the bot
- `npm run dev`: Start the bot with nodemon for development
- `npm run deploy`: Deploy slash commands

## Dependencies

- `discord.js`: ^14.18.0
- `dotenv`: ^16.4.1
- `nodemon`: ^3.0.3 (dev dependency)

## Environment Variables

| Variable    | Description                    | Required | Default     |
|------------|--------------------------------|----------|-------------|
| TOKEN      | Discord bot token              | Yes      | -           |
| CLIENT_ID  | Bot's client ID               | Yes      | -           |
| GUILD_ID   | Development server ID          | Dev only | -           |
| NODE_ENV   | Environment mode              | No       | development |

## Error Handling

The bot includes comprehensive error handling:
- Command execution error handling
- Process termination handling
- Unhandled promise rejection catching
- Discord client error handling

## License

MIT