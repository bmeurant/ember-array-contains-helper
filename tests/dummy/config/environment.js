/* eslint-env node */
'use strict';

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'dummy',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    host: '/',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    contentSecurityPolicy: {
      'script-src': "'self' 'unsafe-eval' *.google.com *.gstatic.com",
      'style-src': "'self' 'unsafe-inline' *.google.com *.googleapis.com",
      'font-src': "'self' *.gstatic.com *.googleapis.com",
      'img-src': "'self' *.amazonaws.com"
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.rootURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.rootURL = 'http://baptiste.meurant.io/ember-array-contains-helper',
    ENV.locationType = 'hash',
    ENV.host = 'http://baptiste.meurant.io/ember-array-contains-helper',
    ENV['ember-cli-mirage'] = {
      enabled: true
    }
  }

  return ENV;
};
