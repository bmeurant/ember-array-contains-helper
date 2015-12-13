import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('array-contains', 'helper:array-contains', {
  integration: true
});

test('should throw error if array undefined or invalid', function (assert) {
  assert.expect(2);

  this.set('array', null);

  try {
    this.render(Ember.HTMLBars.compile("{{array-contains array 'any'}}"));
  }
  catch (error) {
    assert.ok(error !== undefined, "null array throws exception");
  }

  try {
    this.set('array', 'any');
  }
  catch (error) {
    assert.ok(error !== undefined, "invalid array throws exception");
  }

});

test('should return true if literal contained', function (assert) {
  this.set('array', ['c', 'string', 0, true, null]);

  this.render(Ember.HTMLBars.compile("{{array-contains array 'c'}}"));
  assert.equal(this.$().text(), "true", "array should contain 'c'");

  this.render(Ember.HTMLBars.compile("{{array-contains array 'string'}}"));
  assert.equal(this.$().text(), "true", "array should contain 'string'");

  this.render(Ember.HTMLBars.compile("{{array-contains array 0}}"));
  assert.equal(this.$().text(), "true", "array should contain '0'");

  this.render(Ember.HTMLBars.compile("{{array-contains array true}}"));
  assert.equal(this.$().text(), "true", "array should contain 'true'");

  this.render(Ember.HTMLBars.compile("{{array-contains array null}}"));
  assert.equal(this.$().text(), "true", "array should contain 'null'");

  this.render(Ember.HTMLBars.compile("{{array-contains array undefined}}"));
  assert.equal(this.$().text(), "true", "array should contain 'undefined'");
});

test('should return false if literal not contained', function (assert) {
  this.set('array', ['c', 'string', 0, true, null]);

  this.render(Ember.HTMLBars.compile("{{array-contains array 'a'}}"));
  assert.equal(this.$().text(), "false", "array should not contain 'a'");

  this.render(Ember.HTMLBars.compile("{{array-contains array 'foo'}}"));
  assert.equal(this.$().text(), "false", "array should not contain 'foo'");

  this.render(Ember.HTMLBars.compile("{{array-contains array 2}}"));
  assert.equal(this.$().text(), "false", "array should not contain '2'");

  this.render(Ember.HTMLBars.compile("{{array-contains array false}}"));
  assert.equal(this.$().text(), "false", "array should not contain 'false'");
});

test('should return true if native object contained', function (assert) {
  let elem = {id: 1, title: 'any'};
  this.set('array', [elem]);
  this.set('elem', elem);

  this.render(Ember.HTMLBars.compile("{{array-contains array elem}}"));
  assert.equal(this.$().text(), "true", "array should contain elem");
});

test('should return false if native object not contained', function (assert) {
  this.set('array', [{id: 2, title: 'other'}]);
  this.set('elem', {id: 1, title: 'any'});

  this.render(Ember.HTMLBars.compile("{{array-contains array elem}}"));
  assert.equal(this.$().text(), "false", "array should not contain elem");
});

test('should recompute when native object change', function (assert) {
  let elem = {id: 1, title: 'any'};
  this.set('array', [elem]);
  this.set('elem', elem);

  this.render(Ember.HTMLBars.compile("{{array-contains array elem}}"));
  assert.equal(this.$().text(), "true", "array should contain elem");

  this.set('elem', {});

  assert.equal(this.$().text(), "false", "array should not contain elem");

  this.set('elem', elem);

  assert.equal(this.$().text(), "true", "array should contain elem");

  this.set('elem', {id: 1, title: 'any'});

  assert.equal(this.$().text(), "false", "array should not contain elem");
});

test('should return true if Ember object contained', function (assert) {
  let elem = Ember.Object.create({id: 1, title: 'any'});
  this.set('array', [elem]);
  this.set('elem', elem);

  this.render(Ember.HTMLBars.compile("{{array-contains array elem}}"));
  assert.equal(this.$().text(), "true", "array should contain elem");
});

test('should return false if Ember object not contained', function (assert) {
  this.set('array', [Ember.Object.create({id: 2, title: 'other'})]);
  this.set('elem', Ember.Object.create({id: 1, title: 'any'}));

  this.render(Ember.HTMLBars.compile("{{array-contains array elem}}"));
  assert.equal(this.$().text(), "false", "array should not contain elem");
});

test('should recompute when Ember object change', function (assert) {
  let elem = Ember.Object.create({id: 1, title: 'any'});
  this.set('array', [elem]);
  this.set('elem', elem);

  this.render(Ember.HTMLBars.compile("{{array-contains array elem}}"));
  assert.equal(this.$().text(), "true", "array should contain elem");

  this.set('elem', {});

  assert.equal(this.$().text(), "false", "array should not contain elem");

  this.set('elem', elem);

  assert.equal(this.$().text(), "true", "array should contain elem");

  this.set('elem', Ember.Object.create({id: 1, title: 'any'}));

  assert.equal(this.$().text(), "false", "array should not contain elem");
});

test('should return true if native object property contained', function (assert) {
  this.set('array', [{id: 1, title: 'any'}]);

  this.render(Ember.HTMLBars.compile("{{array-contains array 'any' property='title'}}"));
  assert.equal(this.$().text(), "true", "array should contain 'any' title");
});

test('should return false if native object property not contained', function (assert) {
  this.set('array', [{id: 2, title: 'other'}]);

  this.render(Ember.HTMLBars.compile("{{array-contains array 'any' property='title'}}"));
  assert.equal(this.$().text(), "false", "array should not contain 'any' title");
});

test('should return true if Ember object contained', function (assert) {
  let elem = Ember.Object.create({id: 1, title: 'any'});
  this.set('array', [elem]);
  this.set('elem', elem);

  this.render(Ember.HTMLBars.compile("{{array-contains array elem}}"));
  assert.equal(this.$().text(), "true", "array should contain elem");
});

test('should return false if Ember object not contained', function (assert) {
  let elem = Ember.Object.create({id: 1, title: 'any'});
  this.set('array', [Ember.Object.create({id: 2, title: 'other'})]);
  this.set('elem', elem);

  this.render(Ember.HTMLBars.compile("{{array-contains array elem}}"));
  assert.equal(this.$().text(), "false", "array should not contain elem");
});

test('should recompute when Ember object change', function (assert) {
  let elem = Ember.Object.create({id: 1, title: 'any'});
  this.set('array', [elem]);
  this.set('elem', elem);

  this.render(Ember.HTMLBars.compile("{{array-contains array elem}}"));
  assert.equal(this.$().text(), "true", "array should contain elem");

  this.set('elem', {});

  assert.equal(this.$().text(), "false", "array should not contain elem");

  this.set('elem', elem);

  assert.equal(this.$().text(), "true", "array should contain elem");

  this.set('elem', Ember.Object.create({id: 1, title: 'any'}));

  assert.equal(this.$().text(), "false", "array should not contain elem");
});

test('should return true if Ember object property contained', function (assert) {
  this.set('array', [Ember.Object.create({id: 1, title: 'any'})]);

  this.render(Ember.HTMLBars.compile("{{array-contains array 'any' property='title'}}"));
  assert.equal(this.$().text(), "true", "array should contain 'any' title");
});

test('should return false if Ember object property not contained', function (assert) {
  this.set('array', [Ember.Object.create({id: 2, title: 'other'})]);

  this.render(Ember.HTMLBars.compile("{{array-contains array 'any' property='title'}}"));
  assert.equal(this.$().text(), "false", "array should not contain 'any' title");
});

test('should rerun test when array replaced', function (assert) {
  this.set('array', ['any']);

  this.render(Ember.HTMLBars.compile("{{array-contains array 'any'}}"));
  assert.equal(this.$().text(), "true", "array should contain 'any'");

  this.set('array', ['not']);

  assert.equal(this.$().text(), "false", "array should not contain 'any'");
});

test('should rerun test when array changed', function (assert) {
  let array = ['any'];
  this.set('array', array);

  this.render(Ember.HTMLBars.compile("{{array-contains array 'any'}}"));
  assert.equal(this.$().text(), "true", "array should contain 'any'");

  Ember.run(() => {
    array.popObject();
  });

  assert.equal(this.$().text(), "false", "array should not contain 'any'");

  Ember.run(() => {
    array.pushObject('any');
  });

  assert.equal(this.$().text(), "true", "array should contain 'any'");
});

test('should rerun test when property in array changed', function (assert) {
  let object = {id:1, title: 'any'};
  let array = [object];
  this.set('array', array);

  this.render(Ember.HTMLBars.compile("{{array-contains array 'any' property='title'}}"));
  assert.equal(this.$().text(), "true", "array should contain object with prop 'any'");

  Ember.run(() => {
    Ember.set(object, 'title', 'not');
  });

  assert.equal(this.$().text(), "false", "array should not contain object with prop 'any'");

  Ember.run(() => {
    Ember.set(object, 'title', 'any');
  });

  assert.equal(this.$().text(), "true", "array should contain object with prop 'any'");
});


