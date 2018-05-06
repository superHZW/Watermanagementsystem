var App = App || {};
App.config = App.config || {};

(function() {

    'use strict';

    App.config.stencil = {};

    App.config.stencil.groups = {
        wt: {
            index: 1,
            label: '水力元件'
        },

    };
    App.config.stencil.shapes = {};

    App.config.stencil.shapes.wt = [
        {
            type: 'devs.Mypipe',
            inPorts:['进口'],
            outPorts:['出口'],
        },
        {
            type: 'devs.MyInsump',
            outPorts:['进口'],
        },
        {
            type: 'devs.MyOutpool',
            inPorts:['出口'],
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