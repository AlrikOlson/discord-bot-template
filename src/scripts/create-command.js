import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import gradient from 'gradient-string';
import figlet from 'figlet';
import { categories, colors } from '../config.js';
import { env } from '../config/env.js';
import logger from '../utils/logger.js';
import { promisify } from 'util';
import { fileURLToPath } from 'url';

// ES Module dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);

// Stunning ASCII banner with gradient
const showBanner = () => {
    console.clear();
    return new Promise((resolve) => {
        figlet('Command Creator', {
            font: 'Big',
            horizontalLayout: 'default',
            verticalLayout: 'default',
        }, (err, data) => {
            if (err) {
                logger.error('Failed to generate banner', { error: err });
                resolve();
                return;
            }
            console.log(gradient.pastel.multiline(data));
            console.log('\n' + chalk.dim('✨ Create beautiful Discord commands with style ✨\n'));
            resolve();
        });
    });
};

// Modern command template
const commandTemplate = (name, description, category, options) => `import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { categories, colors } from '../config.js';

export default {
    data: new SlashCommandBuilder()
        .setName('${name.toLowerCase()}')
        .setDescription('${description}')${options.map(opt => `
        .addStringOption(option =>
            option
                .setName('${opt.name}')
                .setDescription('${opt.description}')
                .setRequired(${opt.required}))`).join('')},

    category: categories.${category},
    cooldown: 3,

    async execute(interaction) {
        try {
            const embed = new EmbedBuilder()
                .setColor(colors.primary)
                .setTitle('${name} Command')
                .setDescription('Command executed successfully!')
                .setFooter({
                    text: \`Requested by \${interaction.user.tag}\`,
                })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            logger.error(\`Error in ${name} command:\`, error);
            await interaction.reply({
                content: 'An error occurred while executing this command.',
                ephemeral: true,
            });
        }
    },
};
`;

// Validation functions
const validateCommandName = (name) => {
    const regex = /^[\w-]{1,32}$/;
    return regex.test(name) || 'Command name must be 1-32 characters and contain only letters, numbers, underscores, and hyphens';
};

const validateDescription = (desc) => {
    return desc.length <= 100 || 'Description must be 100 characters or less';
};

// Questions for command creation
const questions = [
    {
        type: 'input',
        name: 'name',
        message: chalk.cyan('What is the name of your command?'),
        validate: validateCommandName,
        transformer: (input) => chalk.yellow(input),
    },
    {
        type: 'input',
        name: 'description',
        message: chalk.cyan('Provide a description for your command:'),
        validate: validateDescription,
        transformer: (input) => chalk.yellow(input),
    },
    {
        type: 'list',
        name: 'category',
        message: chalk.cyan('Select a category for your command:'),
        choices: Object.keys(categories).map(cat => ({
            name: chalk.yellow(categories[cat]),
            value: cat,
        })),
    },
    {
        type: 'confirm',
        name: 'addOptions',
        message: chalk.cyan('Would you like to add command options?'),
        default: false,
    },
];

// Questions for command options
const optionQuestions = [
    {
        type: 'input',
        name: 'name',
        message: chalk.cyan('Option name:'),
        validate: validateCommandName,
    },
    {
        type: 'input',
        name: 'description',
        message: chalk.cyan('Option description:'),
        validate: validateDescription,
    },
    {
        type: 'confirm',
        name: 'required',
        message: chalk.cyan('Is this option required?'),
        default: false,
    },
    {
        type: 'confirm',
        name: 'addAnother',
        message: chalk.cyan('Would you like to add another option?'),
        default: false,
    },
];

async function createCommand() {
    await showBanner();

    try {
        // Get main command details
        const answers = await inquirer.prompt(questions);
        let options = [];

        // Get command options if requested
        while (answers.addOptions) {
            const option = await inquirer.prompt(optionQuestions);
            options.push({
                name: option.name,
                description: option.description,
                required: option.required,
            });

            if (!option.addAnother) break;
        }

        // Setup paths
        const commandsDir = path.join(__dirname, '..', 'commands');
        const filePath = path.join(commandsDir, `${answers.name}.js`);

        // Create directory if it doesn't exist
        const spinner = ora('Creating command...').start();

        await mkdir(commandsDir, { recursive: true });

        // Generate and write command file
        const commandContent = commandTemplate(
            answers.name,
            answers.description,
            answers.category,
            options,
        );

        await writeFile(filePath, commandContent);

        spinner.succeed(chalk.green('Command created successfully!'));

        // Show next steps
        console.log('\n' + chalk.cyan('Next steps:'));
        console.log(chalk.dim('1. Review your command at:'));
        console.log(chalk.yellow(`   ${filePath}`));
        console.log(chalk.dim('2. Deploy your command with:'));
        console.log(chalk.yellow(`   npm run deploy:${env.NODE_ENV === 'production' ? 'prod' : 'dev'}`));

    } catch (error) {
        logger.error('Failed to create command:', error);
        console.error(chalk.red('\n❌ Error creating command:'));
        console.error(chalk.dim(error.message));
        process.exit(1);
    }
}

// Execute the command creator
createCommand();
