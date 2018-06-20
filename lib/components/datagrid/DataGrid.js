'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataGridComponent = undefined;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Components = require('../Components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DataGridComponent = exports.DataGridComponent = function (_FormioComponents) {
  _inherits(DataGridComponent, _FormioComponents);

  _createClass(DataGridComponent, null, [{
    key: 'schema',
    value: function schema() {
      for (var _len = arguments.length, extend = Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _Components.FormioComponents.schema.apply(_Components.FormioComponents, [{
        label: 'Data Grid',
        key: 'dataGrid',
        type: 'datagrid',
        clearOnHide: true,
        input: true,
        components: []
      }].concat(extend));
    }
  }, {
    key: 'builderInfo',
    get: function get() {
      return {
        title: 'Data Grid',
        icon: 'fa fa-th',
        group: 'advanced',
        documentation: 'http://help.form.io/userguide/#datagrid',
        weight: 150,
        schema: DataGridComponent.schema()
      };
    }
  }]);

  function DataGridComponent(component, options, data) {
    _classCallCheck(this, DataGridComponent);

    var _this = _possibleConstructorReturn(this, (DataGridComponent.__proto__ || Object.getPrototypeOf(DataGridComponent)).call(this, component, options, data));

    _this.type = 'datagrid';
    return _this;
  }

  _createClass(DataGridComponent, [{
    key: 'build',
    value: function build() {
      this.createElement();
      this.createLabel(this.element);
      if (!this.data.hasOwnProperty(this.component.key)) {
        this.addNewValue();
      }
      this.visibleColumns = true;
      this.buildTable();
      this.createDescription(this.element);
    }
  }, {
    key: 'buildTable',
    value: function buildTable() {
      var _this2 = this;

      // Destroy so that it will remove all existing components and clear handlers.
      this.destroy();

      if (this.tableElement && this.tableElement.parentNode) {
        this.element.removeChild(this.tableElement);
        this.tableElement.innerHTML = '';
      }

      var tableClass = 'table datagrid-table table-bordered form-group formio-data-grid ';
      _lodash2.default.each(['striped', 'bordered', 'hover', 'condensed'], function (prop) {
        if (_this2.component[prop]) {
          tableClass += 'table-' + prop + ' ';
        }
      });
      this.tableElement = this.ce('table', {
        class: tableClass
      });

      this.tableElement.appendChild(this.createHeader());

      // Build rows the first time.
      this.rows = [];
      this.tableRows = this.data[this.component.key].map(function (row, rowIndex) {
        return _this2.buildRow(row, rowIndex);
      });
      this.tbody = this.ce('tbody', null, this.tableRows);

      // Add the body to the table and to the element.
      this.tableElement.appendChild(this.tbody);

      if (!this.options.builder && !this.options.preview) {
        var addButton = this.createAddButton();
        if (addButton) {
          this.tableElement.appendChild(addButton);
        }
      }

      this.element.appendChild(this.tableElement);
    }

    // Build the header.

  }, {
    key: 'createHeader',
    value: function createHeader() {
      var _this3 = this;

      var thead = this.ce('thead', null, this.ce('tr', null, [this.component.components.map(function (comp) {
        if (_this3.visibleColumns === true || _this3.visibleColumns[comp.key]) {
          var th = _this3.ce('th');
          if (comp.validate && comp.validate.required) {
            th.setAttribute('class', 'field-required');
          }
          var title = comp.label || comp.title;
          if (title) {
            th.appendChild(_this3.text(title));
            _this3.createTooltip(th, comp);
          }
          return th;
        }
      }), this.shouldDisable ? null : this.ce('th', null, ['top', 'both'].indexOf(this.component.addAnotherPosition) !== -1 ? this.addButton(true) : null)]));
      return thead;
    }
  }, {
    key: 'createAddButton',
    value: function createAddButton() {
      return !this.shouldDisable && (!this.component.addAnotherPosition || this.component.addAnotherPosition === 'bottom' || this.component.addAnotherPosition === 'both') ? this.ce('tr', null, this.ce('td', { colspan: this.component.components.length + 1 }, this.addButton())) : null;
    }
  }, {
    key: 'buildRows',
    value: function buildRows(data) {
      var _this4 = this;

      this.data[this.component.key].forEach(function (row, rowIndex) {
        // New Row.
        if (!_this4.tableRows[rowIndex]) {
          _this4.tableRows[rowIndex] = _this4.buildRow(row, rowIndex, data);
          _this4.tbody.insertBefore(_this4.tableRows[rowIndex], _this4.tbody.children[rowIndex + 1]);
        }
        // Update existing
        else if (!_lodash2.default.isEqual(row, _this4.tableRows[rowIndex].data)) {
            _this4.removeRowComponents(rowIndex);
            var newRow = _this4.buildRow(row, rowIndex, data);
            _this4.tbody.replaceChild(newRow, _this4.tableRows[rowIndex]);
            _this4.tableRows[rowIndex] = newRow;
          }
      });
      // Remove any extra rows.
      for (var rowIndex = this.tableRows.length; rowIndex > this.data[this.component.key].length; rowIndex--) {
        this.tbody.removeChild(this.tableRows[rowIndex - 1]);
        this.tableRows.splice(rowIndex - 1, 1);
      }
    }
  }, {
    key: 'buildRow',
    value: function buildRow(row, index) {
      var _this5 = this;

      this.rows[index] = {};
      var lastColumn = null;
      if (!this.shouldDisable && !this.options.builder) {
        lastColumn = this.ce('td', null, this.removeButton(index));
      }
      if (this.options.builder) {
        lastColumn = this.ce('td', {
          class: 'drag-container'
        }, this.ce('div', {
          id: this.id + '-placeholder',
          class: 'alert alert-info',
          style: 'text-align:center; margin-bottom: 0px;',
          role: 'alert'
        }, this.text('Drag and Drop a form component')));
        lastColumn.component = this;
        this.root.dragContainers.push(lastColumn);
      }

      var element = this.ce('tr', null, [this.component.components.map(function (col, colIndex) {
        return _this5.buildComponent(col, colIndex, row, index);
      }), lastColumn]);
      element.data = _lodash2.default.cloneDeep(row);
      return element;
    }
  }, {
    key: 'removeRowComponents',
    value: function removeRowComponents(rowIndex) {
      var _this6 = this;

      // Clean up components list.
      Object.keys(this.rows[rowIndex]).forEach(function (key) {
        _this6.removeComponent(_this6.rows[rowIndex][key], _this6.components);
      });
      this.rows[rowIndex] = [];
    }
  }, {
    key: 'buildComponent',
    value: function buildComponent(col, colIndex, row, rowIndex) {
      if (!this.visibleColumns || this.visibleColumns.hasOwnProperty(col.key) && !this.visibleColumns[col.key]) {
        return;
      }

      var container = this.ce('td');
      var column = _lodash2.default.clone(col);
      var options = _lodash2.default.clone(this.options);
      options.name += '[' + colIndex + ']';
      var comp = this.createComponent(_lodash2.default.assign({}, column, {
        label: false,
        row: rowIndex + '-' + colIndex
      }), options, row);
      comp.component = column;
      this.hook('addComponent', container, comp);
      this.appendChild(container, comp.getElement());

      if (row.hasOwnProperty(column.key)) {
        comp.setValue(row[column.key]);
      } else if (comp.type === 'components') {
        comp.setValue(row);
      }
      this.rows[rowIndex][column.key] = comp;
      return container;
    }
  }, {
    key: 'checkConditions',
    value: function checkConditions(data) {
      var _this7 = this;

      var show = _get(DataGridComponent.prototype.__proto__ || Object.getPrototypeOf(DataGridComponent.prototype), 'checkConditions', this).call(this, data);
      var rebuild = false;
      if (this.visibleColumns === true) {
        this.visibleColumns = {};
      }
      _lodash2.default.each(this.component.components, function (col) {
        var showColumn = false;
        _lodash2.default.each(_this7.rows, function (comps) {
          showColumn |= comps[col.key].checkConditions(data);
        });
        if (_this7.visibleColumns[col.key] && !showColumn || !_this7.visibleColumns[col.key] && showColumn) {
          rebuild = true;
        }

        _this7.visibleColumns[col.key] = showColumn;
        show |= showColumn;
      });

      // If a rebuild is needed, then rebuild the table.
      if (rebuild && show) {
        this.buildTable();
      }

      // Return if this table should show.
      return show;
    }
  }, {
    key: 'setValue',
    value: function setValue(value, flags) {
      flags = this.getFlags.apply(this, arguments);
      if (!value) {
        return;
      }
      if (!Array.isArray(value)) {
        return;
      }

      this.data[this.component.key] = value;
      this.buildRows();
      _lodash2.default.each(this.rows, function (row, index) {
        if (value.length <= index) {
          return;
        }
        _lodash2.default.each(row, function (col, key) {
          if (col.type === 'components') {
            col.setValue(value[index], flags);
          } else if (value[index].hasOwnProperty(key)) {
            col.setValue(value[index][key], flags);
          }
        });
      });
    }

    /**
     * Get the value of this component.
     *
     * @returns {*}
     */

  }, {
    key: 'getValue',
    value: function getValue() {
      if (this.viewOnly) {
        return this.value;
      }
      var values = [];
      _lodash2.default.each(this.rows, function (row) {
        var value = {};
        _lodash2.default.each(row, function (col) {
          if (col && col.component && col.component.key) {
            value[col.component.key] = col.getValue();
          }
        });
        values.push(value);
      });
      return values;
    }
  }, {
    key: 'defaultValue',
    get: function get() {
      return {};
    }
  }]);

  return DataGridComponent;
}(_Components.FormioComponents);