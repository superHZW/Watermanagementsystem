var App = App || {};
App.config = App.config || {};

(function() {

    'use strict';

    App.config.selection = {

        handles: [{
            name: 'remove',
            position: 'nw',
            events: {
                pointerdown: 'removeElements'
            },
            attrs: {
                '.handle': {
                    'data-tooltip-class-name': 'small',
                    'data-tooltip': '删除',
                    'data-tooltip-position': 'right',
                    'data-tooltip-padding': 15
                }
            }

        }, {
            name: 'rotate',
            position: 'sw',
            events: {
                pointerdown: 'startRotating',
                pointermove: 'doRotate',
                pointerup: 'stopBatch'
            },
            attrs: {
                '.handle': {
                    'data-tooltip-class-name': 'small',
                    'data-tooltip': '旋转',
                    'data-tooltip-position': 'right',
                    'data-tooltip-padding': 15
                }
            }

        },]
    };

})();
