module.exports = {
  root: true,
  extends: 'eslint:recommended',
  env: {
    browser: false,
    node: true,
  },
  globals: {
  },
  parserOptions: {
    'ecmaversion': 6,
    'sourceType': 'module',
  },
  rules: {
    // JSHint "expr"
    'no-unused-expressions': [2, {
      allowShortCircuit: true,
      allowTernary: true,
    }],

    'no-proto': 0,
    'strict': [2, 'global'],

    'indent': [2, 2, {
      'SwitchCase': 1,
      'VariableDeclarator': { 'var': 2, 'let': 2, 'const': 3 }
    }],

    'camelcase': 2,

    'no-cond-assign': [2, 'except-parens'],

    'curly': 2,

    'no-use-before-define': [2, 'nofunc'],

    'no-debugger': 0,

    'eqeqeq': 2,

    'no-eval': 2,

    'guard-for-in': 0,

    'wrap-iife': 0,

    'linebreak-style': [2, 'unix'],

    'new-cap': [2, {
      properties: false,
    }],

    'no-caller': 2,

    'no-empty': 2,

    'quotes': [0, 'single'],

    'no-new': 0,

    'no-plusplus': 0,

    'no-undef': 2,

    'no-unused-vars': 2,

    'dot-notation': 0,

    'no-trailing-spaces': 2,

    'no-eq-null': 2,

    'no-console': 0,
    'comma-dangle': 0,
  },
};