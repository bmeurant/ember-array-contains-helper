import config from '../config/environment';

export default function () {

  if (config.environment === 'production') {
    this.namespace = 'ember-array-contains-helper';
  }

  this.get('/comics');
  this.get('/comics/:id');
  this.post('/comics', 'comic');
  this.del('/comics/:id');
}
