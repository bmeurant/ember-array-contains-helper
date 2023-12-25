/**
 * @module ember-array-contains-helper
 */

import { isNone } from '@ember/utils';
import { A as emberArray, isArray } from '@ember/array';
import { helper } from '@ember/component/helper';

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
 *
 *
 * @public
 * @function arrayContains
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
export function arrayContains([array, value], { property }) {
  // if array undefined or null, we test against an empty array. This is particularily useful
  // if the test occurs before a promise is resolved, for example
  if (isNone(array)) {
    array = emberArray([]);
  }

  if (!isArray(array)) {
    throw new Error('First parameter should be a valid array');
  }

  // Wrap into an Ember.Array to use advanced methods while supporting disabling prototype extensions
  // Note: This operation does not modify the original array
  let wrappedArray = emberArray(array);

  if (property) {
    // Property provided, test the property
    return wrappedArray.isAny(property, value);
  } else {
    // No property provided, test the full object
    return wrappedArray.includes(value);
  }
}

export default helper(arrayContains);
