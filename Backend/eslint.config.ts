import js from '@eslint/js';

module.exports = [
    // TODO: extend ESLint file to handle all projects and implement correct rules
    // apply recommended rules to JS files
    {
        ...js.configs.recommended,
        //files: ["./**/*.js", "./**/*.ts"],
        linterOptions: {
            noInlineConfig: true,
            reportUnusedDisableDirectives: 'warn',
        },
        rules: {
            'no-unused-vars': 'warn',
            semi: 'warn',
            'prefer-const': 'warn',
        },
    },
];
