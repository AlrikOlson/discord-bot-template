# Discord Bot Template

A beginner-friendly Discord bot template using discord.js v14. Don't worry - we'll explain everything you need to know!

## 🤔 What's This Bot Template For?

This template helps you create a Discord bot with:
- Modern slash commands (the ones that start with `/`)
- Easy setup for both testing and real-world use
- Built-in error handling
- A clean, organized structure

## 📋 Requirements

- [Node.js](https://nodejs.org/) version 16.9.0 or newer
- A Discord account
- Basic knowledge of JavaScript (but we'll help you through it!)

## 🔑 Getting Your Discord Bot Tokens

Before you start, you'll need some special keys from Discord:

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" and give it a name
3. Go to the "Bot" section and click "Add Bot"
4. You'll need these things:
   - **Token**: Click "Copy" under the bot's token (keep this secret!)
   - **Client ID**: Found in the "General Information" tab
   - **Test Server ID** (for development only):
     1. Open Discord
     2. Go to your test server
     3. Right-click the server name
     4. Click "Copy Server ID" (Enable Developer Mode in Discord settings if you don't see this)

## 📁 Project Structure

Here's what each folder does:

```
src/
├── commands/        # Your bot's commands live here
├── events/         # How your bot responds to different events
├── scripts/        # Helper scripts (like command deployment)
├── config.js       # Bot settings
└── index.js        # The main bot file
```

## 🚀 Setting Up Your Bot

### 1. Get the Code

```bash
git clone [your-repo-url]
cd discord-bot-template
```

### 2. Install Required Software

```bash
npm install
```

### 3. Set Up Your Secret Keys

1. Copy `.env.example` to a new file called `.env`
2. Fill in your keys:
```env
TOKEN=your_bot_token
CLIENT_ID=your_client_id
GUILD_ID=your_test_server_id  # Only needed for testing
NODE_ENV=development          # Change to 'production' when ready to go live
```

## 🎮 Commands: Development vs Production

There are two ways to add commands to your bot. This is important to understand!

### Development Mode (Testing)
- Commands only work in your test server
- Changes appear instantly
- Perfect for testing
- Requires your test server's ID (GUILD_ID)

To deploy commands in test mode:
```bash
npm run deploy:dev
```

### Production Mode (Real World)
- Commands work in all servers
- Takes up to 1 hour for changes to appear
- Used when your bot is ready for others to use
- Doesn't need a server ID

To deploy commands for everyone:
```bash
npm run deploy:prod
```

### ⭐ Important to Know
- When someone adds your bot to their server, they'll get all your production commands automatically
- You only need to run `deploy:prod` when you change or add commands
- Keep using `deploy:dev` while testing - it's faster and safer!

## 🏃‍♂️ Running Your Bot

### For Testing
```bash
npm run dev    # Automatically restarts when you make changes
```

### For Real World Use
```bash
npm start      # Regular bot start
```

## 📝 Creating Commands

Commands go in `src/commands/`. Here's a simple example:

```javascript
module.exports = {
    data: new SlashCommandBuilder()
        .setName('hello')
        .setDescription('Says hello'),
    category: 'GENERAL',
    cooldown: 3, // Optional: Wait time between uses (in seconds)
    async execute(interaction) {
        await interaction.reply('Hello there!');
    }
};
```

## ⚙️ Configuration

All bot settings are in `src/config.js`:
- Command categories
- Colors for messages
- Default cooldowns
- Bot status message

## 🛠️ Available Scripts

- `npm run dev`: Start bot in test mode (restarts when you make changes)
- `npm start`: Start bot normally
- `npm run deploy:dev`: Update commands in your test server
- `npm run deploy:prod`: Update commands for all servers

## 🔑 Environment Variables Explained

| Variable | What It Does | Required? | When Needed |
|----------|-------------|-----------|-------------|
| TOKEN | Your bot's secret key | Yes | Always |
| CLIENT_ID | Your bot's ID | Yes | Always |
| GUILD_ID | Test server ID | Only for testing | Development |
| NODE_ENV | `development` or `production` | Yes | Always |
| ERROR_WEBHOOK_URL | Discord error reporting | No | Optional |

## ❌ Error Handling

The bot automatically handles errors by:
- Showing a nice message to users
- Logging details for you to review
- Optionally sending errors to a Discord channel

## 📜 License

MIT - Feel free to use this for your own bot!

## 🆘 Need Help?

1. Check the [Discord.js Guide](https://discordjs.guide/)
2. Join the [Discord.js Discord Server](https://discord.gg/djs)
3. Look for similar issues in this template's repository

Remember: Never share your bot token with anyone!