# Yet Another Discord Bot Template

Look, if you're here, you probably want to make a Discord bot. Fine. Here's a template that won't completely ruin your day.

## What's This?

It's a Discord bot template. It does the basic stuff:
- Slash commands (because Discord killed message commands anyway)
- Error handling (because your bot WILL break)
- Some structure (because you'll thank me later)

## Requirements

- Node.js 16.9.0+ (just use the LTS version, seriously)
- A Discord account (duh)
- Basic JavaScript knowledge (or at least the willingness to Google stuff)

## Getting Started

1. Clone this thing:
```bash
git clone https://github.com/AlrikOlson/discord-bot-template
cd discord-bot-template
```

2. Install dependencies:
```bash
npm install
```

3. Copy `.env.example` to `.env` and fill in your tokens. Don't know where to get them? Fine, here:
   - Go to [Discord Developer Portal](https://discord.com/developers/applications)
   - Make a new application
   - Create a bot
   - Copy the token
   - Don't share it (or do, I'm not your mom)

## Project Structure

```
src/
├── commands/    # Your commands go here (shocking, I know)
├── events/      # Event handlers (when stuff happens)
├── scripts/     # Utility scripts
├── config.js    # Config that you'll probably never touch
└── index.js     # The main file. Don't break this one.
```

## Development vs Production

### Development
```bash
npm run dev         # Runs with hot reload
npm run deploy:dev  # Updates commands instantly
```

### Production
```bash
npm start           # Just runs the bot
npm run deploy:prod # Updates commands (takes forever)
```

Pick your poison. Development is faster but only works in one server. Production is slower but works everywhere.

## Making Commands

Put them in `src/commands/`. Here's a template:

```javascript
module.exports = {
    data: new SlashCommandBuilder()
        .setName('something')
        .setDescription('does something'),
    category: 'GENERAL',
    cooldown: 3,
    async execute(interaction) {
        await interaction.reply('whatever');
    }
};
```

## Environment Variables

Look in `.env.example`. Copy it. Rename it to `.env`. Fill in the blanks. Don't overthink it.

| Variable | What | Required? |
|----------|------|-----------|
| TOKEN | Bot token | Yes |
| CLIENT_ID | Application ID | Yes |
| GUILD_ID | Server ID | Only for testing |
| NODE_ENV | development/production | Yes |

## Error Handling

The bot handles errors so you don't have to. It'll:
- Tell users something broke
- Log it somewhere
- Pretend it meant to do that

## Need Help?

1. Read the [Discord.js Guide](https://discordjs.guide/)
2. Check Stack Overflow
3. Join Discord.js Discord
4. Cry

## License

MIT. Go wild.

## Final Notes

- Don't share your token
- Test before deploying
- When in doubt, turn it off and on again

Now go build something. Or don't. Whatever.