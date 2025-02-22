const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { categories, colors } = require('../config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Shows all available commands')
        .addStringOption(option =>
            option.setName('category')
                .setDescription('Specific category of commands to view')
                .setRequired(false)
                .addChoices(
                    ...Object.entries(categories).map(([key, value]) => ({
                        name: value,
                        value: key
                    }))
                )),

    category: categories.GENERAL,
    cooldown: 3,

    async execute(interaction) {
        const commands = interaction.client.commands;
        const selectedCategory = interaction.options.getString('category');

        // Group commands by category
        const commandsByCategory = new Map();
        
        // Initialize categories
        Object.entries(categories).forEach(([key, value]) => {
            commandsByCategory.set(key, []);
        });

        // Sort commands into categories
        commands.forEach(command => {
            const category = command.category || categories.GENERAL;
            const categoryKey = Object.entries(categories)
                .find(([, value]) => value === category)?.[0] || 'GENERAL';
            
            const commandInfo = {
                name: command.data.name,
                description: command.data.description,
                cooldown: command.cooldown || 3
            };

            if (commandsByCategory.has(categoryKey)) {
                commandsByCategory.get(categoryKey).push(commandInfo);
            }
        });

        if (selectedCategory) {
            // Show detailed help for specific category
            const categoryCommands = commandsByCategory.get(selectedCategory) || [];
            const embed = new EmbedBuilder()
                .setTitle(`${categories[selectedCategory]} Commands`)
                .setColor(colors.primary)
                .setDescription('Here are all the commands in this category:')
                .addFields(
                    categoryCommands.map(cmd => ({
                        name: `/${cmd.name}`,
                        value: `${cmd.description}\nCooldown: ${cmd.cooldown}s`,
                        inline: false
                    }))
                )
                .setFooter({ 
                    text: `Use /help for an overview of all categories` 
                });

            await interaction.reply({ embeds: [embed] });
        } else {
            // Show overview of all categories
            const embed = new EmbedBuilder()
                .setTitle('Help Menu')
                .setColor(colors.primary)
                .setDescription('Here are all available command categories. Use `/help category:[name]` for detailed commands.')
                .addFields(
                    Object.entries(categories).map(([key, value]) => {
                        const commands = commandsByCategory.get(key) || [];
                        return {
                            name: value,
                            value: commands.length 
                                ? `${commands.length} command(s)\n${commands.map(cmd => `\`${cmd.name}\``).join(', ')}`
                                : 'No commands available',
                            inline: false
                        };
                    })
                )
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        }
    }
};