'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'dummy',
    environment,
    rootURL: '/',
    locationType: 'auto',
    host: '/',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
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
    ENV.locationType = 'hash'
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.rootURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV['ember-cli-mirage'] = {
      enabled: false
    }

    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    ENV.rootURL = 'http://baptiste.meurant.io/ember-array-contains-helper/',
    ENV.locationType = 'hash',
    ENV.host = 'http://baptiste.meurant.io/ember-array-contains-helper',
    ENV['ember-cli-mirage'] = {
      enabled: true
    }
  }

  return ENV;
};
