'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ButtonComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _set = function set(object, property, value, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent !== null) { set(parent, property, value, receiver); } } else if ("value" in desc && desc.writable) { desc.value = value; } else { var setter = desc.set; if (setter !== undefined) { setter.call(receiver, value); } } return value; };

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Base = require('../base/Base');

var _utils = require('../../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ButtonComponent = exports.ButtonComponent = function (_BaseComponent) {
  _inherits(ButtonComponent, _BaseComponent);

  function ButtonComponent() {
    _classCallCheck(this, ButtonComponent);

    return _possibleConstructorReturn(this, (ButtonComponent.__proto__ || Object.getPrototypeOf(ButtonComponent)).apply(this, arguments));
  }

  _createClass(ButtonComponent, [{
    key: 'elementInfo',
    value: function elementInfo() {
      var info = _get(ButtonComponent.prototype.__proto__ || Object.getPrototypeOf(ButtonComponent.prototype), 'elementInfo', this).call(this);
      info.type = 'button';
      info.attr.type = this.component.action === 'submit' ? 'submit' : 'button';
      this.component.theme = this.component.theme || 'default';
      info.attr.class = 'btn btn-' + this.component.theme;
      if (this.component.size) {
        info.attr.class += ' btn-' + this.component.size;
      }
      if (this.component.block) {
        info.attr.class += ' btn-block';
      }
      if (this.component.customClass) {
        info.attr.class += ' ' + this.component.customClass;
      }
      return info;
    }
  }, {
    key: 'createLabel',


    // No label needed for buttons.
    value: function createLabel() {}
  }, {
    key: 'createInput',
    value: function createInput(container) {
      this.buttonElement = _get(ButtonComponent.prototype.__proto__ || Object.getPrototypeOf(ButtonComponent.prototype), 'createInput', this).call(this, container);
      return this.buttonElement;
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      if (!this.component.input) {
        return;
      }
      return this.clicked;
    }
  }, {
    key: 'build',
    value: function build() {
      var _this2 = this;

      if (this.viewOnly) {
        this.component.hidden = true;
      }

      this.clicked = false;
      this.createElement();
      this.createInput(this.element);
      this.addShortcut(this.buttonElement);
      if (this.component.leftIcon) {
        this.buttonElement.appendChild(this.ce('span', {
          class: this.component.leftIcon
        }));
        this.buttonElement.appendChild(this.text('\xA0'));
      }
      if (this.component.label) {
        this.labelElement = this.text(this.addShortcutToLabel());
        this.buttonElement.appendChild(this.labelElement);
        this.createTooltip(this.buttonElement, null, this.iconClass('question-sign'));
      }
      if (this.component.rightIcon) {
        this.buttonElement.appendChild(this.text('\xA0'));
        this.buttonElement.appendChild(this.ce('span', {
          class: this.component.rightIcon
        }));
      }
      if (this.component.action === 'submit') {
        this.on('submitButton', function () {
          _this2.loading = true;
          _this2.disabled = true;
        }, true);
        this.on('submitDone', function () {
          _this2.loading = false;
          _this2.disabled = false;
        }, true);
        this.on('change', function (value) {
          _this2.loading = false;
          _this2.disabled = _this2.component.disableOnInvalid && !_this2.root.isValid(value.data, true);
        }, true);
        this.on('error', function () {
          _this2.loading = false;
        }, true);
      }

      if (this.component.action === 'url') {
        this.on('requestButton', function () {
          _this2.loading = true;
          _this2.disabled = true;
        }, true);
        this.on('requestDone', function () {
          _this2.loading = false;
          _this2.disabled = false;
        }, true);
        this.on('change', function (value) {
          _this2.loading = false;
          _this2.disabled = _this2.component.disableOnInvalid && !_this2.root.isValid(value.data, true);
        }, true);
        this.on('error', function () {
          _this2.loading = false;
        }, true);
      }
      this.addEventListener(this.buttonElement, 'click', function (event) {
        _this2.clicked = false;
        switch (_this2.component.action) {
          case 'submit':
            event.preventDefault();
            event.stopPropagation();
            _this2.emit('submitButton');
            break;
          case 'event':
            _this2.events.emit(_this2.component.event, _this2.data);
            _this2.emit('customEvent', {
              type: _this2.component.event,
              component: _this2.component,
              data: _this2.data,
              event: event
            });
            break;
          case 'custom':
            {
              // Get the FormioForm at the root of this component's tree
              var form = _this2.getRoot();
              // Get the form's flattened schema components
              var flattened = _utils2.default.flattenComponents(form.component.components, true);
              // Create object containing the corresponding HTML element components
              var components = {};
              _lodash2.default.each(flattened, function (component, key) {
                var element = form.getComponent(key);
                if (element) {
                  components[key] = element;
                }
              });

              try {
                new Function('form', 'flattened', 'components', '_merge', 'data', _this2.component.custom.toString())(form, flattened, components, _lodash2.default.merge, _this2.data);
              } catch (e) {
                /* eslint-disable no-console */
                console.warn('An error occurred evaluating custom logic for ' + _this2.key, e);
                /* eslint-enable no-console */
              }
              break;
            }
          case 'url':
            _this2.emit('requestButton');
            _this2.emit('requestUrl', {
              url: _this2.component.url,
              headers: _this2.component.headers
            });
            break;
          case 'reset':
            _this2.emit('resetForm');
            break;
          case 'oauth':
            if (_this2.root === _this2) {
              console.warn('You must add the OAuth button to a form for it to function properly');
              return;
            }

            // Display Alert if OAuth config is missing
            if (!_this2.component.oauth) {
              _this2.root.setAlert('danger', 'You must assign this button to an OAuth action before it will work.');
              break;
            }

            // Display Alert if oAuth has an error is missing
            if (_this2.component.oauth.error) {
              _this2.root.setAlert('danger', 'The Following Error Has Occured' + _this2.component.oauth.error);
              break;
            }

            _this2.openOauth(_this2.component.oauth);

            break;
        }
      });
      if (this.shouldDisable) {
        this.disabled = true;
      }
    }
  }, {
    key: 'openOauth',
    value: function openOauth() {
      var _this3 = this;

      if (!this.root.formio) {
        console.warn('You must attach a Form API url to your form in order to use OAuth buttons.');
        return;
      }

      var settings = this.component.oauth;

      /*eslint-disable camelcase */
      var params = {
        response_type: 'code',
        client_id: settings.clientId,
        redirect_uri: window.location.origin || window.location.protocol + '//' + window.location.host,
        state: settings.state,
        scope: settings.scope
      };
      /*eslint-enable camelcase */

      // Make display optional.
      if (settings.display) {
        params.display = settings.display;
      }

      params = Object.keys(params).map(function (key) {
        return key + '=' + encodeURIComponent(params[key]);
      }).join('&');

      var url = settings.authURI + '?' + params;
      var popup = window.open(url, settings.provider, 'width=1020,height=618');

      var interval = setInterval(function () {
        try {
          var popupHost = popup.location.host;
          var currentHost = window.location.host;
          if (popup && !popup.closed && popupHost === currentHost && popup.location.search) {
            popup.close();
            var _params = popup.location.search.substr(1).split('&').reduce(function (params, param) {
              var split = param.split('=');
              params[split[0]] = split[1];
              return params;
            }, {});
            if (_params.error) {
              alert(_params.error_description || _params.error);
              _this3.root.setAlert('danger', _params.error_description || _params.error);
              return;
            }
            // TODO: check for error response here
            if (settings.state !== _params.state) {
              _this3.root.setAlert('danger', 'OAuth state does not match. Please try logging in again.');
              return;
            }
            var submission = { data: {}, oauth: {} };
            submission.oauth[settings.provider] = _params;
            submission.oauth[settings.provider].redirectURI = window.location.origin || window.location.protocol + '//' + window.location.host;
            _this3.root.formio.saveSubmission(submission).then(function (result) {
              _this3.root.onSubmit(result, true);
            }).catch(function (err) {
              _this3.root.onSubmissionError(err);
            });
          }
        } catch (error) {
          if (error.name !== 'SecurityError') {
            _this3.root.setAlert('danger', error.message || error);
          }
        }
        if (!popup || popup.closed || popup.closed === undefined) {
          clearInterval(interval);
        }
      }, 100);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      _get(ButtonComponent.prototype.__proto__ || Object.getPrototypeOf(ButtonComponent.prototype), 'destroy', this).apply(this, Array.prototype.slice.apply(arguments));
      this.removeShortcut(this.buttonElement);
    }
  }, {
    key: 'loading',
    set: function set(loading) {
      this.setLoading(this.buttonElement, loading);
    }
  }, {
    key: 'disabled',
    set: function set(disabled) {
      _set(ButtonComponent.prototype.__proto__ || Object.getPrototypeOf(ButtonComponent.prototype), 'disabled', disabled, this);
      this.setDisabled(this.buttonElement, disabled);
    }
  }, {
    key: 'className',
    get: function get() {
      var className = _get(ButtonComponent.prototype.__proto__ || Object.getPrototypeOf(ButtonComponent.prototype), 'className', this);
      className += ' form-group';
      return className;
    }
  }], [{
    key: 'schema',
    value: function schema() {
      for (var _len = arguments.length, extend = Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _Base.BaseComponent.schema.apply(_Base.BaseComponent, [{
        type: 'button',
        label: 'Submit',
        key: 'submit',
        size: 'md',
        leftIcon: '',
        rightIcon: '',
        block: false,
        action: 'submit',
        disableOnInvalid: false,
        theme: 'primary'
      }].concat(extend));
    }
  }, {
    key: 'builderInfo',
    get: function get() {
      return {
        title: 'Button',
        group: 'basic',
        icon: 'fa fa-stop',
        documentation: 'http://help.form.io/userguide/#button',
        weight: 110,
        schema: ButtonComponent.schema()
      };
    }
  }]);

  return ButtonComponent;
}(_Base.BaseComponent);