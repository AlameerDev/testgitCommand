const ComponentsEditForm = require('../Components.form');
module.exports = function(...extend) {
  return ComponentsEditForm({
    components: [
      {
        weight: 0,
        type: 'tabs',
        key: 'tabs',
        components: [
          {
            label: 'Display',
            key: 'display',
            components: [
              {
                key: 'components',
                type: 'datagrid',
                input: true,
                label: 'Tabs',
                components: [
                  {
                    type: 'textfield',
                    input: true,
                    key: 'label',
                    label: 'Label'
                  },
                  {
                    type: 'textfield',
                    input: true,
                    key: 'key',
                    label: 'Key'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }, ...extend);
};
