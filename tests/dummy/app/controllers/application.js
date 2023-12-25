import Controller from '@ember/controller';
import { action } from '@ember/object';
import EmberObject, { set } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

const akiraLit = 'Akira';
const blueberryLit = 'Blueberry';

const akira = { title: 'Akira' };
const blueberry = { title: 'Blueberry' };

const ComicNoData = class extends EmberObject {
  title = '';
};
const akiraND = ComicNoData.create({ title: 'Akira' });
const blueberryND = ComicNoData.create({ title: 'Blueberry' });

export default class ApplicationController extends Controller {
  @service store;

  @tracked akira = true;
  @tracked blacksad = true;
  @tracked blueberry = false;

  @tracked calvinAndHobbesLiteral;
  @tracked calvinAndHobbesNative;
  @tracked calvinAndHobbesNoData;
  @tracked calvinAndHobbes;

  @action
  toggleBlueberry() {
    if (this.blueberry) {
      this.model.comicsLiterals.removeObject(blueberryLit);
      this.model.comicsNative.removeObject(blueberry);
      this.model.comicsNoData.removeObject(blueberryND);

      this.store.unloadRecord(this.store.peekRecord('comic', 4));
    } else {
      this.model.comicsLiterals.pushObject(blueberryLit);
      this.model.comicsNative.pushObject(blueberry);
      this.model.comicsNoData.pushObject(blueberryND);

      this.store.createRecord('comic', { id: 4, title: 'Blueberry' });
    }

    this.blueberry = !this.blueberry;
  }

  @action
  toggleAkira() {
    if (this.akira) {
      this.model.comicsLiterals.removeObject(akiraLit);
      this.model.comicsNative.removeObject(akira);
      this.model.comicsNoData.removeObject(akiraND);

      this.store.unloadRecord(this.store.peekRecord('comic', 1));
    } else {
      this.model.comicsLiterals.pushObject(akiraLit);
      this.model.comicsNative.pushObject(akira);
      this.model.comicsNoData.pushObject(akiraND);

      this.store.createRecord('comic', { id: 1, title: 'Akira' });
    }

    this.akira = !this.akira;
  }

  @action
  async toggleBlacksad() {
    let title = this.blacksad ? 'Blacksad' : 'Foo';
    let newTitle = this.blacksad ? 'Foo' : 'Blacksad';

    this.model.comicsLiterals.removeObject(title);
    this.model.comicsLiterals.pushObject(newTitle);
    set(this.model.comicsNoData.findBy('title', title), 'title', newTitle);
    set(this.model.comicsNative.findBy('title', title), 'title', newTitle);

    let blacksad = await this.store.find('comic', 2);
    set(blacksad, 'title', newTitle);

    this.blacksad = !this.blacksad;
  }
}
