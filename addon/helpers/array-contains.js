import Ember from "ember";

// note that null or undefined are considered acceptable and equivalent values for 'value' parameter (resolve both to null)
export default Ember.Helper.extend({
  compute (params, hash) {
    let [array, value] = params;
    let contains = false;

    Ember.assert('First parameter should be a not null valid array', Ember.isArray(array));

    // Wrap into an Ember.Array to use advanced method
    // Note: This operation does not modify the original array
    let emberArray = Ember.A(array);

    if (hash.property === undefined) {
      // No property provided, test the full object
      contains = emberArray.contains(value);
    } else {
      // Property provided, test the property
      contains = emberArray.isAny(hash.property, value);
    }

    return contains;
  }
});
