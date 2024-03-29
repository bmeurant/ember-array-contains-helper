# ember-array-contains-helper

## Important notice !!

**This addon is not maintained**

In recent Ember versions, you problem don't need an addon for this case.
With the introduction of [helper functions](https://guides.emberjs.com/release/components/helper-functions/), you can just easily create a local helper
that checks if an element is contained in an array.

If you want the helper to react to add/removals, you should be using some version of a "reactive" array. Either [`EmberArray`](https://api.emberjs.com/ember/5.5/classes/EmberArray) or `TrackedArray` from [tracked-built-ins](https://github.com/tracked-tools/tracked-built-ins). See demo [here](https://limber.glimdown.com/edit?c=AYjmCsGcAIBsEsBuBTaAHATsx9kHcAoeAWzQHsMAXaAYTNLIDtlHqAzDe6AcgAFQExYsgwB6AMb1yzVtwDcRBlWgBvaJQwBDcQGtkAE2gBfaBy58BJYWI3ad8RqHmLyytU2OnOxHr2TEAIxFRYjJ9eDZcDGcSV2o1AEFPMx8%2BfyCxTQwtAE9nAmQADzjofWQ2TQBXWGpxWE1IGAAJZFhYMgB1ClhDIsoWfRg6Bhl4gmhoXltdA2gs3OgAXmhmPGgEgAoAbQAGABpoAEYDgCYDgGYAXQBKBXG57M0culZNBxhljfmD%2BH7ia6WAD4HhgAHQOOqVMqQDa-fy3e73ShkUACZAAST%2BS2gGwBi2BKnuE1gyGoDjKhWxlAAFvBIKD5k9wYwKQB5NgbAAsCImEwiOPJRSWi2WAFpDgDCbzeTS6QzHjkGfp9KyAuBkOJKFyebyTK1IKgpdL1LT6YzFVhQihVerNdqicZ7kYFBN7gAeP5oer9QEOt1oQEJBXQCGwKHIGBw4gAfmgbsgGiYoEBKhUsrNCpelDejBg6flC05RiMbtECc4jkBpYDDr9AUqlGRjFUKg8ACI6vBdG2TXLkaiSZj-MXAQAVFFokN-Uv1xtMX0TUue73IX1GAggYAEIA&format=glimdown).

In any case, this addon should be compatible with basically every ember version from 3.28 to 5.x.

[![npm version](https://img.shields.io/npm/v/ember-array-contains-helper.svg)](https://www.npmjs.com/package/ember-array-contains-helper)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE.md)

[![Ember Observer Score](http://emberobserver.com/badges/ember-array-contains-helper.svg)](http://emberobserver.com/addons/ember-array-contains-helper)

Ember template helper allowing to test if an array contains a particular element.

```hbs
{{array-contains this.model 'value' property='title'}}
```

This helper allows to test the presence of a literal, a full object or a specific property/value of
an object inside a given array. Objects can be native or Ember objects.

## Compatibility

- This helper is tested against Ember 3.28+

## Troubleshooting

Before its version 2.x, this addon came with a polyfill (`ember-runtime-enumerable-includes-polyfill`) emulating the native EcmaScript method `includes` in case you wanted to run it within an environment that did not support this method.

Since its version 2.x, the polyfill is not included by default and this addon relies on the fact that it is run in an environment supporting the `includes` method.
Errors will occur if it is not the case.

If you want to use this addon in an older browser or environment that does not support `includes`, you must then now explicitely add the polyfill as a regular dependency: `yarn add ember-runtime-enumerable-includes-polyfill`.

## Installation

- `ember install ember-array-contains-helper`

## Usage

```hbs
{{array-contains <array> <value> [property='<property>']}}
```

Where:

- `<array>` is the array to search into. Should be a valid not null array.
- `<value>` is the value which is supposed to be contained in the arrray. Could be an object or a literal, null or undefined.
- `<property>` is an option: if set, the search is done on the presence of an object containing a
  property `<property>` with the value `<value>`. If not, the search is done of the presence of the full
  `<value>` (object or literal)

This helper could be:

- used standalone:
  ```hbs
  {{array-contains this.model 'value' property='title'}}
  ```
- or, more often, combined with the `if` helper:
  ```hbs
  {{if
    (array-contains this.model 'value' property='title')
    'something'
    'something else'
  }}
  ```

Depending on the given parameters, the test is made on

- the presence of a literal:

```javascript
// routes/application.js

import Route from '@ember/routing/route';

export default class ApplicationRoute extends Route {
  model() {
    return ['Akira', 'Blacksad', 'CalvinAndHobbes'];
  }
}
```

```hbs
{{! templates/application.hbs }}

{{array-contains this.model 'Akira'}}
```

- the presence of the object itself:

```javascript
// routes/application.js

import Route from '@ember/routing/route';
import Comic from '../models/comic';

let blackSad = Comic.create({
  title: 'Blacksad',
});

let calvinAndHobbes = Comic.create({
  title: 'Calvin and Hobbes',
});

let akira = Comic.create({
  title: 'Akira',
});

export default class ApplicationRoute extends Route {
  model() {
    return [akira, blacksad, calvinAndHobbes];
  }

  setupController(controller) {
    super.setupController(...arguments);
    controller.calvinAndHobbes = calvinAndHobbes;
  }
}
```

```hbs
{{! templates/application.hbs }}

{{array-contains this.model this.calvinAndHobbes}}
```

- the presence of an object containing a specific property with a specific value using the option `property`:

```javascript
// routes/application.js

import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service store;

  model() {
    return this.store.findAll('comic');
  }
}
```

```hbs
{{! templates/application.hbs }}

{{array-contains this.model 'Blacksad' property='title'}}
```

### `null` and `undefined`

`null` and `undefined` are considered acceptable values for 'value' parameter.

- **until ember 2.9**, `null` and `undefined` are both coerced to `null` by the templating engine. The following
  expressions are therefore both leading to check for the presence of a `null` value inside the array:

  ```hbs
  {{array-contains collection null}}
  {{array-contains collection undefined}}
  ```

- **ember 2.10 (glimmer)** changed this behaviour. `undefined` are then preserved and not coerced to `null` anymore.

It could eventually break some apps relying on the initial behaviour but it has been considered as a fix since the first behaviour
was accidental. See [this issue](https://github.com/emberjs/ember.js/issues/14016) for details.

## Development

### Installation

- `git clone https://github.com/bmeurant/ember-array-contains-helper`
- `cd ember-array-contains-helper`
- `npm install`

### Running dummy demo app

- `npm install`
- `ember server`
- Visit your app at [http://localhost:4200](http://localhost:4200).

### Linting

- `npm run lint:js`
- `npm run lint:js -- --fix`

### Running Tests

- `ember test` – Runs the test suite on the current Ember version
- `ember test --server` – Runs the test suite in "watch mode"
- `npm test` – Runs `ember try:each` to test your addon against multiple Ember versions

### Building

- `ember build`

### Generating documentation

This addon uses [YUIDoc](http://yui.github.io/yuidoc/) via [ember-cli-yuidoc](https://github.com/cibernox/ember-cli-yuidoc). [yuidoc-ember-cli-theme](https://github.com/Turbo87/yuidoc-ember-cli-theme) makes it pretty.
Docs generation is enabled in development mode via `ember build` or `ember serve` with or without --docs auto refresh option. It can also be explicitely generated with `ember ember-cli-yuidoc`
command.

For more information on using ember-cli, visit [https://www.ember-cli.com/](https://www.ember-cli.com/).
