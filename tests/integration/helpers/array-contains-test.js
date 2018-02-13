import { run } from '@ember/runloop';
import EmberObject, { set } from '@ember/object';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import { expect } from 'chai';
import hbs from 'htmlbars-inline-precompile';

describe('helper:array-contains', function() {
  setupComponentTest('array-contains', { integration: true });

  it('should not throw error if array undefined or null', function () {
    this.set('array', undefined);

    this.render(hbs`{{array-contains array 'any'}}`);
    expect(this.$().text()).to.equal("false", "array should not contain anything");

    this.set('array', null);
    expect(this.$().text()).to.equal("false", "array should not contain anything");
  });

  // Asserting error thrown no longer works as of ember 2.11
  // TODO: unskip once https://github.com/emberjs/ember.js/issues/15013 is resolved (2.17).
  it.skip('should throw error if array is invalid', function () {
    this.set('array', 'any');

    expect(this.render.bind(this,hbs`{{array-contains array 'any'}}`))
      .to.throw("Error: First parameter should be a valid array");
  });

  it('should return true if literal contained', function () {
    this.set('array', ['c', 'string', 0, true, null]);

    this.get('array').push(undefined);

    this.render(hbs`{{array-contains array 'c'}}`);
    expect(this.$().text()).to.equal("true", "array should contain 'c'");

    this.render(hbs`{{array-contains array 'string'}}`);
    expect(this.$().text()).to.equal("true","array should contain 'string'");

    this.render(hbs`{{array-contains array 0}}`);
    expect(this.$().text()).to.equal("true", "array should contain '0'");

    this.render(hbs`{{array-contains array true}}`);
    expect(this.$().text()).to.equal("true", "array should contain 'true'");

    this.render(hbs`{{array-contains array null}}`);
    expect(this.$().text()).to.equal("true", "array should contain 'null'");

    this.render(hbs`{{array-contains array undefined}}`);
    expect(this.$().text()).to.equal("true", "array should contain 'undefined'");
  });

  it('should return false if literal not contained', function () {
    this.set('array', ['c', 'string', 0, true, null]);

    this.render(hbs`{{array-contains array 'a'}}`);
    expect(this.$().text()).to.equal("false", "array should not contain 'a'");

    this.render(hbs`{{array-contains array 'foo'}}`);
    expect(this.$().text()).to.equal("false", "array should not contain 'foo'");

    this.render(hbs`{{array-contains array 2}}`);
    expect(this.$().text()).to.equal("false", "array should not contain '2'");

    this.render(hbs`{{array-contains array false}}`);
    expect(this.$().text()).to.equal("false", "array should not contain 'false'");

    this.render(hbs`{{array-contains array undefined}}`);
    expect(this.$().text()).to.equal("false", "array should not contain 'undefined'");
  });

  it('should return true if native object contained', function () {
    let elem = {id: 1, title: 'any'};
    this.set('array', [elem]);
    this.set('elem', elem);

    this.render(hbs`{{array-contains array elem}}`);
    expect(this.$().text()).to.equal("true", "array should contain elem");
  });

  it('should return false if native object not contained', function () {
    this.set('array', [{id: 2, title: 'other'}]);
    this.set('elem', {id: 1, title: 'any'});

    this.render(hbs`{{array-contains array elem}}`);
    expect(this.$().text()).to.equal("false", "array should not contain elem");
  });

  it('should recompute when native object change', function () {
    let elem = {id: 1, title: 'any'};
    this.set('array', [elem]);
    this.set('elem', elem);

    this.render(hbs`{{array-contains array elem}}`);
    expect(this.$().text()).to.equal("true", "array should contain elem");

    this.set('elem', {});

    expect(this.$().text()).to.equal("false", "array should not contain elem");

    this.set('elem', elem);

    expect(this.$().text()).to.equal("true", "array should contain elem");

    this.set('elem', {id: 1, title: 'any'});

    expect(this.$().text()).to.equal("false", "array should not contain elem");
  });

  it('should return true if Ember object contained', function () {
    let elem = EmberObject.create({id: 1, title: 'any'});
    this.set('array', [elem]);
    this.set('elem', elem);

    this.render(hbs`{{array-contains array elem}}`);
    expect(this.$().text()).to.equal("true", "array should contain elem");
  });

  it('should return false if Ember object not contained', function () {
    this.set('array', [EmberObject.create({id: 2, title: 'other'})]);
    this.set('elem', EmberObject.create({id: 1, title: 'any'}));

    this.render(hbs`{{array-contains array elem}}`);
    expect(this.$().text()).to.equal("false", "array should not contain elem");
  });

  it('should recompute when Ember object change', function () {
    let elem = EmberObject.create({id: 1, title: 'any'});
    this.set('array', [elem]);
    this.set('elem', elem);

    this.render(hbs`{{array-contains array elem}}`);
    expect(this.$().text()).to.equal("true", "array should contain elem");

    this.set('elem', {});

    expect(this.$().text()).to.equal("false", "array should not contain elem");

    this.set('elem', elem);

    expect(this.$().text()).to.equal("true", "array should contain elem");

    this.set('elem', EmberObject.create({id: 1, title: 'any'}));

    expect(this.$().text()).to.equal("false", "array should not contain elem");
  });

  it('should return true if native object property contained', function () {
    this.set('array', [{id: 1, title: 'any'}]);

    this.render(hbs`{{array-contains array 'any' property='title'}}`);
    expect(this.$().text()).to.equal("true", "array should contain 'any' title");
  });

  it('should return false if native object property not contained', function () {
    this.set('array', [{id: 2, title: 'other'}]);

    this.render(hbs`{{array-contains array 'any' property='title'}}`);
    expect(this.$().text()).to.equal("false", "array should not contain 'any' title");
  });

  it('should return true if Ember object contained', function () {
    let elem = EmberObject.create({id: 1, title: 'any'});
    this.set('array', [elem]);
    this.set('elem', elem);

    this.render(hbs`{{array-contains array elem}}`);
    expect(this.$().text()).to.equal("true", "array should contain elem");
  });

  it('should return false if Ember object not contained', function () {
    let elem = EmberObject.create({id: 1, title: 'any'});
    this.set('array', [EmberObject.create({id: 2, title: 'other'})]);
    this.set('elem', elem);

    this.render(hbs`{{array-contains array elem}}`);
    expect(this.$().text()).to.equal("false", "array should not contain elem");
  });

  it('should recompute when Ember object change', function () {
    let elem = EmberObject.create({id: 1, title: 'any'});
    this.set('array', [elem]);
    this.set('elem', elem);

    this.render(hbs`{{array-contains array elem}}`);
    expect(this.$().text()).to.equal("true", "array should contain elem");

    this.set('elem', {});

    expect(this.$().text()).to.equal("false", "array should not contain elem");

    this.set('elem', elem);

    expect(this.$().text()).to.equal("true", "array should contain elem");

    this.set('elem', EmberObject.create({id: 1, title: 'any'}));

    expect(this.$().text()).to.equal("false", "array should not contain elem");
  });

  it('should return true if Ember object property contained', function () {
    this.set('array', [EmberObject.create({id: 1, title: 'any'})]);

    this.render(hbs`{{array-contains array 'any' property='title'}}`);
    expect(this.$().text()).to.equal("true", "array should contain 'any' title");
  });

  it('should return false if Ember object property not contained', function () {
    this.set('array', [EmberObject.create({id: 2, title: 'other'})]);

    this.render(hbs`{{array-contains array 'any' property='title'}}`);
    expect(this.$().text()).to.equal("false", "array should not contain 'any' title");
  });

  it('should rerun test when array replaced', function () {
    this.set('array', ['any']);

    this.render(hbs`{{array-contains array 'any'}}`);
    expect(this.$().text()).to.equal("true", "array should contain 'any'");

    this.set('array', ['not']);

    expect(this.$().text()).to.equal("false", "array should not contain 'any'");
  });

  it('should rerun test when array changed', function () {
    let array = ['any'];
    this.set('array', array);

    this.render(hbs`{{array-contains array 'any'}}`);
    expect(this.$().text()).to.equal("true", "array should contain 'any'");

    run(() => {
      array.popObject();
    });

    expect(this.$().text()).to.equal("false", "array should not contain 'any'");

    run(() => {
      array.pushObject('any');
    });

    expect(this.$().text()).to.equal("true", "array should contain 'any'");
  });

  it('should rerun test when property in array changed', function () {
    let object = {id: 1, title: 'any'};
    let array = [object];
    this.set('array', array);

    this.render(hbs`{{array-contains array 'any' property='title'}}`);
    expect(this.$().text()).to.equal("true", "array should contain object with prop 'any'");

    run(() => {
      set(object, 'title', 'not');
    });

    expect(this.$().text()).to.equal("false", "array should not contain object with prop 'any'");

    run(() => {
      set(object, 'title', 'any');
    });

    expect(this.$().text()).to.equal("true", "array should contain object with prop 'any'");
  });

  it('should return true in nested if if Ember object property contained', function () {
    this.set('array', [EmberObject.create({id: 1, title: 'any'})]);

    this.render(hbs`{{if (array-contains array 'any' property='title') 'ifTrue' 'ifFalse'}}`);
    expect(this.$().text()).to.equal("ifTrue", "array should contain 'any' title");
  });

  it('should return false in nested if if Ember object property not contained', function () {
    this.set('array', [EmberObject.create({id: 2, title: 'other'})]);

    this.render(hbs`{{if (array-contains array 'any' property='title') 'ifTrue' 'ifFalse'}}`);
    expect(this.$().text()).to.equal("ifFalse", "array should not contain 'any' title");
  });
});


