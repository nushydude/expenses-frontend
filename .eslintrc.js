module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['airbnb', 'plugin:flowtype/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['flowtype', 'prettier', 'react'],
  rules: {
    'prettier/prettier': 'error',
    'linebreak-style': 0,
    'import/prefer-default-export': 0,
    'react/jsx-filename-extension': 0,
  },
};
