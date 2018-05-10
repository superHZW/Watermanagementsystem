var App = App || {};
App.config = App.config || {};

(function() {

    'use strict';
      App.config.inspector = {
        'devs.MyInsump': {
            inputs: {
                        name: {
                            type: 'text',
                            label: '元件名称',
                            group: 'text',
                            index: 1
                        },
            },
            groups: {
                text: {
                    label: '元件属性',
                    index: 1
                }
            }
        },
      }
})();
