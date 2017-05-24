'use strict';

define('dummy/tests/app.lint-test', [], function () {
  'use strict';

  describe('ESLint | app', function () {

    it('adapters/application.js', function () {
      // test passed
    });

    it('app.js', function () {
      // test passed
    });

    it('controllers/application.js', function () {
      // test passed
    });

    it('models/comic.js', function () {
      // test passed
    });

    it('resolver.js', function () {
      // test passed
    });

    it('router.js', function () {
      // test passed
    });

    it('routes/application.js', function () {
      // test passed
    });
  });
});
define('dummy/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = destroyApp;
  function destroyApp(application) {
    _ember.default.run(application, 'destroy');
  }
});
define('dummy/tests/helpers/ember-basic-dropdown', ['exports', 'ember', 'ember-runloop'], function (exports, _ember, _emberRunloop) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.nativeClick = nativeClick;
  exports.clickTrigger = clickTrigger;
  exports.tapTrigger = tapTrigger;
  exports.fireKeydown = fireKeydown;

  exports.default = function () {
    _ember.default.Test.registerAsyncHelper('clickDropdown', function (app, cssPath) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      clickTrigger(cssPath, options);
    });

    _ember.default.Test.registerAsyncHelper('tapDropdown', function (app, cssPath) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      tapTrigger(cssPath, options);
    });
  };

  // integration helpers
  function focus(el) {
    if (!el) {
      return;
    }
    var $el = jQuery(el);
    if ($el.is(':input, [contenteditable=true]')) {
      var type = $el.prop('type');
      if (type !== 'checkbox' && type !== 'radio' && type !== 'hidden') {
        (0, _emberRunloop.default)(null, function () {
          // Firefox does not trigger the `focusin` event if the window
          // does not have focus. If the document doesn't have focus just
          // use trigger('focusin') instead.

          if (!document.hasFocus || document.hasFocus()) {
            el.focus();
          } else {
            $el.trigger('focusin');
          }
        });
      }
    }
  }

  function nativeClick(selector) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var mousedown = new window.Event('mousedown', { bubbles: true, cancelable: true, view: window });
    var mouseup = new window.Event('mouseup', { bubbles: true, cancelable: true, view: window });
    var click = new window.Event('click', { bubbles: true, cancelable: true, view: window });
    Object.keys(options).forEach(function (key) {
      mousedown[key] = options[key];
      mouseup[key] = options[key];
      click[key] = options[key];
    });
    var element = document.querySelector(selector);
    (0, _emberRunloop.default)(function () {
      return element.dispatchEvent(mousedown);
    });
    focus(element);
    (0, _emberRunloop.default)(function () {
      return element.dispatchEvent(mouseup);
    });
    (0, _emberRunloop.default)(function () {
      return element.dispatchEvent(click);
    });
  }

  function clickTrigger(scope) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var selector = '.ember-basic-dropdown-trigger';
    if (scope) {
      selector = scope + ' ' + selector;
    }
    nativeClick(selector, options);
  }

  function tapTrigger(scope) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var selector = '.ember-basic-dropdown-trigger';
    if (scope) {
      selector = scope + ' ' + selector;
    }
    var touchStartEvent = new window.Event('touchstart', { bubbles: true, cancelable: true, view: window });
    Object.keys(options).forEach(function (key) {
      return touchStartEvent[key] = options[key];
    });
    (0, _emberRunloop.default)(function () {
      return document.querySelector(selector).dispatchEvent(touchStartEvent);
    });
    var touchEndEvent = new window.Event('touchend', { bubbles: true, cancelable: true, view: window });
    Object.keys(options).forEach(function (key) {
      return touchEndEvent[key] = options[key];
    });
    (0, _emberRunloop.default)(function () {
      return document.querySelector(selector).dispatchEvent(touchEndEvent);
    });
  }

  function fireKeydown(selector, k) {
    var oEvent = document.createEvent('Events');
    oEvent.initEvent('keydown', true, true);
    $.extend(oEvent, {
      view: window,
      ctrlKey: false,
      altKey: false,
      shiftKey: false,
      metaKey: false,
      keyCode: k,
      charCode: k
    });
    (0, _emberRunloop.default)(function () {
      return document.querySelector(selector).dispatchEvent(oEvent);
    });
  }

  // acceptance helpers
});
define('dummy/tests/helpers/ember-power-select', ['exports', 'jquery', 'ember-runloop', 'ember-test'], function (exports, _jquery, _emberRunloop, _emberTest) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.nativeMouseDown = nativeMouseDown;
  exports.nativeMouseUp = nativeMouseUp;
  exports.triggerKeydown = triggerKeydown;
  exports.typeInSearch = typeInSearch;
  exports.clickTrigger = clickTrigger;
  exports.nativeTouch = nativeTouch;
  exports.touchTrigger = touchTrigger;

  exports.default = function () {
    _emberTest.default.registerAsyncHelper('selectChoose', function (app, cssPath, valueOrSelector) {
      var $trigger = find(cssPath + ' .ember-power-select-trigger');

      if ($trigger === undefined || $trigger.length === 0) {
        $trigger = find(cssPath);
      }

      if ($trigger.length === 0) {
        throw new Error('You called "selectChoose(\'' + cssPath + '\', \'' + valueOrSelector + '\')" but no select was found using selector "' + cssPath + '"');
      }

      var contentId = '' + $trigger.attr('aria-controls');
      var $content = find('#' + contentId);
      // If the dropdown is closed, open it
      if ($content.length === 0) {
        nativeMouseDown($trigger.get(0));
        wait();
      }

      // Select the option with the given text
      andThen(function () {
        var potentialTargets = (0, _jquery.default)('#' + contentId + ' .ember-power-select-option:contains("' + valueOrSelector + '")').toArray();
        var target = void 0;
        if (potentialTargets.length === 0) {
          // If treating the value as text doesn't gave use any result, let's try if it's a css selector
          potentialTargets = (0, _jquery.default)('#' + contentId + ' ' + valueOrSelector).toArray();
        }
        if (potentialTargets.length > 1) {
          target = potentialTargets.filter(function (t) {
            return t.textContent.trim() === valueOrSelector;
          })[0] || potentialTargets[0];
        } else {
          target = potentialTargets[0];
        }
        if (!target) {
          throw new Error('You called "selectChoose(\'' + cssPath + '\', \'' + valueOrSelector + '\')" but "' + valueOrSelector + '" didn\'t match any option');
        }
        nativeMouseUp(target);
      });
    });

    _emberTest.default.registerAsyncHelper('selectSearch', function (app, cssPath, value) {
      var triggerPath = cssPath + ' .ember-power-select-trigger';
      var $trigger = find(triggerPath);
      if ($trigger === undefined || $trigger.length === 0) {
        triggerPath = cssPath;
        $trigger = find(triggerPath);
      }

      if ($trigger.length === 0) {
        throw new Error('You called "selectSearch(\'' + cssPath + '\', \'' + value + '\')" but no select was found using selector "' + cssPath + '"');
      }

      var contentId = '' + $trigger.attr('aria-controls');
      var isMultipleSelect = (0, _jquery.default)(cssPath + ' .ember-power-select-trigger-multiple-input').length > 0;

      var dropdownIsClosed = (0, _jquery.default)('#' + contentId).length === 0;
      if (dropdownIsClosed) {
        nativeMouseDown(triggerPath);
        wait();
      }
      var isDefaultSingleSelect = (0, _jquery.default)('.ember-power-select-search-input').length > 0;

      if (isMultipleSelect) {
        fillIn(triggerPath + ' .ember-power-select-trigger-multiple-input', value);
      } else if (isDefaultSingleSelect) {
        fillIn('.ember-power-select-search-input', value);
      } else {
        // It's probably a customized version
        var inputIsInTrigger = !!find(cssPath + ' .ember-power-select-trigger input[type=search]')[0];
        if (inputIsInTrigger) {
          fillIn(triggerPath + ' input[type=search]', value);
        } else {
          fillIn('#' + contentId + ' .ember-power-select-search-input[type=search]', 'input');
        }
      }
    });

    _emberTest.default.registerAsyncHelper('removeMultipleOption', function (app, cssPath, value) {
      var elem = find(cssPath + ' .ember-power-select-multiple-options > li:contains(' + value + ') > .ember-power-select-multiple-remove-btn').get(0);
      try {
        nativeMouseDown(elem);
        wait();
      } catch (e) {
        console.warn('css path to remove btn not found');
        throw e;
      }
    });

    _emberTest.default.registerAsyncHelper('clearSelected', function (app, cssPath) {
      var elem = find(cssPath + ' .ember-power-select-clear-btn').get(0);
      try {
        nativeMouseDown(elem);
        wait();
      } catch (e) {
        console.warn('css path to clear btn not found');
        throw e;
      }
    });
  };

  // Helpers for integration tests

  function typeText(selector, text) {
    var $selector = (0, _jquery.default)((0, _jquery.default)(selector).get(0)); // Only interact with the first result
    $selector.val(text);
    var event = document.createEvent('Events');
    event.initEvent('input', true, true);
    $selector[0].dispatchEvent(event);
  }

  function fireNativeMouseEvent(eventType, selectorOrDomElement) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var event = void 0;
    try {
      event = new window.Event(eventType, { bubbles: true, cancelable: true, view: window });
    } catch (e) {
      // fix IE11: "Object doesn't support this action"
      event = document.createEvent('Event');
      var bubbles = true;
      var cancelable = true;
      event.initEvent(eventType, bubbles, cancelable);
    }

    Object.keys(options).forEach(function (key) {
      return event[key] = options[key];
    });
    var target = void 0;
    if (typeof selectorOrDomElement === 'string') {
      target = (0, _jquery.default)(selectorOrDomElement)[0];
    } else {
      target = selectorOrDomElement;
    }
    (0, _emberRunloop.default)(function () {
      return target.dispatchEvent(event);
    });
  }

  function nativeMouseDown(selectorOrDomElement, options) {
    fireNativeMouseEvent('mousedown', selectorOrDomElement, options);
  }

  function nativeMouseUp(selectorOrDomElement, options) {
    fireNativeMouseEvent('mouseup', selectorOrDomElement, options);
  }

  function triggerKeydown(domElement, k) {
    var oEvent = document.createEvent('Events');
    oEvent.initEvent('keydown', true, true);
    _jquery.default.extend(oEvent, {
      view: window,
      ctrlKey: false,
      altKey: false,
      shiftKey: false,
      metaKey: false,
      keyCode: k,
      charCode: k
    });
    (0, _emberRunloop.default)(function () {
      domElement.dispatchEvent(oEvent);
    });
  }

  function typeInSearch(text) {
    (0, _emberRunloop.default)(function () {
      typeText('.ember-power-select-search-input, .ember-power-select-search input, .ember-power-select-trigger-multiple-input, input[type="search"]', text);
    });
  }

  function clickTrigger(scope) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var selector = '.ember-power-select-trigger';
    if (scope) {
      selector = scope + ' ' + selector;
    }
    nativeMouseDown(selector, options);
  }

  function nativeTouch(selectorOrDomElement) {
    var event = new window.Event('touchstart', { bubbles: true, cancelable: true, view: window });
    var target = void 0;

    if (typeof selectorOrDomElement === 'string') {
      target = (0, _jquery.default)(selectorOrDomElement)[0];
    } else {
      target = selectorOrDomElement;
    }
    (0, _emberRunloop.default)(function () {
      return target.dispatchEvent(event);
    });
    (0, _emberRunloop.default)(function () {
      event = new window.Event('touchend', { bubbles: true, cancelable: true, view: window });
      target.dispatchEvent(event);
    });
  }

  function touchTrigger() {
    var selector = '.ember-power-select-trigger';
    nativeTouch(selector);
  }

  // Helpers for acceptance tests
});
define('dummy/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'ember', 'dummy/tests/helpers/start-app', 'dummy/tests/helpers/destroy-app'], function (exports, _qunit, _ember, _startApp, _destroyApp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (name) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _startApp.default)();

        if (options.beforeEach) {
          return options.beforeEach.apply(this, arguments);
        }
      },
      afterEach: function afterEach() {
        var _this = this;

        var afterEach = options.afterEach && options.afterEach.apply(this, arguments);
        return Promise.resolve(afterEach).then(function () {
          return (0, _destroyApp.default)(_this.application);
        });
      }
    });
  };

  var Promise = _ember.default.RSVP.Promise;
});
define('dummy/tests/helpers/resolver', ['exports', 'dummy/resolver', 'dummy/config/environment'], function (exports, _resolver, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var resolver = _resolver.default.create();

  resolver.namespace = {
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix
  };

  exports.default = resolver;
});
define('dummy/tests/helpers/start-app', ['exports', 'ember', 'dummy/app', 'dummy/config/environment'], function (exports, _ember, _app, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = startApp;
  function startApp(attrs) {
    var application = void 0;

    // use defaults, but you can override
    var attributes = _ember.default.assign({}, _environment.default.APP, attrs);

    _ember.default.run(function () {
      application = _app.default.create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});
define('dummy/tests/integration/helpers/array-contains-test', ['ember', 'mocha', 'ember-mocha', 'chai', 'ember-version-is'], function (_ember, _mocha, _emberMocha, _chai, _emberVersionIs) {
  'use strict';

  // remove alpha, beta, canary, etc. suffixes to the current Ember version
  var BASE_VERSION = _ember.default.VERSION.replace(/-.*/, "");

  (0, _mocha.describe)('helper:array-contains', function () {
    (0, _emberMocha.setupComponentTest)('array-contains', { integration: true });

    (0, _mocha.it)('should not throw error if array undefined or null', function () {
      this.set('array', undefined);

      this.render(_ember.default.HTMLBars.template({
        "id": "QW/Y/7M0",
        "block": "{\"statements\":[[1,[33,[\"array-contains\"],[[28,[\"array\"]],\"any\"],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
        "meta": {}
      }));
      (0, _chai.expect)(this.$().text()).to.equal("false", "array should not contain anything");

      this.set('array', null);
      (0, _chai.expect)(this.$().text()).to.equal("false", "array should not contain anything");
    });

    // Asserting error thrown no longer works as of ember 2.11
    // TODO: unkip once https://github.com/emberjs/ember.js/issues/15013 is resolved.
    _mocha.it.skip('should throw error if array is invalid', function () {
      this.set('array', 'any');

      (0, _chai.expect)(this.render.bind(this, _ember.default.HTMLBars.template({
        "id": "QW/Y/7M0",
        "block": "{\"statements\":[[1,[33,[\"array-contains\"],[[28,[\"array\"]],\"any\"],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
        "meta": {}
      }))).to.throw("Assertion Failed: First parameter should be a valid array");
    });

    (0, _mocha.it)('should return true if literal contained', function () {
      this.set('array', ['c', 'string', 0, true, null]);

      // before ember 2.9, null and undefined were both coerced to null
      // (see https://github.com/emberjs/ember.js/issues/14016)
      if ((0, _emberVersionIs.is)(BASE_VERSION, "greaterThanOrEqualTo", "2.10.0")) {
        this.get('array').push(undefined);
      }

      this.render(_ember.default.HTMLBars.template({
        "id": "IZ9TblUi",
        "block": "{\"statements\":[[1,[33,[\"array-contains\"],[[28,[\"array\"]],\"c\"],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
        "meta": {}
      }));
      (0, _chai.expect)(this.$().text()).to.equal("true", "array should contain 'c'");

      this.render(_ember.default.HTMLBars.template({
        "id": "bJxgRLzY",
        "block": "{\"statements\":[[1,[33,[\"array-contains\"],[[28,[\"array\"]],\"string\"],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
        "meta": {}
      }));
      (0, _chai.expect)(this.$().text()).to.equal("true", "array should contain 'string'");

      this.render(_ember.default.HTMLBars.template({
        "id": "eL/IVlIW",
        "block": "{\"statements\":[[1,[33,[\"array-contains\"],[[28,[\"array\"]],0],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
        "meta": {}
      }));
      (0, _chai.expect)(this.$().text()).to.equal("true", "array should contain '0'");

      this.render(_ember.default.HTMLBars.template({
        "id": "qOtJvfLo",
        "block": "{\"statements\":[[1,[33,[\"array-contains\"],[[28,[\"array\"]],true],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
        "meta": {}
      }));
      (0, _chai.expect)(this.$().text()).to.equal("true", "array should contain 'true'");

      this.render(_ember.default.HTMLBars.template({
        "id": "+kitColR",
        "block": "{\"statements\":[[1,[33,[\"array-contains\"],[[28,[\"array\"]],null],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
        "meta": {}
      }));
      (0, _chai.expect)(this.$().text()).to.equal("true", "array should contain 'null'");

      this.render(_ember.default.HTMLBars.template({
        "id": "usrOSP7W",
        "block": "{\"statements\":[[1,[33,[\"array-contains\"],[[28,[\"array\"]],[31]],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
        "meta": {}
      }));
      (0, _chai.expect)(this.$().text()).to.equal("true", "array should contain 'undefined'");
    });

    (0, _mocha.it)('should return false if literal not contained', function () {
      this.set('array', ['c', 'string', 0, true, null]);

      this.render(_ember.default.HTMLBars.template({
        "id": "e3uq3iPC",
        "block": "{\"statements\":[[1,[33,[\"array-contains\"],[[28,[\"array\"]],\"a\"],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
        "meta": {}
      }));
      (0, _chai.expect)(this.$().text()).to.equal("false", "array should not contain 'a'");

      this.render(_ember.default.HTMLBars.template({
        "id": "Ek1Vp3Wi",
        "block": "{\"statements\":[[1,[33,[\"array-contains\"],[[28,[\"array\"]],\"foo\"],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
        "meta": {}
      }));
      (0, _chai.expect)(this.$().text()).to.equal("false", "array should not contain 'foo'");

      this.render(_ember.default.HTMLBars.template({
        "id": "2ZpkIM/I",
        "block": "{\"statements\":[[1,[33,[\"array-contains\"],[[28,[\"array\"]],2],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
        "meta": {}
      }));
      (0, _chai.expect)(this.$().text()).to.equal("false", "array should not contain '2'");

      this.render(_ember.default.HTMLBars.template({
        "id": "07LTkayJ",
        "block": "{\"statements\":[[1,[33,[\"array-contains\"],[[28,[\"array\"]],false],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
        "meta": {}
      }));
      (0, _chai.expect)(this.$().text()).to.equal("false", "array should not contain 'false'");

      // before ember 2.10, null and undefined were both coerced to null
      // (see https://github.com/emberjs/ember.js/issues/14016)
      if ((0, _emberVersionIs.is)(BASE_VERSION, "greaterThanOrEqualTo", "2.10.0")) {
        this.render(_ember.default.HTMLBars.template({
          "id": "usrOSP7W",
          "block": "{\"statements\":[[1,[33,[\"array-contains\"],[[28,[\"array\"]],[31]],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
          "meta": {}
        }));
        (0, _chai.expect)(this.$().text()).to.equal("false", "array should not contain 'undefined'");
      }
    });

    (0, _mocha.it)('should return true if native object contained', function () {
      var elem = { id: 1, title: 'any' };
      this.set('array', [elem]);
      this.set('elem', elem);

      this.render(_ember.default.HTMLBars.template({
        "id": "cUQ6Jt3t",
        "block": "{\"statements\":[[1,[33,[\"array-contains\"],[[28,[\"array\"]],[28,[\"elem\"]]],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
        "meta": {}
      }));
      (0, _chai.expect)(this.$().text()).to.equal("true", "array should contain elem");
    });

    (0, _mocha.it)('should return false if native object not contained', function () {
      this.set('array', [{ id: 2, title: 'other' }]);
      this.set('elem', { id: 1, title: 'any' });

      this.render(_ember.default.HTMLBars.template({
        "id": "cUQ6Jt3t",
        "block": "{\"statements\":[[1,[33,[\"array-contains\"],[[28,[\"array\"]],[28,[\"elem\"]]],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
        "meta": {}
      }));
      (0, _chai.expect)(this.$().text()).to.equal("false", "array should not contain elem");
    });

    (0, _mocha.it)('should recompute when native object change', function () {
      var elem = { id: 1, title: 'any' };
      this.set('array', [elem]);
      this.set('elem', elem);

      this.render(_ember.default.HTMLBars.template({
        "id": "cUQ6Jt3t",
        "block": "{\"statements\":[[1,[33,[\"array-contains\"],[[28,[\"array\"]],[28,[\"elem\"]]],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
        "meta": {}
      }));
      (0, _chai.expect)(this.$().text()).to.equal("true", "array should contain elem");

      this.set('elem', {});

      (0, _chai.expect)(this.$().text()).to.equal("false", "array should not contain elem");

      this.set('elem', elem);

      (0, _chai.expect)(this.$().text()).to.equal("true", "array should contain elem");

      this.set('elem', { id: 1, title: 'any' });

      (0, _chai.expect)(this.$().text()).to.equal("false", "array should not contain elem");
    });

    (0, _mocha.it)('should return true if Ember object contained', function () {
      var elem = _ember.default.Object.create({ id: 1, title: 'any' });
      this.set('array', [elem]);
      this.set('elem', elem);

      this.render(_ember.default.HTMLBars.template({
        "id": "cUQ6Jt3t",
        "block": "{\"statements\":[[1,[33,[\"array-contains\"],[[28,[\"array\"]],[28,[\"elem\"]]],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
        "meta": {}
      }));
      (0, _chai.expect)(this.$().text()).to.equal("true", "array should contain elem");
    });

    (0, _mocha.it)('should return false if Ember object not contained', function () {
      this.set('array', [_ember.default.Object.create({ id: 2, title: 'other' })]);
      this.set('elem', _ember.default.Object.create({ id: 1, title: 'any' }));

      this.render(_ember.default.HTMLBars.template({
        "id": "cUQ6Jt3t",
        "block": "{\"statements\":[[1,[33,[\"array-contains\"],[[28,[\"array\"]],[28,[\"elem\"]]],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
        "meta": {}
      }));
      (0, _chai.expect)(this.$().text()).to.equal("false", "array should not contain elem");
    });

    (0, _mocha.it)('should recompute when Ember object change', function () {
      var elem = _ember.default.Object.create({ id: 1, title: 'any' });
      this.set('array', [elem]);
      this.set('elem', elem);

      this.render(_ember.default.HTMLBars.template({
        "id": "cUQ6Jt3t",
        "block": "{\"statements\":[[1,[33,[\"array-contains\"],[[28,[\"array\"]],[28,[\"elem\"]]],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
        "meta": {}
      }));
      (0, _chai.expect)(this.$().text()).to.equal("true", "array should contain elem");

      this.set('elem', {});

      (0, _chai.expect)(this.$().text()).to.equal("false", "array should not contain elem");

      this.set('elem', elem);

      (0, _chai.expect)(this.$().text()).to.equal("true", "array should contain elem");

      this.set('elem', _ember.default.Object.create({ id: 1, title: 'any' }));

      (0, _chai.expect)(this.$().text()).to.equal("false", "array should not contain elem");
    });

    (0, _mocha.it)('should return true if native object property contained', function () {
      this.set('array', [{ id: 1, title: 'any' }]);

      this.render(_ember.default.HTMLBars.template({
        "id": "Plj2Jqk0",
        "block": "{\"statements\":[[1,[33,[\"array-contains\"],[[28,[\"array\"]],\"any\"],[[\"property\"],[\"title\"]]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
        "meta": {}
      }));
      (0, _chai.expect)(this.$().text()).to.equal("true", "array should contain 'any' title");
    });

    (0, _mocha.it)('should return false if native object property not contained', function () {
      this.set('array', [{ id: 2, title: 'other' }]);

      this.render(_ember.default.HTMLBars.template({
        "id": "Plj2Jqk0",
        "block": "{\"statements\":[[1,[33,[\"array-contains\"],[[28,[\"array\"]],\"any\"],[[\"property\"],[\"title\"]]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
        "meta": {}
      }));
      (0, _chai.expect)(this.$().text()).to.equal("false", "array should not contain 'any' title");
    });

    (0, _mocha.it)('should return true if Ember object contained', function () {
      var elem = _ember.default.Object.create({ id: 1, title: 'any' });
      this.set('array', [elem]);
      this.set('elem', elem);

      this.render(_ember.default.HTMLBars.template({
        "id": "cUQ6Jt3t",
        "block": "{\"statements\":[[1,[33,[\"array-contains\"],[[28,[\"array\"]],[28,[\"elem\"]]],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
        "meta": {}
      }));
      (0, _chai.expect)(this.$().text()).to.equal("true", "array should contain elem");
    });

    (0, _mocha.it)('should return false if Ember object not contained', function () {
      var elem = _ember.default.Object.create({ id: 1, title: 'any' });
      this.set('array', [_ember.default.Object.create({ id: 2, title: 'other' })]);
      this.set('elem', elem);

      this.render(_ember.default.HTMLBars.template({
        "id": "cUQ6Jt3t",
        "block": "{\"statements\":[[1,[33,[\"array-contains\"],[[28,[\"array\"]],[28,[\"elem\"]]],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
        "meta": {}
      }));
      (0, _chai.expect)(this.$().text()).to.equal("false", "array should not contain elem");
    });

    (0, _mocha.it)('should recompute when Ember object change', function () {
      var elem = _ember.default.Object.create({ id: 1, title: 'any' });
      this.set('array', [elem]);
      this.set('elem', elem);

      this.render(_ember.default.HTMLBars.template({
        "id": "cUQ6Jt3t",
        "block": "{\"statements\":[[1,[33,[\"array-contains\"],[[28,[\"array\"]],[28,[\"elem\"]]],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
        "meta": {}
      }));
      (0, _chai.expect)(this.$().text()).to.equal("true", "array should contain elem");

      this.set('elem', {});

      (0, _chai.expect)(this.$().text()).to.equal("false", "array should not contain elem");

      this.set('elem', elem);

      (0, _chai.expect)(this.$().text()).to.equal("true", "array should contain elem");

      this.set('elem', _ember.default.Object.create({ id: 1, title: 'any' }));

      (0, _chai.expect)(this.$().text()).to.equal("false", "array should not contain elem");
    });

    (0, _mocha.it)('should return true if Ember object property contained', function () {
      this.set('array', [_ember.default.Object.create({ id: 1, title: 'any' })]);

      this.render(_ember.default.HTMLBars.template({
        "id": "Plj2Jqk0",
        "block": "{\"statements\":[[1,[33,[\"array-contains\"],[[28,[\"array\"]],\"any\"],[[\"property\"],[\"title\"]]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
        "meta": {}
      }));
      (0, _chai.expect)(this.$().text()).to.equal("true", "array should contain 'any' title");
    });

    (0, _mocha.it)('should return false if Ember object property not contained', function () {
      this.set('array', [_ember.default.Object.create({ id: 2, title: 'other' })]);

      this.render(_ember.default.HTMLBars.template({
        "id": "Plj2Jqk0",
        "block": "{\"statements\":[[1,[33,[\"array-contains\"],[[28,[\"array\"]],\"any\"],[[\"property\"],[\"title\"]]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
        "meta": {}
      }));
      (0, _chai.expect)(this.$().text()).to.equal("false", "array should not contain 'any' title");
    });

    (0, _mocha.it)('should rerun test when array replaced', function () {
      this.set('array', ['any']);

      this.render(_ember.default.HTMLBars.template({
        "id": "QW/Y/7M0",
        "block": "{\"statements\":[[1,[33,[\"array-contains\"],[[28,[\"array\"]],\"any\"],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
        "meta": {}
      }));
      (0, _chai.expect)(this.$().text()).to.equal("true", "array should contain 'any'");

      this.set('array', ['not']);

      (0, _chai.expect)(this.$().text()).to.equal("false", "array should not contain 'any'");
    });

    (0, _mocha.it)('should rerun test when array changed', function () {
      var array = ['any'];
      this.set('array', array);

      this.render(_ember.default.HTMLBars.template({
        "id": "QW/Y/7M0",
        "block": "{\"statements\":[[1,[33,[\"array-contains\"],[[28,[\"array\"]],\"any\"],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
        "meta": {}
      }));
      (0, _chai.expect)(this.$().text()).to.equal("true", "array should contain 'any'");

      _ember.default.run(function () {
        array.popObject();
      });

      (0, _chai.expect)(this.$().text()).to.equal("false", "array should not contain 'any'");

      _ember.default.run(function () {
        array.pushObject('any');
      });

      (0, _chai.expect)(this.$().text()).to.equal("true", "array should contain 'any'");
    });

    (0, _mocha.it)('should rerun test when property in array changed', function () {
      var object = { id: 1, title: 'any' };
      var array = [object];
      this.set('array', array);

      this.render(_ember.default.HTMLBars.template({
        "id": "Plj2Jqk0",
        "block": "{\"statements\":[[1,[33,[\"array-contains\"],[[28,[\"array\"]],\"any\"],[[\"property\"],[\"title\"]]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
        "meta": {}
      }));
      (0, _chai.expect)(this.$().text()).to.equal("true", "array should contain object with prop 'any'");

      _ember.default.run(function () {
        _ember.default.set(object, 'title', 'not');
      });

      (0, _chai.expect)(this.$().text()).to.equal("false", "array should not contain object with prop 'any'");

      _ember.default.run(function () {
        _ember.default.set(object, 'title', 'any');
      });

      (0, _chai.expect)(this.$().text()).to.equal("true", "array should contain object with prop 'any'");
    });

    (0, _mocha.it)('should return true in nested if if Ember object property contained', function () {
      this.set('array', [_ember.default.Object.create({ id: 1, title: 'any' })]);

      this.render(_ember.default.HTMLBars.template({
        "id": "He1Vrcam",
        "block": "{\"statements\":[[1,[33,[\"if\"],[[33,[\"array-contains\"],[[28,[\"array\"]],\"any\"],[[\"property\"],[\"title\"]]],\"ifTrue\",\"ifFalse\"],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
        "meta": {}
      }));
      (0, _chai.expect)(this.$().text()).to.equal("ifTrue", "array should contain 'any' title");
    });

    (0, _mocha.it)('should return false in nested if if Ember object property not contained', function () {
      this.set('array', [_ember.default.Object.create({ id: 2, title: 'other' })]);

      this.render(_ember.default.HTMLBars.template({
        "id": "He1Vrcam",
        "block": "{\"statements\":[[1,[33,[\"if\"],[[33,[\"array-contains\"],[[28,[\"array\"]],\"any\"],[[\"property\"],[\"title\"]]],\"ifTrue\",\"ifFalse\"],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
        "meta": {}
      }));
      (0, _chai.expect)(this.$().text()).to.equal("ifFalse", "array should not contain 'any' title");
    });
  });
});
define('dummy/tests/test-helper', ['ember-mocha', 'dummy/tests/helpers/resolver'], function (_emberMocha, _resolver) {
  'use strict';

  (0, _emberMocha.setResolver)(_resolver.default);
});
define('dummy/tests/tests.lint-test', [], function () {
  'use strict';

  describe('ESLint | tests', function () {

    it('helpers/destroy-app.js', function () {
      // test passed
    });

    it('helpers/module-for-acceptance.js', function () {
      // test passed
    });

    it('helpers/resolver.js', function () {
      // test passed
    });

    it('helpers/start-app.js', function () {
      // test passed
    });

    it('integration/helpers/array-contains-test.js', function () {
      // test passed
    });

    it('test-helper.js', function () {
      // test passed
    });
  });
});
require('dummy/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
