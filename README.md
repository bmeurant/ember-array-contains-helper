# ember-array-contains-helper

Ember HTMLBars template helper allowing to test if an array contains a particular element.
 
This helper allows to test the presence of a literal, an entire object or an object with
a specific property set at a specific value, can be found into the given array. Objects can
be native or Ember objects.

## Compatibility

This helper is tested and compatible with **1.13.0+ ember versions**. See travis CI build and report [here](https://travis-ci.org/bmeurant/ember-array-contains-helper)

## Installation

* `ember install ember-array-contains-helper`

## Usage

```html
{{array-contains <array> <value> [property='<property>']}}
```

Where:

* `<array>` is the array to search into. Should be a valid not null array.
* `<value>` is the value which is supposed to be contained or not in the arrray. Could be an object or a literal.
Could be null or undefined
* `<property>` is an option: if set, the search is done on the presence of an object containing a
property `<property>` with the value `<value>`. If not, the search is done of the presence of the entire
`<value>` (object or literal)

This helper could be:

* used standalone: 
   ```html
   {{array-contains model 'value' property='title'}}
   ``` 
   
* or, more often, combined with the ``if`` helper: 
   ```html
   {{if (array-contains model 'value' property='title') 'something' 'something else'}}
   ```

Depending on the given parameters, the test is made on

* the presence of a literal:
  
```javascript
// routes/application.js

import Ember from 'ember';
export default Ember.Route.extend({
  model () {
    return ['Akira', 'Blacksad', 'CalvinAndHobbes'];
  }
});
```

```html
{{!-- templates/application.hbs --}}

{{array-contains model 'Akira'}}
```
   
* the presence of the object itself:
   
```javascript
// routes/application.js

import Ember from 'ember';
import Comic from '../models/comic';

let blackSad = Comic.create({
  title: 'Blacksad'
});

let calvinAndHobbes = Comic.create({
  title: 'Calvin and Hobbes'
});

let akira = Comic.create({
  title: 'Akira'
});

export default Ember.Route.extend({
  model () {
    return [akira, blacksad, calvinAndHobbes];
  },
  
  setupController (controller, model) {
    controller.set('calvinAndHobbes', calvinAndHobbes);
    this._super(controller, model);
  },
});
```

```html
{{!-- templates/application.hbs --}}
   
{{array-contains model calvinAndHobbes}}
```
   
* the presence of an object containing a specific property with a specific value using the option ``property``:

```javascript
// routes/application.js

import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    return this.store.findAll('comic');
  }
});
```

```html
{{!-- templates/application.hbs --}}
   
{{array-contains model 'Blacksad' property='title'}}
```

Note that null or undefined are considered acceptable and equivalent values for 'value' parameter (resolve both to null)

### Observing

This addon installs observers on the provided array to listen any external change made on it. It includes any addition/removal
of an item and, if a property is specified, any change of the property of any array element.

### Samples & Demo

* A dummy demo application containing syntax samples runs [here](http://baptiste.meurant.io/ember-array-contains-helper/)
* The source code of this demo can be found [here](https://github.com/bmeurant/ember-array-contains-helper/blob/master/tests/dummy/app/templates/application.hbs)

## Development

### Installation

* `git clone https://github.com/bmeurant/ember-array-contains-helper`
* `npm install`
* `bower install`

### Running dummy demo app

* `npm install`
* `bower install`
* `ember server`
* Visit your app at http://localhost:4200.

### Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
