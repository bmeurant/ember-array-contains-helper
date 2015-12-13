import config from '../config/environment';

export default function () {
  this.urlPrefix = config.host;
  this.namespace = '/';

  this.get('/comics');
  this.get('/comics/:id');
  this.post('/comics', 'comic');
  this.del('/comics/:id');
}
