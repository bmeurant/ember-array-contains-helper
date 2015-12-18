/*jshint curly: false */
import Ember from "ember";

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
export default Ember.Helper.extend({

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
    Ember.assert('params should be a not null valid array', Ember.isArray(params));

    let array = params[0];
    let value = params[1];

    // if array undefined or null, we test against an empty array. This is particularily usefull
    // if the test occurs before a promise is resolved, for example
    if (Ember.isNone(array)) array = Ember.A([]);

    Ember.assert('First parameter should be a valid array', Ember.isArray(array));

    let property = hash ? hash.property : null;
    let contains = false;
    this.setupRecompute(array, property);

    // Wrap into an Ember.Array to use advanced method
    // Note: This operation does not modify the original array
    let emberArray = Ember.A(array);

    if (property) {
      // Property provided, test the property
      contains = emberArray.isAny(property, value);
    } else {
      // No property provided, test the full object
      contains = emberArray.contains(value);
    }

    return contains;
  },

  recompute: function () {
    if (this._stream) this._stream.notify();
  },

  destroy() {
    if (this.teardown) this.teardown();
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
    this.set('_array', array);

    // Remove existing observers, if any
    if (this.teardown) this.teardown();
    if (this.teardownProperty) this.teardownProperty();

    // Install observer on the array itself : run when adding / removing items to the array
    let arrayPath = '_array.[]';
    this.addObserver(arrayPath, this, this.recompute);
    // define method to remove observer
    this.teardown = () => {
      this.removeObserver(arrayPath, this, this.recompute);
    };

    if (property) {
      // Install observer on the given property, if any
      let propertyPath = `_array.@each.${property}`;
      this.addObserver(propertyPath, this, this.recompute);
      // define method to remove observer
      this.teardownProperty = () => {
        this.removeObserver(propertyPath, this, this.recompute);
      };
    }
  }
});
