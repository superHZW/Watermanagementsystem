var App = App || {};
App.config = App.config || {};

(function() {

    'use strict';

    App.config.stencil = {};

    App.config.stencil.groups = {
        lj: {
            index: 1,
            label: '通用元件'
        },
        wt: {
            index: 2,
            label: '水力元件'
        },


    };
    App.config.stencil.shapes = {};
    App.config.stencil.shapes.lj = [{
        type: 'app.Connector',
        modelType:'节点',
        size: {
            width: 20,
            height: 20
        },
        attrs: {
            '.': {
                'data-tooltip': '节点',
                'data-tooltip-position': 'left',
                'data-tooltip-position-selector': '.joint-stencil'
            },
            circle: {
                fill: '#EE7942',
                'stroke-width': 2,
                stroke: '#EE7942'
            },
            text: {
                fill: 'white',
            }
        }
    }, 
        {
            type: 'basic.Text',
            modelType: '文本',
            size: {
                width: 36,
                height: 21
            },
            attrs: {
                '.': {
                    'data-tooltip': '文本',
                    'data-tooltip-position': 'left',
                    'data-tooltip-position-selector': '.joint-stencil'
                },
                text: {
                    text: '文本',
                    fill: 'black',
//                      'font-size': 20,
                    'font-family': 'Montserrat',
                    'font-weight': 'normal'
                },
            }
        },

    ],

    App.config.stencil.shapes.wt = [
        {
            type: 'devs.Mypipe',
            inPorts:['进口'],
            outPorts:['出口'],
        },
        {
            type: 'devs.MyInsump',
            outPorts:['出口'],
            
        },
        {
            type: 'devs.MyOutpool',
            inPorts:['进口'],
            
        },
         {
            type: 'devs.MyValuen',
            inPorts:['进口'],
            outPorts:['出口'],
        }, 
        {
            type: 'devs.MyValuef',
            inPorts:['进口'],
            outPorts:['出口'],
        },
        {
            type: 'devs.MyValueb',
            inPorts:['进口'],
            outPorts:['出口'],
        },      
    ];

})();