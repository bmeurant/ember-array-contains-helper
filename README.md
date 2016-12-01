# ember-array-contains-helper 

[![Build Status](https://travis-ci.org/bmeurant/ember-array-contains-helper.svg?branch=master)](https://travis-ci.org/bmeurant/ember-array-contains-helper)
[![npm version](https://img.shields.io/npm/v/ember-array-contains-helper.svg)](https://www.npmjs.com/package/ember-array-contains-helper)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE.md)
[![Ember badge](https://embadge.io/v1/badge.svg?start=1.13.1&label=ember)](http://embadge.io/)

[![Ember Observer Score](http://emberobserver.com/badges/ember-array-contains-helper.svg)](http://emberobserver.com/addons/ember-array-contains-helper)
[![Code Climate](https://codeclimate.com/github/bmeurant/ember-array-contains-helper/badges/gpa.svg)](https://codeclimate.com/github/bmeurant/ember-array-contains-helper)
[![Test Coverage](https://coveralls.io/repos/github/bmeurant/ember-array-contains-helper/badge.svg?branch=master&service=github)](https://coveralls.io/github/bmeurant/ember-array-contains-helper?branch=master)
[![dependencies](https://david-dm.org/bmeurant/ember-array-contains-helper/status.svg)](https://david-dm.org/bmeurant/ember-array-contains-helper)
[![devDependencies](https://david-dm.org/bmeurant/ember-array-contains-helper/dev-status.svg)](https://david-dm.org/bmeurant/ember-array-contains-helper?type=dev)

Ember template helper allowing to test if an array contains a particular element.

```hbs
{{array-contains model 'value' property='title'}}
``` 
 
This helper allows to test the presence of a literal, a full object or a specific property/value of 
an object inside a given array. Objects can be native or Ember objects.

## Observing

This addon installs observers on the provided array to listen any external change made on it. It includes any addition/removal
of an item and, if a property is specified, any change of the property of any array element.

## Documentation

The documentation is available [here](http://baptiste.meurant.io/ember-array-contains-helper/docs).

## Samples & Demo

* A dummy demo application containing syntax samples runs [here](http://baptiste.meurant.io/ember-array-contains-helper/)
* The source code of this demo can be found [here](https://github.com/bmeurant/ember-array-contains-helper/blob/master/tests/dummy/app/templates/application.hbs)

## Compatibility

This helper is tested and compatible with **1.13.1+ ember versions**. See travis CI build and report [here](https://travis-ci.org/bmeurant/ember-array-contains-helper)

Note that the helper basically works in **1.13.0 ember version** but the changes on the array (add/remove/change property) will
not rerun the helper. This is probably due to [this bug](https://github.com/emberjs/ember.js/pull/11445).

## Installation

* `ember install ember-array-contains-helper`

## Usage

```hbs
{{array-contains <array> <value> [property='<property>']}}
```

Where:

* `<array>` is the array to search into. Should be a valid not null array.
* `<value>` is the value which is supposed to be contained in the arrray. Could be an object or a literal, null or undefined.
* `<property>` is an option: if set, the search is done on the presence of an object containing a
property `<property>` with the value `<value>`. If not, the search is done of the presence of the full
`<value>` (object or literal)

This helper could be:

* used standalone: 
   ```hbs
   {{array-contains model 'value' property='title'}}
   ``` 
   
* or, more often, combined with the ``if`` helper: 
   ```hbs
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

```hbs
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

```hbs
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

```hbs
{{!-- templates/application.hbs --}}
   
{{array-contains model 'Blacksad' property='title'}}
```

### ``null`` and ``undefined``

``null`` and ``undefined`` are considered acceptable values for 'value' parameter.

* **until ember 2.9**, ``null`` and ``undefined`` are both coerced to ``null`` by the templating engine. The following
  expressions are therefore both leading to check for the presence of a ``null`` value inside the array:

  ```hbs
  {{array-contains collection null}}
  {{array-contains collection undefined}}
  ``` 

* **ember 2.10 (glimmer)** changed this behaviour. ``undefined`` are then preserved and not coerced to ``null`` anymore.

It could eventually break some apps relying on the initial behaviour but it has been considered as a fix since the first behaviour 
was accidental. See [this issue](https://github.com/emberjs/ember.js/issues/14016) for details.

## Changelog

Changelog can be found [here](https://github.com/bmeurant/ember-array-contains-helper/blob/master/CHANGELOG.md)

## Contributing

Thank you!!!

 - Open an Issue for discussion first if you're unsure a feature/fix is wanted.
 - Branch off of `master` (Use descriptive branch names)
 - Follow [DockYard Ember.js Style Guide](https://github.com/DockYard/styleguides/blob/master/engineering/ember.md)
 - if needed, add or update documentation following [YUIDoc syntax](http://yui.github.io/yuidoc/syntax/)
 - Test your features / fixes
 - Use [Angular-Style Commits](https://github.com/angular/angular.js/blob/v1.4.8/CONTRIBUTING.md#-submission-guidelines). Use correct type, short subject and motivated body.
 - PR against `master`
 - Linting & tests must pass, coverage and codeclimate should be preserved

## Development

### Installation

* `git clone https://github.com/bmeurant/ember-array-contains-helper`
* `cd ember-array-contains-helper`
* `npm install`
* `bower install`

### Running dummy demo app

* `npm install`
* `bower install`
* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

### Building

* `ember build`

### Generating documentation

This addon uses [YUIDoc](http://yui.github.io/yuidoc/) via [ember-cli-yuidoc](https://github.com/cibernox/ember-cli-yuidoc). [yuidoc-ember-cli-theme](https://github.com/Turbo87/yuidoc-ember-cli-theme) makes it pretty.
Docs generation is enabled in development mode via `ember build` or `ember serve` with or without --docs auto refresh option. It can also be explicitely generated with `ember ember-cli-yuidoc`
command.

For more information on using ember-cli, visit [https://www.ember-cli.com/](https://www.ember-cli.com/).
