import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    updateBlueberry () {
      this.send('toggleBlueberry');
    },
    updateAkira () {
      this.send('toggleAkira');
    },
    updateBlacksad () {
      this.send('toggleBlacksad');
    }
  }
});
