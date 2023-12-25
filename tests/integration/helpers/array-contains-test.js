import { run } from '@ember/runloop';
import EmberObject, { set } from '@ember/object';
import { hbs } from 'ember-cli-htmlbars';
import { render, setupOnerror } from '@ember/test-helpers';

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

module('helper:array-contains', function (hooks) {
  setupRenderingTest(hooks);

  test('should not throw error if array undefined or null', async function (assert) {
    this.set('array', undefined);

    await render(hbs`
      {{array-contains this.array 'any'}}
    `);

    assert.dom().hasText('false', 'array should not contain anything');

    this.set('array', null);

    assert.dom().hasText('false', 'array should not contain anything');
  });

  // Asserting error thrown no longer works as of ember 2.11
  // TODO: unskip once https://github.com/emberjs/ember.js/issues/15013 is resolved (2.17).
  test('should throw error if array is invalid', async function (assert) {
    assert.expect(1);

    this.set('array', 'any');

    setupOnerror(function (error) {
      const { message } = error;
      assert.strictEqual(message, 'First parameter should be a valid array');
    });

    await render(hbs`
      {{array-contains this.array 'any'}}
    `);
  });

  test('should return true if literal contained', async function (assert) {
    this.set('array', ['c', 'string', 0, true, null]);

    this.array.push(undefined);

    await render(hbs`{{array-contains this.array 'c'}}`);

    assert.dom().hasText('true', "array should contain 'c'");

    await render(hbs`{{array-contains this.array 'string'}}`);
    assert.dom().hasText('true', "array should contain 'string'");

    await render(hbs`{{array-contains this.array 0}}`);
    assert.dom().hasText('true', "array should contain '0'");

    await render(hbs`{{array-contains this.array true}}`);
    assert.dom().hasText('true', "array should contain 'true'");

    await render(hbs`{{array-contains this.array null}}`);
    assert.dom().hasText('true', "array should contain 'null'");

    await render(hbs`{{array-contains this.array undefined}}`);
    assert.dom().hasText('true', "array should contain 'undefined'");
  });

  test('should return false if literal not contained', async function (assert) {
    this.set('array', ['c', 'string', 0, true, null]);

    await render(hbs`{{array-contains this.array 'a'}}`);
    assert.dom().hasText('false', "array should not contain 'a'");

    await render(hbs`{{array-contains this.array 'foo'}}`);
    assert.dom().hasText('false', "array should not contain 'foo'");

    await render(hbs`{{array-contains this.array 2}}`);
    assert.dom().hasText('false', "array should not contain '2'");

    await render(hbs`{{array-contains this.array false}}`);
    assert.dom().hasText('false', "array should not contain 'false'");

    await render(hbs`{{array-contains this.array undefined}}`);
    assert.dom().hasText('false', "array should not contain 'undefined'");
  });

  test('should return true if native object contained', async function (assert) {
    let elem = { id: 1, title: 'any' };
    this.set('array', [elem]);
    this.set('elem', elem);

    await render(hbs`{{array-contains this.array this.elem}}`);
    assert.dom().hasText('true', 'array should contain elem');
  });

  test('should return false if native object not contained', async function (assert) {
    this.set('array', [{ id: 2, title: 'other' }]);
    this.set('elem', { id: 1, title: 'any' });

    await render(hbs`{{array-contains this.array this.elem}}`);
    assert.dom().hasText('false', 'array should not contain elem');
  });

  test('should recompute when native object change', async function (assert) {
    let elem = { id: 1, title: 'any' };
    this.set('array', [elem]);
    this.set('elem', elem);

    await render(hbs`{{array-contains this.array this.elem}}`);
    assert.dom().hasText('true', 'array should contain elem');

    this.set('elem', {});

    assert.dom().hasText('false', 'array should not contain elem');

    this.set('elem', elem);

    assert.dom().hasText('true', 'array should contain elem');

    this.set('elem', { id: 1, title: 'any' });

    assert.dom().hasText('false', 'array should not contain elem');
  });

  test('should return true if Ember object contained', async function (assert) {
    let elem = EmberObject.create({ id: 1, title: 'any' });
    this.set('array', [elem]);
    this.set('elem', elem);

    await render(hbs`{{array-contains this.array this.elem}}`);
    assert.dom().hasText('true', 'array should contain elem');
  });

  test('should return false if Ember object not contained', async function (assert) {
    this.set('array', [EmberObject.create({ id: 2, title: 'other' })]);
    this.set('elem', EmberObject.create({ id: 1, title: 'any' }));

    await render(hbs`{{array-contains this.array this.elem}}`);
    assert.dom().hasText('false', 'array should not contain elem');
  });

  test('should recompute when Ember object change', async function (assert) {
    let elem = EmberObject.create({ id: 1, title: 'any' });
    this.set('array', [elem]);
    this.set('elem', elem);

    await render(hbs`{{array-contains this.array this.elem}}`);
    assert.dom().hasText('true', 'array should contain elem');

    this.set('elem', {});

    assert.dom().hasText('false', 'array should not contain elem');

    this.set('elem', elem);

    assert.dom().hasText('true', 'array should contain elem');

    this.set('elem', EmberObject.create({ id: 1, title: 'any' }));

    assert.dom().hasText('false', 'array should not contain elem');
  });

  test('should return true if native object property contained', async function (assert) {
    this.set('array', [{ id: 1, title: 'any' }]);

    await render(hbs`{{array-contains this.array 'any' property='title'}}`);
    assert.dom().hasText('true', "array should contain 'any' title");
  });

  test('should return false if native object property not contained', async function (assert) {
    this.set('array', [{ id: 2, title: 'other' }]);

    await render(hbs`{{array-contains this.array 'any' property='title'}}`);
    assert.dom().hasText('false', "array should not contain 'any' title");
  });

  test('should return true if Ember object contained 1', async function (assert) {
    let elem = EmberObject.create({ id: 1, title: 'any' });
    this.set('array', [elem]);
    this.set('elem', elem);

    await render(hbs`{{array-contains this.array this.elem}}`);
    assert.dom().hasText('true', 'array should contain elem');
  });

  test('should return false if Ember object not contained 2', async function (assert) {
    let elem = EmberObject.create({ id: 1, title: 'any' });
    this.set('array', [EmberObject.create({ id: 2, title: 'other' })]);
    this.set('elem', elem);

    await render(hbs`{{array-contains this.array this.elem}}`);
    assert.dom().hasText('false', 'array should not contain elem');
  });

  test('should recompute when Ember object change 3', async function (assert) {
    let elem = EmberObject.create({ id: 1, title: 'any' });
    this.set('array', [elem]);
    this.set('elem', elem);

    await render(hbs`{{array-contains this.array this.elem}}`);
    assert.dom().hasText('true', 'array should contain elem');

    this.set('elem', {});

    assert.dom().hasText('false', 'array should not contain elem');

    this.set('elem', elem);

    assert.dom().hasText('true', 'array should contain elem');

    this.set('elem', EmberObject.create({ id: 1, title: 'any' }));

    assert.dom().hasText('false', 'array should not contain elem');
  });

  test('should return true if Ember object property contained', async function (assert) {
    this.set('array', [EmberObject.create({ id: 1, title: 'any' })]);

    await render(hbs`{{array-contains this.array 'any' property='title'}}`);
    assert.dom().hasText('true', "array should contain 'any' title");
  });

  test('should return false if Ember object property not contained', async function (assert) {
    this.set('array', [EmberObject.create({ id: 2, title: 'other' })]);

    await render(hbs`{{array-contains this.array 'any' property='title'}}`);
    assert.dom().hasText('false', "array should not contain 'any' title");
  });

  test('should rerun test when array replaced', async function (assert) {
    this.set('array', ['any']);

    await render(hbs`{{array-contains this.array 'any'}}`);
    assert.dom().hasText('true', "array should contain 'any'");

    this.set('array', ['not']);

    assert.dom().hasText('false', "array should not contain 'any'");
  });

  test('should rerun test when array changed', async function (assert) {
    let array = ['any'];
    this.set('array', array);

    await render(hbs`{{array-contains this.array 'any'}}`);
    assert.dom().hasText('true', "array should contain 'any'");

    run(() => {
      array.popObject();
    });

    assert.dom().hasText('false', "array should not contain 'any'");

    run(() => {
      array.pushObject('any');
    });

    assert.dom().hasText('true', "array should contain 'any'");
  });

  test('should rerun test when property in array changed', async function (assert) {
    let object = { id: 1, title: 'any' };
    let array = [object];
    this.set('array', array);

    await render(hbs`{{array-contains this.array 'any' property='title'}}`);
    assert.dom().hasText('true', "array should contain object with prop 'any'");

    run(() => {
      set(object, 'title', 'not');
    });

    assert
      .dom()
      .hasText('false', "array should not contain object with prop 'any'");

    run(() => {
      set(object, 'title', 'any');
    });

    assert.dom().hasText('true', "array should contain object with prop 'any'");
  });

  test('should return true in nested if if Ember object property contained', async function (assert) {
    this.set('array', [EmberObject.create({ id: 1, title: 'any' })]);

    await render(
      hbs`{{if (array-contains this.array 'any' property='title') 'ifTrue' 'ifFalse'}}`
    );
    assert.dom().hasText('ifTrue', "array should contain 'any' title");
  });

  test('should return false in nested if if Ember object property not contained', async function (assert) {
    this.set('array', [EmberObject.create({ id: 2, title: 'other' })]);

    await render(
      hbs`{{if (array-contains this.array 'any' property='title') 'ifTrue' 'ifFalse'}}`
    );
    assert.dom().hasText('ifFalse', "array should not contain 'any' title");
  });
});
