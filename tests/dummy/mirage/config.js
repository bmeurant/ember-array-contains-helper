import config from '../config/environment';

export default function () {

  this.passthrough('/write-coverage');

  if (config.environment === 'production') {
    this.namespace = 'http://baptiste.meurant.io/ember-array-contains-helper';
  }

  this.get('/comics');
  this.get('/comics/:id');
  this.post('/comics', 'comic');
  this.del('/comics/:id');
}
