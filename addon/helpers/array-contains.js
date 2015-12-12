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
 *    ``{{array-contains array object property='title'}}``
 *
 * Note that null or undefined are considered acceptable and equivalent values for 'value' parameter (resolve both to null)
 *
 * This helper could be used standalone of, more often combined with the ``if`` helper:
 * ``{{if (array-contains array object property='title') 'something' 'something else'}}``
 */
export default Ember.Helper.extend({
  compute (params, hash) {
    let [array, value] = params;

    Ember.assert('First parameter should be a not null valid array', Ember.isArray(array));

    let property = hash.property;
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

  destroy() {
    if (this.teardown) this.teardown();
    this._super(...arguments);
  },

  /* Install and clean observers to be able to recompute result if array changes :
   * content added or removed or observed property modified
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
