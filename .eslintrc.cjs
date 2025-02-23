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
        // Error Prevention
        'no-unused-vars': ['warn', {
            'argsIgnorePattern': '^_',
            'varsIgnorePattern': '^_',
        }],
        'no-undef': 'error',
        'no-var': 'error',

        // Code Style
        'indent': ['error', 4, {
            'SwitchCase': 1,
            'ignoredNodes': ['TemplateLiteral'],
        }],
        'quotes': ['error', 'single', {
            'avoidEscape': true,
            'allowTemplateLiterals': true,
        }],
        'semi': ['error', 'always'],
        'no-multiple-empty-lines': ['error', {
            'max': 2,
            'maxEOF': 1,
        }],
        'eol-last': ['error', 'always'],
        'comma-dangle': ['error', 'always-multiline'],

        // Environment-specific
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

        // Async/Promise
        'require-await': 'error',
        'no-return-await': 'error',
        'no-async-promise-executor': 'error',

        // Code Quality
        'max-len': ['warn', {
            'code': 100,
            'ignoreComments': true,
            'ignoreStrings': true,
            'ignoreTemplateLiterals': true,
            'ignoreRegExpLiterals': true,
        }],
        'complexity': ['warn', 15],

        // Security
        'no-eval': 'error',
        'no-implied-eval': 'error',
        'no-new-func': 'error',

        // Discord.js Specific
        'no-shadow': ['error', {
            'allow': ['message', 'interaction'],
        }],
    },
    overrides: [
        {
            files: ['src/config/**/*.js'],
            rules: {
                'max-len': 'off',
            },
        },
        {
            files: ['src/commands/*.js'],
            rules: {
                'max-len': ['warn', {
                    'code': 120,
                }],
            },
        },
    ],
    globals: {
        'NodeJS': true,
        'Discord': true,
    },
};
