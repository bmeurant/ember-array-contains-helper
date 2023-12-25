import ENV from '../config/environment';

import { discoverEmberDataModels } from 'ember-cli-mirage';
import { createServer } from 'miragejs';

export default function (config) {
  let finalConfig = {
    ...config,
    models: {
      ...discoverEmberDataModels(config.store),
      ...config.models,
    },
    routes,
  };

  return createServer(finalConfig);
}

// This would be your old default export function renamed
function routes() {
  if (ENV.environment === 'production') {
    this.namespace = 'ember-array-contains-helper';
  }

  this.get('/comics');
  this.get('/comics/:id');
  this.post('/comics', 'comic');
  this.del('/comics/:id');
}
