module.exports = {
    "env": {
        "es2021": true
    },
    "extends": [
        "standard-with-typescript",
        "plugin:import/warnings",
        "plugin:import/typescript"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins":['@typescript-eslint','prettier','import'],
    "rules": {
         "@typescript-eslint/no-unused-vars": ["error"],
        "no-console": 'off',
        "@typescript-eslint/prefer-nullish-coalescing": 'off',
        '@typescript-eslint/strict-boolean-expressions': 'off',
        '@typescript-eslint/consistent-type-assertions': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/ban-types': 'off',
        "@typescript-eslint/no-floating-promises": 'off'
    },
    settings: {
        'import/pasers': {
            '@typescript-eslint/parser': ['.ts'],
        },
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true,
                project: './tsconfig.json'
            },
        },
    },
}
