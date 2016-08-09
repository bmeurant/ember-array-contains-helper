import Ember from 'ember';

const akiraLit = 'Akira';
const blacksadLit = 'Blacksad';
const calvinHandHobbesLit = 'CalvinAndHobbes';
const blueberryLit = 'Blueberry';

const akira = {title: 'Akira'};
const blacksad = {title: 'Blacksad'};
const calvinAndHobbes = {title: 'Calvin and Hobbes'};
const blueberry = {title: 'Blueberry'};

const ComicNoData = Ember.Object.extend({ title: '' });
const blackSadND = ComicNoData.create({ title: 'Blacksad' });
const calvinAndHobbesND = ComicNoData.create({ title: 'Calvin and Hobbes' });
const akiraND = ComicNoData.create({ title: 'Akira' });
const blueberryND = ComicNoData.create({ title: 'Blueberry' });

export default Ember.Route.extend({
  comicsLiterals: [akiraLit, blacksadLit, calvinHandHobbesLit],
  comicsNative:   [akira, blacksad, calvinAndHobbes],
  comicsNoData:   [akiraND, blackSadND, calvinAndHobbesND],

  akira:     true,
  blacksad:  true,
  blueberry: false,

  model () {
    return Ember.RSVP.hash({
      comicsLiterals: this.get('comicsLiterals'),
      comicsNative: this.get('comicsNative'),
      comicsNoData: this.get('comicsNoData'),
      comics: this.store.findAll('comic')
    });
  },

  setupController (controller, model) {
    controller.setProperties({
      'calvinAndHobbesLiteral': calvinHandHobbesLit,
      'calvinAndHobbesNative':  calvinAndHobbes,
      'calvinAndHobbesNoData':  calvinAndHobbesND,
      'calvinAndHobbes':        this.set('calvinAndHobbes', this.store.find('comic', 3))
    });

    this._super(controller, model);
  },

  actions: {
    toggleBlueberry () {
      if (this.get('blueberry')) {
        this.get('comicsLiterals').removeObject(blueberryLit);
        this.get('comicsNative').removeObject(blueberry);
        this.get('comicsNoData').removeObject(blueberryND);

        this.store.unloadRecord(this.store.peekRecord('comic', 4));
      } else {
        this.get('comicsLiterals').pushObject(blueberryLit);
        this.get('comicsNative').pushObject(blueberry);
        this.get('comicsNoData').pushObject(blueberryND);

        this.store.createRecord('comic', {id: 4, title: 'Blueberry'});
      }

      this.toggleProperty('blueberry');
    },

    toggleAkira () {
      if (this.get('akira')) {
        this.get('comicsLiterals').removeObject(akiraLit);
        this.get('comicsNative').removeObject(akira);
        this.get('comicsNoData').removeObject(akiraND);

        this.store.unloadRecord(this.store.peekRecord('comic', 1));
      } else {
        this.get('comicsLiterals').pushObject(akiraLit);
        this.get('comicsNative').pushObject(akira);
        this.get('comicsNoData').pushObject(akiraND);

        this.store.createRecord('comic', {id: 1, title: 'Akira'});
      }

      this.toggleProperty('akira');
    },

    toggleBlacksad () {
      let title = (this.get('blacksad')) ? 'Blacksad' : 'Foo';
      let newTitle = (this.get('blacksad')) ? 'Foo' : 'Blacksad';

      this.get('comicsLiterals').removeObject(title);
      this.get('comicsLiterals').pushObject(newTitle);
      this.get('comicsNoData').findBy('title', title).set('title', newTitle);

      Ember.set(this.get('comicsNative').findBy('title', title), 'title', newTitle);

      this.store.find('comic', 2).then((blacksad) => {
        blacksad.set('title', newTitle);
      });

      this.toggleProperty('blacksad');
    }
  }
});
