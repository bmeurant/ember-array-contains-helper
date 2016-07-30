/* eslint-env node */
'use strict';

module.exports = {
  root: true,

  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },

  parser: 'babel-eslint',

  extends: 'eslint:recommended',

  env: {
    'browser': true
  },

  rules: {
    'no-unused-expressions': [2, {
      allowShortCircuit: true,
      allowTernary: true
    }],

    'no-proto': 0,

    'indent': [2, 2, {
      'SwitchCase': 1,
      'VariableDeclarator': { 'var': 2, 'let': 2, 'const': 3 }
    }],

    'camelcase': 2,

    'curly': 2,

    'no-use-before-define': [2, 'nofunc'],

    'eqeqeq': 2,

    'no-eval': 2,

    'linebreak-style': [2, 'unix'],

    'new-cap': [2, {
      properties: false
    }],

    'no-caller': 2,

    'quotes': [0, 'single'],

    'no-trailing-spaces': 2,

    'no-eq-null': 2,

    'comma-dangle': 2
  }
};