# Discord Bot Template

A minimal Discord bot template using discord.js v14.

## Features

- Command handling structure
- Slash command support
- Environment configuration
- Basic error handling

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

3. Create a `.env` file:
   - Copy `.env.example` to `.env`
   - Fill in your bot token and other values

4. Deploy commands:
```bash
node src/deploy-commands.js
```

5. Start the bot:
```bash
npm start
```

For development:
```bash
npm run dev
```

## Command Structure

Commands are stored in `src/commands/`. Each command should export:
- `data`: SlashCommandBuilder with command definition
- `execute`: Async function handling the command

Example:
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

## Environment Variables

- `TOKEN`: Your Discord bot token
- `CLIENT_ID`: Your bot's client ID
- `GUILD_ID`: Development server ID (optional)
- `NODE_ENV`: 'development' or 'production'

## License

MIT
