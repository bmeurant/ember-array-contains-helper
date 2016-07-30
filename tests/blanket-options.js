/* eslint-env node */
/* global blanket, module */

var options = {
  modulePrefix: 'ember-array-contains-helper',
  filter: '//.*ember-array-contains-helper/.*/',
  antifilter: '//.*(tests|template).*/',
  loaderExclusions: [],
  enableCoverage: true,
  cliOptions: {
    lcovOptions: {
      renamer: function (fileName) {
        return fileName.replace('ember-array-contains-helper', 'addon') + '.js'
      }
    },
    reporters: ['lcov'],
    autostart: true
  }
};
if (typeof exports === 'undefined') {
  blanket.options(options);
} else {
  module.exports = options;
}