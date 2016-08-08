import Ember from 'ember';

export default Ember.Controller.extend({
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
