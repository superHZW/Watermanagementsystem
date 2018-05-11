var App = App || {};
App.config = App.config || {};

(function() {

    'use strict';

    App.config.halo = {

        handles: [{
            name: 'remove',
            position: 'nw',
            events: {
                pointerdown: 'removeElement'
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
            name: 'fork',
            position: 'ne',
            events: {
                pointerdown: 'startForking',
                pointermove: 'doFork',
                pointerup: 'stopForking'
            },
            attrs: {
                '.handle': {
                    'data-tooltip-class-name': 'small',
                    'data-tooltip': '复制并连线',
                    'data-tooltip-position': 'left',
                    'data-tooltip-padding': 15
                }
            }
        }, {
            name: 'clone',
            position: 'se',
            events: {
                pointerdown: 'startCloning',
                pointermove: 'doClone',
                pointerup: 'stopCloning'
            },
            attrs: {
                '.handle': {
                    'data-tooltip-class-name': 'small',
                    'data-tooltip': '复制',
                    'data-tooltip-position': 'left',
                    'data-tooltip-padding': 15
                }
            }
        }, {
            name: 'unlink',
            position: 'w',
            events: {
                pointerdown: 'unlinkElement'
            },
            attrs: {
                '.handle': {
                    'data-tooltip-class-name': 'small',
                    'data-tooltip': '删除连线',
                    'data-tooltip-position': 'right',
                    'data-tooltip-padding': 15
                }
            }
        }, {
            name: 'link',
            position: 'e',
            events: {
                pointerdown: 'startLinking',
                pointermove: 'doLink',
                pointerup: 'stopLinking'
            },
            attrs: {
                '.handle': {
                    'data-tooltip-class-name': 'small',
                    'data-tooltip': '连线',
                    'data-tooltip-position': 'left',
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
        }]
    };

})();