/* eslint-env node */
'use strict';

module.exports = {
  scenarios: [
    {
      name: 'default',
      bower: {
        dependencies: { }
      }
    },
    {
      name: 'ember-1.13',
      bower: {
        dependencies: {
          'ember': '~1.13.0'
        }
      }
    },
    {
      name: 'ember-2.0',
      bower: {
        dependencies: {
          'ember': '~2.0.0'
        },
        resolutions: {
          'ember': '~2.0.0'
        }
      }
    },
    {
      name: 'ember-lts-2.4',
      bower: {
        dependencies: {
          'ember': 'components/ember#lts-2-4'
        },
        resolutions: {
          'ember': 'lts-2-4'
        }
      }
    },
    {
      name: 'ember-lts-2.8',
      bower: {
        dependencies: {
          'ember': 'components/ember#lts-2-8'
        },
        resolutions: {
          'ember': 'lts-2-8'
        }
      }
    },
    {
      name: 'ember-release',
      dependencies: {
        'ember': 'release'
      },
      resolutions: {
        'ember': 'release'
      }
    },
    {
      name: 'ember-beta',
      allowedToFail: true,
      dependencies: {
        'ember': 'beta'
      },
      resolutions: {
        'ember': 'beta'
      }
    },
    {
      name: 'ember-canary',
      allowedToFail: true,
      dependencies: {
        'ember': 'ember#canary'
      },
      resolutions: {
        'ember': 'canary'
      }
    }
  ]
};
