/**
 * @module ember-array-contains-helper
 */

import { isNone } from "@ember/utils";
import { A as emberArray, isArray } from "@ember/array";
import EmberError from "@ember/error";
import Helper from "@ember/component/helper";
import { set } from "@ember/object";
import { addObserver, removeObserver } from "@ember/object/observers";

/**
 * Helper providing a way to test the presence of an item in an array.
 *
 * Depending on the given parameters, the test is made on
 * - the presence of a **literal**:
 *    ``{{array-contains array 'foo'}}``
 * - the presence of **the object itself**:
 *    ``{{array-contains array object}}``
 * - the presence of **an object containing a specific property with a specific value**:
 *    ``{{array-contains array 'value' property='title'}}``
 *
 * Note that null or undefined are considered acceptable and equivalent values for 'value' parameter (resolve both to null)
 *
 * This helper could be used standalone or, more often, combined with the ``if`` helper:
 *
 * ```html
 *   {{if (array-contains array 'value' property='title') 'something' 'something else'}}
 * ```
 *
 * This addon installs observers on the provided array to listen any external change made on it. It includes any addition/removal
 * of an item and, if a property is specified, any change of the property of any array element.
 *
 * @extends {Ember.Helper}
 *
 * @public
 * @class ArrayContainsHelper
 */
export default Helper.extend({

  /**
   * Test if an array contains an object, eventually based on one of this object property / value
   *
   * @method compute
   * @param {Array} params array and value to test. Array can be null, undefined or valid Array.
   * value could be a literal or an object
   * @param {Object} hash named arguments accepted by this helper (``property``)
   * @return {Boolean}
   * - true if:
   *   - the array in ``params[0]`` contains the object value in ``params[1]``
   *   - the array in ``params[0]`` contains an object holding a property named ``hash.property`` with value equals to ``params[1]``
   * - false otherwise and if the array in ``params[0]`` is null or undefined
   *
   * @throws {Ember.Error} if the given array (from ``params[0]``) is not null and not an array.
   */
  compute(params, hash = {}) {
    let [array, value] = params;

    // if array undefined or null, we test against an empty array. This is particularily usefull
    // if the test occurs before a promise is resolved, for example
    if (isNone(array)) { array = emberArray([]); }

    if (!isArray(array)) {
      throw new EmberError('First parameter should be a valid array');
    }

    const property = hash.property;
    let contained = false;
    this.setupRecompute(array, property);

    // Wrap into an Ember.Array to use advanced methods while supporting disabling prototype extensions
    // Note: This operation does not modify the original array
    let wrappedArray = emberArray(array);

    if (property) {
      // Property provided, test the property
      contained = wrappedArray.isAny(property, value);
    } else {
      // No property provided, test the full object
      contained = wrappedArray.includes(value);
    }

    return contained;
  },

  destroy() {
    if (this.teardown) { this.teardown(); }
    if (this.teardownProperty) { this.teardownProperty(); }
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
