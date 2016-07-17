// Note: exported packages are defined in ember.js/vendor/ember/shims.js
import { isNone } from 'ember-utils';
import { A as emberArray, isEmberArray as isArray } from 'ember-array/utils';
import { assert } from 'ember-metal/utils';
import Helper from 'ember-helper';
import set from 'ember-metal/set';
import { addObserver, removeObserver } from 'ember-metal/observer';

/**
 * Helper proving a way to test the presence of an item in an array.
 *
 * Depending on the given parameters, the test is made on
 * - the presence of a literal:
 *    ``{{array-contains array 'foo'}}``
 * - the presence of the object itself:
 *    ``{{array-contains array object}}``
 * - the presence of an object containing a specific property with a specific value:
 *    ``{{array-contains array 'value' property='title'}}``
 *
 * Note that null or undefined are considered acceptable and equivalent values for 'value' parameter (resolve both to null)
 *
 * This helper could be used standalone or, more often, combined with the ``if`` helper:
 *
 * ```html
 * {{if (array-contains array 'value' property='title') 'something' 'something else'}}
 * ```
 *
 * This addon installs observers on the provided array to listen any external change made on it. It includes any addition/removal
 * of an item and, if a property is specified, any change of the property of any array element.
 *
 * **extends** [Ember.Helper](https://github.com/emberjs/ember.js/blob/f96aecd212fe96b9560c8832b7bbb4988d6670d0/packages/ember-htmlbars/lib/helper.js#L48)
 *
 * @public
 * @class ArrayContainsHelper
 */
export default Helper.extend({

  /**
   * Test if an array contains an object, eventually based on one of this object property / value
   *
   * Returns true if:
   * - the array in ``params[0]`` contains the object value in ``params[1]``
   * - the array in ``params[0]`` contains an object holding a property named ``hash.property`` with
   * value equals to ``params[1]``
   *
   * Returns false otherwise and if the array in ``params[0]`` is null or undefined
   *
   * **extends** [Ember.Helper.compute](https://github.com/emberjs/ember.js/blob/f96aecd212fe96b9560c8832b7bbb4988d6670d0/packages/ember-htmlbars/lib/helper.js#L82)
   *
   * @method compute
   * @param {Array} params array and value to test. Array can be null, undefined or valid Array.
   * value could be a literal or an object
   * @param {Object} hash named arguments accepted by this helper (``property``)
   * @throws {Ember.Error} [(Ember.Error)](https://github.com/emberjs/ember.js/blob/27862a18b8773e57c52dbc7141b1f92a505f16ff/packages/ember-metal/lib/error.js#L22) if params is null or not an array or if the given array (from ``params[0]``) is
   * not null and not an array.
   */
  compute(params, hash) {
    assert('params should be a not null valid array', isArray(params));

    // FIXME: use array destructuring when coverage tooling will support it
    let array = params[0];
    let value = params[1];

    // if array undefined or null, we test against an empty array. This is particularily usefull
    // if the test occurs before a promise is resolved, for example
    if (isNone(array)) { array = emberArray([]); }

    assert('First parameter should be a valid array', isArray(array));

    let property = hash ? hash.property : null;
    let contains = false;
    this.setupRecompute(array, property);

    // Wrap into an Ember.Array to use advanced methods while supporting disabling prototype extensions
    // Note: This operation does not modify the original array
    let wrappedArray = emberArray(array);

    if (property) {
      // Property provided, test the property
      contains = wrappedArray.isAny(property, value);
    } else {
      // No property provided, test the full object
      contains = wrappedArray.contains(value);
    }

    return contains;
  },

  recompute: function () {
    if (this._stream) { this._stream.notify(); }
  },

  destroy() {
    if (this.teardown) { this.teardown(); }
    this._super(...arguments);
  },

  /**
   * Install and clean observers to be able to recompute result if array changes :
   * content added or removed or observed property modified.
   *
   * @method setupRecompute
   * @param {Array} array The given array
   * @param {String} property Name of the property to test
   * @private
   */
  setupRecompute(array, property) {
    set(this, '_array', array);

    // Remove existing observers, if any
    if (this.teardown) { this.teardown(); }
    if (this.teardownProperty) { this.teardownProperty(); }

    // Install observer on the array itself : run when adding / removing items to the array
    let arrayPath = '_array.[]';
    addObserver(this, arrayPath, this, this.recompute);
    // define method to remove observer
    this.teardown = () => {
      removeObserver(this, arrayPath, this, this.recompute);
    };

    if (property) {
      // Install observer on the given property, if any
      let propertyPath = `_array.@each.${property}`;
      addObserver(this, propertyPath, this, this.recompute);
      // define method to remove observer
      this.teardownProperty = () => {
        removeObserver(this, propertyPath, this, this.recompute);
      };
    }
  }
});
