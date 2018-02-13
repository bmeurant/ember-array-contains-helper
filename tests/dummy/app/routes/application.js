import { hash } from 'rsvp';
import Route from '@ember/routing/route';
import EmberObject, { get, set, setProperties } from '@ember/object';

const akiraLit = 'Akira';
const blacksadLit = 'Blacksad';
const calvinHandHobbesLit = 'CalvinAndHobbes';
const blueberryLit = 'Blueberry';

const akira = {title: 'Akira'};
const blacksad = {title: 'Blacksad'};
const calvinAndHobbes = {title: 'Calvin and Hobbes'};
const blueberry = {title: 'Blueberry'};

const ComicNoData = EmberObject.extend({ title: '' });
const blackSadND = ComicNoData.create({ title: 'Blacksad' });
const calvinAndHobbesND = ComicNoData.create({ title: 'Calvin and Hobbes' });
const akiraND = ComicNoData.create({ title: 'Akira' });
const blueberryND = ComicNoData.create({ title: 'Blueberry' });

export default Route.extend({
  akira:     true,
  blacksad:  true,
  blueberry: false,

  init () {
    this._super(...arguments);
    set(this, 'comicsLiterals', [akiraLit, blacksadLit, calvinHandHobbesLit]);
    set(this, 'comicsNative', [akira, blacksad, calvinAndHobbes]);
    set(this, 'comicsNoData', [akiraND, blackSadND, calvinAndHobbesND]);
  },

  model () {
    return hash({
      comicsLiterals: get(this, 'comicsLiterals'),
      comicsNative: get(this, 'comicsNative'),
      comicsNoData: get(this, 'comicsNoData'),
      comics: get(this, 'store').findAll('comic')
    });
  },

  setupController (controller, model) {
    setProperties(controller, {
      'calvinAndHobbesLiteral': calvinHandHobbesLit,
      'calvinAndHobbesNative':  calvinAndHobbes,
      'calvinAndHobbesNoData':  calvinAndHobbesND,
      'calvinAndHobbes':        set(this, 'calvinAndHobbes', get(this, 'store').find('comic', 3))
    });

    this._super(controller, model);
  },

  actions: {
    toggleBlueberry () {
      if (get(this, 'blueberry')) {
        get(this, 'comicsLiterals').removeObject(blueberryLit);
        get(this, 'comicsNative').removeObject(blueberry);
        get(this, 'comicsNoData').removeObject(blueberryND);

        get(this, 'store').unloadRecord(get(this, 'store').peekRecord('comic', 4));
      } else {
        get(this, 'comicsLiterals').pushObject(blueberryLit);
        get(this, 'comicsNative').pushObject(blueberry);
        get(this, 'comicsNoData').pushObject(blueberryND);

        get(this, 'store').createRecord('comic', {id: 4, title: 'Blueberry'});
      }

      this.toggleProperty('blueberry');
    },

    toggleAkira () {
      if (get(this, 'akira')) {
        get(this, 'comicsLiterals').removeObject(akiraLit);
        get(this, 'comicsNative').removeObject(akira);
        get(this, 'comicsNoData').removeObject(akiraND);

        get(this, 'store').unloadRecord(get(this, 'store').peekRecord('comic', 1));
      } else {
        get(this, 'comicsLiterals').pushObject(akiraLit);
        get(this, 'comicsNative').pushObject(akira);
        get(this, 'comicsNoData').pushObject(akiraND);

        get(this, 'store').createRecord('comic', {id: 1, title: 'Akira'});
      }

      this.toggleProperty('akira');
    },

    toggleBlacksad () {
      let title = (get(this, 'blacksad')) ? 'Blacksad' : 'Foo';
      let newTitle = (get(this, 'blacksad')) ? 'Foo' : 'Blacksad';

      get(this, 'comicsLiterals').removeObject(title);
      get(this, 'comicsLiterals').pushObject(newTitle);
      set(get(this, 'comicsNoData').findBy('title', title), 'title', newTitle);
      set(get(this, 'comicsNative').findBy('title', title), 'title', newTitle);

      get(this, 'store').find('comic', 2).then((blacksad) => {
        set(blacksad, 'title', newTitle);
      });

      this.toggleProperty('blacksad');
    }
  }
});
