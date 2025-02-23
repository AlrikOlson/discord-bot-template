# Yet Another Discord Bot Template

A robust, production-ready Discord bot template with modern features and best
practices.

## Features

-   🚀 Production-ready configuration
-   ⚡ Slash command support
-   🛠️ Development & Production environments
-   🔥 Hot reload for development
-   🐛 Comprehensive error handling
-   📁 Organized project structure
-   🚔 ESLint configuration
-   🌈 VS Code integration
-   📦 GitHub workflow templates
-   🔒 Security best practices
-   📝 Detailed documentation

## Requirements

-   Node.js 16.9.0+
-   Discord account
-   Basic JavaScript knowledge
-   A cup of coffee (optional)

## Quick Start

1. Use this template
2. Clone your repository:
    ```bash
    git clone https://github.com/your-username/your-bot-name
    cd your-bot-name
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Configure environment:
    ```bash
    cp .env.example .env
    ```
5. Get your Discord tokens:
    - Visit
      [Discord Developer Portal](https://discord.com/developers/applications)
    - Create an application
    - Add a bot
    - Copy your token (keep it secret)

## Development

```bash
npm run dev         # Start with hot reload
npm run deploy:dev  # Deploy commands (test server)
npm run lint        # Check code quality
npm run lint:fix    # Fix code style
```

## Production

```bash
npm start           # Start the bot
npm run deploy:prod # Deploy commands globally
```

## Project Structure

```
src/
├── commands/     # Command files
├── events/      # Event handlers
├── scripts/     # Utility scripts
├── config.js    # Bot configuration
└── index.js     # Entry point
```

## Environment Variables

| Variable          | Description    | Required | Example                 |
| ----------------- | -------------- | -------- | ----------------------- |
| TOKEN             | Bot token      | Yes      | NzkyNzE1...             |
| CLIENT_ID         | Application ID | Yes      | 123456789               |
| GUILD_ID          | Server ID      | Dev only | 987654321               |
| NODE_ENV          | Environment    | Yes      | development/production  |
| ERROR_WEBHOOK_URL | Error logging  | No       | https://discord.com/... |

## Contributing

1. Read [CONTRIBUTING.md](CONTRIBUTING.md)
2. Fork the repository
3. Create your feature branch
4. Test your changes
5. Submit a pull request

## Support

1. [Discord.js Guide](https://discordjs.guide/)
2. [Discord.js Documentation](https://discord.js.org/)
3. Open an issue

## Security

-   Never share your token
-   Don't commit `.env`
-   Read [SECURITY.md](.github/SECURITY.md)

## License

MIT. See [LICENSE](LICENSE).

---

_Built with Discord.js and a reasonable amount of caffeine._

