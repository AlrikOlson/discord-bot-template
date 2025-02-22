module.exports = {
    env: {
        node: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        // Stuff that will actually break your code
        'no-unused-vars': ['warn', {
            'argsIgnorePattern': '^_',
            'varsIgnorePattern': '^_',
        }],
        'no-undef': 'error',
        'no-var': 'error', // It's not 2010 anymore

        // Things that make your code look like you know what you're doing
        'indent': ['error', 4, {
            'SwitchCase': 1,
            'ignoredNodes': ['TemplateLiteral'],
        }],
        'quotes': ['error', 'single', {
            'avoidEscape': true,
            'allowTemplateLiterals': true,
        }],
        'semi': ['error', 'always'], // Fight me

        // Because we pretend to care about clean code
        'no-multiple-empty-lines': ['error', {
            'max': 2,
            'maxEOF': 1,
        }],
        'eol-last': ['error', 'always'],
        'comma-dangle': ['error', 'always-multiline'],

        // Console logs are fine, this isn't production... oh wait
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

        // Async/Promise stuff because everyone gets it wrong
        'require-await': 'error',
        'no-return-await': 'error',
        'no-async-promise-executor': 'error',

        // Things that make senior devs cry
        'max-len': ['warn', {
            'code': 100,
            'ignoreComments': true,
            'ignoreStrings': true,
            'ignoreTemplateLiterals': true,
            'ignoreRegExpLiterals': true,
        }],
        'complexity': ['warn', 15],

        // Security stuff because we're responsible adults
        'no-eval': 'error',
        'no-implied-eval': 'error',
        'no-new-func': 'error',

        // Discord.js specific
        'no-shadow': ['error', {
            'allow': ['message', 'interaction'], // Because Discord.js loves these names
        }],
    },
    overrides: [
        {
            // Config files can be messy, we don't judge
            files: ['config.js'],
            rules: {
                'max-len': 'off',
                'quote-props': 'off',
            },
        },
        {
            // Command files have their own style
            files: ['src/commands/*.js'],
            rules: {
                'max-len': ['warn', {
                    'code': 120, // Commands get more space because Discord descriptions are long
                }],
            },
        },
    ],
    // Things we might care about later
    globals: {
        'NodeJS': true,
        'Discord': true,
    },
};
