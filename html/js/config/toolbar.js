var App = App || {};
App.config = App.config || {};

(function() {

    'use strict';

    App.config.toolbar = {
        groups: {
            'undo-redo': { index: 1 },
            'clear': { index: 2 },
            'export': { index: 3 },
            'print': { index: 4 },
            'fullscreen': { index: 5 },
            'order': { index: 6 },
            'layout': { index: 7 },
            'zoom': { index: 8 },
            'grid': { index: 9 },
            'snapline': { index: 10 }
        },
        tools: [
            {
                type: 'undo',
                name: 'undo',
                group: 'undo-redo',
                attrs: {
                    button: {
                        'data-tooltip': '撤销',
                        'data-tooltip-position': 'top',
                        'data-tooltip-position-selector': '.toolbar-container'
                    }
                }
            },
            {
                type: 'redo',
                name: 'redo',
                group: 'undo-redo',
                attrs: {
                    button: {
                        'data-tooltip': '恢复',
                        'data-tooltip-position': 'top',
                        'data-tooltip-position-selector': '.toolbar-container'
                    }
                }
            },
            {
                type: 'button',
                name: 'clear',
                group: 'clear',
                attrs: {
                    button: {
                        id: 'btn-clear',
                        'data-tooltip': '清除',
                        'data-tooltip-position': 'top',
                        'data-tooltip-position-selector': '.toolbar-container'
                    }
                }
            },
            {
                type: 'button',
                name: 'print',
                group: 'print',
                attrs: {
                    button: {
                        id: 'btn-print',
                        'data-tooltip': '打印',
                        'data-tooltip-position': 'top',
                        'data-tooltip-position-selector': '.toolbar-container'
                    }
                }
            },
            {
                type: 'button',
                name: 'to-front',
                group: 'order',
                text: '置前',
                attrs: {
                    button: {
                        id: 'btn-to-front',
                        'data-tooltip': '将对象置前',
                        'data-tooltip-position': 'top',
                        'data-tooltip-position-selector': '.toolbar-container'
                    }
                }
            },
            {
                type: 'button',
                name: 'to-back',
                group: 'order',
                text: '置后',
                attrs: {
                    button: {
                        id: 'btn-to-back',
                        'data-tooltip': '将对象置后',
                        'data-tooltip-position': 'top',
                        'data-tooltip-position-selector': '.toolbar-container'
                    }
                }
            },
            {
                type: 'zoom-to-fit',
                name: '合适视距',
                group: 'zoom',
                attrs: {
                    button: {
                        'data-tooltip': '合适视距',
                        'data-tooltip-position': 'top',
                        'data-tooltip-position-selector': '.toolbar-container'
                    }
                }
            },
            {
                type: 'label',
                name: 'zoom-slider-label',
                group: 'zoom',
                text: '视距:'
            },
            {
                type: 'zoom-slider',
                name: 'zoom-slider',
                group: 'zoom'
            },
            {
                type: 'zoom-in',
                name: '视距',
                group: 'zoom',
                attrs: {
                    button: {
                        'data-tooltip': '视距',
                        'data-tooltip-position': 'top',
                        'data-tooltip-position-selector': '.toolbar-container'
                    }
                }
            },
            {
                type: 'fullscreen',
                name: '全屏',
                group: 'fullscreen',
                attrs: {
                    button: {
                        'data-tooltip': '全屏',
                        'data-tooltip-position': 'top',
                        'data-tooltip-position-selector': '.toolbar-container'
                    }
                }
            }
            

        ]
    };
})();
