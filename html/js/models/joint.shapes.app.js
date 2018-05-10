(function(joint) {

  'use strict';

  joint.shapes.app = joint.shapes.app || {};
  joint.shapes.app.Connector = joint.shapes.basic.Circle.extend({
    defaults: _.defaultsDeep({
      type: "app.Connector",
      modelType: 'node',
    }, joint.shapes.basic.Circle.prototype.defaults)
  });


  joint.shapes.devs.Mypipe = joint.shapes.devs.Model.extend({
    markup: [
      '<g class="rotatable">',
      '<g class="scalable">',
      '<polyline points="0,0 0,80 0,60 60,60 60,80 60,0 60,20 0,20" style="fill: DodgerBlue;stroke:#000000;stroke-width:1"/>',
      '</g>',
      '</g>',
    ].join(''),
    defaults: joint.util.deepSupplement({
      type: 'devs.Mypipe',
      size: {
        width: 60,
        height: 20
      },
      attrs: {
        '.': {
          'data-tooltip': '管道',
          'data-tooltip-position': 'left',
          'data-tooltip-position-selector': '.joint-stencil'
        },
      },
    }, joint.shapes.devs.Model.prototype.defaults)
  });

  joint.shapes.devs.MyInsump = joint.shapes.devs.Model.extend({
    markup: [
      '<g class="rotatable">',
      '<g class="scalable">',
      '</g>',
      '<image class="body"/>',
      '</g>'
    ].join(''),

    defaults: joint.util.deepSupplement({
      type: 'devs.MyInsump',
      modeltext: "进水池",
      size: {
        width: 70,
        height: 100
      },
      name: '进水池',
      attrs: {
        '.': {
          'data-tooltip': '进水池',
          'data-tooltip-position': 'left',
          'data-tooltip-position-selector': '.joint-stencil'
        },
        image: {
          'xlink:href': 'assets/svg/进水池.svg',
        },
      },
    }, joint.shapes.devs.Model.prototype.defaults)
  });

  joint.shapes.devs.MyOutpool = joint.shapes.devs.Model.extend({
    markup: [
      '<g class="rotatable">',
      '<g class="scalable">',
      '</g>',
      '<image class="body"/>',
      '</g>'
    ].join(''),

    defaults: joint.util.deepSupplement({

      type: 'devs.MyOutpool',
      size: {
        width: 70,
        height: 100
      },
      attrs: {
        '.': {
          'data-tooltip': '出水池',
          'data-tooltip-position': 'left',
          'data-tooltip-position-selector': '.joint-stencil'
        },
        image: {
          'xlink:href': 'assets/svg/出水池.svg',
        }
      }

    }, joint.shapes.devs.Model.prototype.defaults)
  });

  joint.shapes.devs.MyValuen = joint.shapes.devs.Model.extend({
    markup: [
      '<g class="rotatable">',
      '<g class="scalable">',
      '</g>',
      '<image class="body"/>',
      '</g>'
    ].join(''),

    defaults: joint.util.deepSupplement({

      type: 'devs.MyValuen',
      size: {
        width: 70,
        height: 100
      },
      attrs: {
        '.': {
          'data-tooltip': '调流阀',
          'data-tooltip-position': 'left',
          'data-tooltip-position-selector': '.joint-stencil'
        },
        image: {
          'xlink:href': 'assets/svg/调流阀.svg',
        }
      }

    }, joint.shapes.devs.Model.prototype.defaults)
  });

  joint.shapes.devs.MyValuef = joint.shapes.devs.Model.extend({
    markup: [
      '<g class="rotatable">',
      '<g class="scalable">',
      '</g>',
      '<image class="body"/>',
      '</g>'
    ].join(''),

    defaults: joint.util.deepSupplement({

      type: 'devs.MyValuef',
      size: {
        width: 70,
        height: 100
      },
      attrs: {
        '.': {
          'data-tooltip': '蝶阀',
          'data-tooltip-position': 'left',
          'data-tooltip-position-selector': '.joint-stencil'
        },
        image: {
          'xlink:href': 'assets/svg/蝶阀.svg',
        }
      }

    }, joint.shapes.devs.Model.prototype.defaults)
  });

  joint.shapes.devs.MyValueb = joint.shapes.devs.Model.extend({
    markup: [
      '<g class="rotatable">',
      '<g class="scalable">',
      '</g>',
      '<image class="body"/>',
      '</g>'
    ].join(''),

    defaults: joint.util.deepSupplement({

      type: 'devs.MyValueb',
      size: {
        width: 70,
        height: 100,
      },
      attrs: {
        '.': {
          'data-tooltip': '球阀',
          'data-tooltip-position': 'left',
          'data-tooltip-position-selector': '.joint-stencil'
        },
        image: {
          'xlink:href': 'assets/svg/球阀.svg',
        }
      }

    }, joint.shapes.devs.Model.prototype.defaults)
  });


})(joint);