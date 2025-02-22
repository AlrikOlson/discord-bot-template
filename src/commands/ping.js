const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const config = require('../config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Checks the bot\'s latency and API response time'),
    
    category: config.categories.UTILITY,
    cooldown: config.cooldowns.commands.ping,

    async execute(interaction) {
        // Initial response
        const sent = await interaction.reply({ 
            content: 'Pinging...',
            fetchReply: true, 
        });

        // Calculate latencies
        const wsLatency = interaction.client.ws.ping;
        const roundtripLatency = sent.createdTimestamp - interaction.createdTimestamp;

        // Create embed with ping information
        const embed = new EmbedBuilder()
            .setTitle('🏓 Pong!')
            .setColor(config.colors.primary)
            .addFields(
                { 
                    name: 'WebSocket Latency', 
                    value: `${wsLatency}ms`,
                    inline: true, 
                },
                { 
                    name: 'API Roundtrip', 
                    value: `${roundtripLatency}ms`,
                    inline: true, 
                },
            )
            .setFooter({ 
                text: `Requested by ${interaction.user.tag}`, 
            })
            .setTimestamp();

        // Edit the initial reply with the detailed embed
        await interaction.editReply({ 
            content: null, 
            embeds: [embed], 
        });
    },
};
