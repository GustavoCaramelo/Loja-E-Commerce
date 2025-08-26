module.exports = {
root: true,
parser: '@typescript-eslint/parser',
plugins: ['react', 'react-hooks', 'jsx-a11y', '@typescript-eslint'],
extends: [
'eslint:recommended',
'plugin:react/recommended',
'plugin:react-hooks/recommended',
'plugin:@typescript-eslint/recommended',
'plugin:jsx-a11y/recommended',
'prettier'
],
settings: { react: { version: 'detect' } },
rules: {
'react/react-in-jsx-scope': 'off',
'react/prop-types': 'off'
}
}