# Yet Another Discord Bot Template

[![Use this template](https://img.shields.io/badge/Use%20this%20template-2ea44f?style=for-the-badge&logo=github)](https://github.com/new?template_name=discord-bot-template&template_owner=AlrikOlson)

> **Create your own Discord bot in minutes!** Click the green button above or
> [click here](https://github.com/new?template_name=discord-bot-template&template_owner=AlrikOlson)
> to get started.

<div align="center">
  <img src="https://img.shields.io/badge/node.js%20-%2343853D.svg?style=for-the-badge&logo=node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/discord.js-%237289DA.svg?style=for-the-badge&logo=discord&logoColor=white"/>
  <img src="https://img.shields.io/badge/ESLint-%234B32C3.svg?style=for-the-badge&logo=eslint&logoColor=white"/>
  <img src="https://img.shields.io/badge/Winston-%23000000.svg?style=for-the-badge&logo=node.js&logoColor=white"/>
</div>

## 🚀 Quick Setup

1. **Use this template:**

    - Click the green "Use this template" button above
    - Or
      [click here](https://github.com/new?template_name=discord-bot-template&template_owner=AlrikOlson)
    - Name your repository and create it

2. **Clone your new repository:**

    ```bash
    git clone https://github.com/your-username/your-bot-name
    cd your-bot-name
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Configure environment:**

    ```bash
    cp .env.example .env
    ```

5. **Get your Discord tokens:**
    - Visit
      [Discord Developer Portal](https://discord.com/developers/applications)
    - Create an application
    - Add a bot
    - Copy your token (keep it secret)

## ✨ Features

-   🚀 Production-ready configuration
-   ⚡ Slash command support
-   🛠️ Development & Production environments
-   🔥 Hot reload for development
-   📝 Comprehensive logging system
-   🐛 Advanced error handling
-   📁 Organized project structure
-   🚔 ESLint configuration
-   🌈 VS Code integration
-   📦 GitHub workflow templates
-   🔒 Security best practices
-   📚 Detailed documentation

## 📋 Requirements

-   Node.js 16.9.0+
-   Discord account
-   Basic JavaScript knowledge
-   A cup of coffee (optional)

## 💻 Development

```bash
npm run dev         # Start with hot reload
npm run deploy:dev  # Deploy commands (test server)
npm run lint        # Check code quality
npm run lint:fix    # Fix code style
```

````

## 🚀 Production

```bash
npm start           # Start the bot
npm run deploy:prod # Deploy commands globally
```

## 📊 Logging System

The bot uses Winston for advanced logging capabilities:

### Log Files

-   `logs/combined.log`: All logs
-   `logs/error.log`: Error-level logs only
-   `logs/exceptions.log`: Uncaught exceptions
-   `logs/rejections.log`: Unhandled rejections

### Log Management Commands

```bash
npm run logs:all        # Watch all logs
npm run logs:error      # Watch error logs
npm run logs:exceptions # Watch exception logs
npm run logs:rejections # Watch rejection logs
npm run logs:clean      # Clear all logs
```

### Log Levels

-   `error`: Error conditions
-   `warn`: Warning conditions
-   `info`: Normal but significant
-   `debug`: Debugging information

### Configuration

Configure logging in `.env`:

```env
LOG_LEVEL=info          # Log level (debug, info, warn, error)
LOG_FORMAT=json         # Log format (json or pretty)
LOG_MAX_FILES=5         # Maximum number of log files
LOG_MAX_SIZE=5m         # Maximum size of each log file
```

## 📁 Project Structure

```
src/
├── commands/     # Command files
├── events/      # Event handlers
├── scripts/     # Utility scripts
├── utils/       # Utility functions
│   └── logger.js # Logging configuration
├── config.js    # Bot configuration
└── index.js     # Entry point
```

## 🔧 Environment Variables

| Variable      | Description    | Required | Example                |
| ------------- | -------------- | -------- | ---------------------- |
| TOKEN         | Bot token      | Yes      | NzkyNzE1...            |
| CLIENT_ID     | Application ID | Yes      | 123456789              |
| GUILD_ID      | Server ID      | Dev only | 987654321              |
| NODE_ENV      | Environment    | Yes      | development/production |
| LOG_LEVEL     | Logging level  | No       | info                   |
| LOG_FORMAT    | Log format     | No       | json                   |
| LOG_MAX_FILES | Max log files  | No       | 5                      |
| LOG_MAX_SIZE  | Max log size   | No       | 5m                     |

## 🤝 Contributing

1. Read [CONTRIBUTING.md](CONTRIBUTING.md)
2. Fork the repository
3. Create your feature branch
4. Test your changes
5. Submit a pull request

## 🆘 Support

1. [Discord.js Guide](https://discordjs.guide/)
2. [Discord.js Documentation](https://discord.js.org/)
3. Open an issue

## 🔒 Security

-   Never share your token
-   Don't commit `.env`
-   Read [SECURITY.md](.github/SECURITY.md)

## 📄 License

MIT. See [LICENSE](LICENSE).

---

<div align="center">
  <i>Built with Discord.js and a reasonable amount of caffeine.</i><br>
  <i>Star ⭐ this repository if you found it helpful!</i>
</div>

````

