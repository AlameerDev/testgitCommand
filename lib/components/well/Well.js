'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WellComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Components = require('../Components');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WellComponent = exports.WellComponent = function (_FormioComponents) {
  _inherits(WellComponent, _FormioComponents);

  function WellComponent() {
    _classCallCheck(this, WellComponent);

    return _possibleConstructorReturn(this, (WellComponent.__proto__ || Object.getPrototypeOf(WellComponent)).apply(this, arguments));
  }

  _createClass(WellComponent, [{
    key: 'className',
    get: function get() {
      return 'card card-body bg-faded well formio-component formio-component-well ' + this.component.customClass;
    }
  }], [{
    key: 'schema',
    value: function schema() {
      for (var _len = arguments.length, extend = Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _Components.FormioComponents.schema.apply(_Components.FormioComponents, [{
        type: 'well',
        key: 'well',
        input: false,
        components: []
      }].concat(extend));
    }
  }, {
    key: 'builderInfo',
    get: function get() {
      return {
        title: 'Well',
        icon: 'fa fa-square-o',
        group: 'layout',
        documentation: 'http://help.form.io/userguide/#well',
        weight: 60,
        schema: WellComponent.schema()
      };
    }
  }]);

  return WellComponent;
}(_Components.FormioComponents);