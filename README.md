# Yet Another Discord Bot Template

Look, if you're here, you probably want to make a Discord bot. Fine. Here's a
template that won't completely ruin your day.

## Features (because you asked)

-   🚀 Actually works out of the box (shocking, I know)
-   ⚡ Slash commands (because Discord killed message commands anyway)
-   🛠️ Development & Production modes (pretend you're professional)
-   🔥 Hot reload in development (because restarting is for chumps)
-   🐛 Error handling that makes sense (when stuff breaks)
-   📁 Logical structure (thank me later)
-   🚔 ESLint config that will judge your code
-   🌈 VS Code settings that don't suck
-   📦 GitHub templates for everything
-   🔒 Security policy (because we care)
-   📝 Documentation (that you won't read)

## Requirements

-   Node.js 16.9.0+ (just use the LTS version, seriously)
-   A Discord account (duh)
-   Basic JavaScript knowledge (or at least the willingness to Google stuff)
-   A sense of humor (optional but recommended)

## Quick Start

1. Click that shiny "Use this template" button at the top
2. Clone your new repo:
    ```bash
    git clone https://github.com/your-username/your-bot-name
    cd your-bot-name
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Copy `.env.example` to `.env` and fill in your tokens:
    ```bash
    cp .env.example .env
    ```
5. Get your tokens:
    - Go to
      [Discord Developer Portal](https://discord.com/developers/applications)
    - Create a new application
    - Go to the Bot section
    - Click "Add Bot"
    - Copy your token
    - Don't share it (seriously)

## Development

```bash
npm run dev         # Run with hot reload
npm run deploy:dev  # Deploy commands to test server
npm run lint        # Check if your code sucks
npm run lint:fix    # Fix your sucky code
```

## Production

```bash
npm start           # Just run the bot
npm run deploy:prod # Deploy commands globally (takes forever)
```

## Project Structure

```
├── src/                  # Your code goes here
│   ├── commands/        # Command files
│   ├── events/         # Event handlers
│   ├── scripts/        # Utility scripts
│   ├── config.js       # Bot configuration
│   └── index.js        # Entry point
├── .github/            # GitHub stuff
├── .vscode/           # VS Code settings
├── docs/             # Documentation (ha!)
└── [various config files that you shouldn't touch]
```

## Making Commands

Put them in `src/commands/`. Here's a template because I know you'll ask:

```javascript
module.exports = {
    data: new SlashCommandBuilder()
        .setName('something')
        .setDescription('does something'),
    category: 'GENERAL',
    cooldown: 3,
    async execute(interaction) {
        await interaction.reply('whatever');
    },
};
```

## Environment Variables

Copy `.env.example`, rename to `.env`, fill in the blanks. Don't overthink it.

| Variable          | What                   | Required? | Example                              |
| ----------------- | ---------------------- | --------- | ------------------------------------ |
| TOKEN             | Bot token              | Yes       | NzkyNzE1...hvzA.Ovy4                 |
| CLIENT_ID         | Application ID         | Yes       | 123456789                            |
| GUILD_ID          | Server ID              | Dev only  | 987654321                            |
| NODE_ENV          | development/production | Yes       | development                          |
| ERROR_WEBHOOK_URL | Error logging          | No        | https://discord.com/api/webhooks/... |

## Contributing

1. Read [CONTRIBUTING.md](CONTRIBUTING.md)
2. Fork the repo
3. Make changes
4. Test them
5. Create PR
6. Wait
7. Maybe ping someone
8. Get merged (hopefully)

## Common Issues

### It's not working

-   Did you install dependencies?
-   Did you create `.env`?
-   Did you fill in `.env`?
-   Did you read the error message?

### Commands aren't showing up

-   Did you deploy them?
-   Are you in development mode?
-   Did you invite the bot with applications.commands scope?
-   Did you wait long enough in production mode?

### ESLint is complaining

-   Fix your code
-   Or don't, I'm not your boss

## Support

1. Read the [Discord.js Guide](https://discordjs.guide/)
2. Check [Discord.js Documentation](https://discord.js.org/)
3. Google the error
4. Ask in [Discord.js Discord](https://discord.gg/djs)
5. Open an issue
6. Cry

## Security

-   Don't share your token
-   Don't commit `.env`
-   Don't use `eval()`
-   Don't be stupid
-   Read [SECURITY.md](.github/SECURITY.md)

## License

MIT. See [LICENSE](LICENSE). TL;DR: Do whatever you want, just don't blame me.

## Acknowledgments

-   Discord.js team (for making this possible)
-   Stack Overflow (for saving our lives)
-   Coffee (for obvious reasons)
-   You (for reading this far)

## Final Notes

-   Star this repo if you like it
-   Fork it if you want to improve it
-   Open issues if you find bugs
-   Submit PRs if you fix bugs
-   Don't blame me if something breaks
-   Have fun!

Now go build something. Or don't. Whatever.

