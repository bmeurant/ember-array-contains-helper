import { hash } from 'rsvp';
import Route from '@ember/routing/route';
import EmberObject from '@ember/object';
import { inject as service } from '@ember/service';

const akiraLit = 'Akira';
const blacksadLit = 'Blacksad';
const calvinHandHobbesLit = 'CalvinAndHobbes';

const akira = { title: 'Akira' };
const blacksad = { title: 'Blacksad' };
const calvinAndHobbes = { title: 'Calvin and Hobbes' };

const ComicNoData = class extends EmberObject {
  title = '';
};
const blackSadND = ComicNoData.create({ title: 'Blacksad' });
const calvinAndHobbesND = ComicNoData.create({ title: 'Calvin and Hobbes' });
const akiraND = ComicNoData.create({ title: 'Akira' });

export default class ApplicationRoute extends Route {
  @service store;

  comicsLiterals = [akiraLit, blacksadLit, calvinHandHobbesLit];
  comicsNative = [akira, blacksad, calvinAndHobbes];
  comicsNoData = [akiraND, blackSadND, calvinAndHobbesND];

  model() {
    return hash({
      comicsLiterals: this.comicsLiterals,
      comicsNative: this.comicsNative,
      comicsNoData: this.comicsNoData,
      comics: this.store.findAll('comic'),
    });
  }

  setupController(controller) {
    super.setupController(...arguments);

    controller.calvinAndHobbesLiteral = calvinHandHobbesLit;
    controller.calvinAndHobbesNative = calvinAndHobbes;
    controller.calvinAndHobbesNoData = calvinAndHobbesND;
    controller.calvinAndHobbes = this.store.find('comic', 3);
  }
}
