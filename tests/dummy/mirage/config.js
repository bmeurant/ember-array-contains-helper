export default function () {

  this.get('/comics');
  this.get('/comics/:id');
  this.post('/comics', 'comic');
  this.del('/comics/:id');
}
