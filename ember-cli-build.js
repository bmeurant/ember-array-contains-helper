/* eslint-env node */
/* global require, module */
'use strict';

var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  var app = new EmberAddon(defaults, {
    snippetSearchPaths: ['app', 'tests']
  });

  if (app.env !== 'production') { app.import('bower_components/ember/ember-template-compiler.js', { type: 'vendor' }); }

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  return app.toTree();
};
