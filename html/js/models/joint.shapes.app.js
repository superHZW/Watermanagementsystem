(function(joint) {

    'use strict';

    joint.shapes.app = joint.shapes.app || {};

    joint.shapes.app.pipe = joint.shapes.basic.Generic.extend({
        markup: [
            '<g class="rotatable">',
            '<g class="scalable">',
            '<polyline points="0,0 0,80 0,60 60,60 60,80 60,0 60,20 0,20" style="fill: DodgerBlue;stroke:#000000;stroke-width:1"/>',
            '</g>',
            '</g>'
        ].join(''),
        portMarkup: '<circle class="port-body"/>',

        defaults: joint.util.deepSupplement({
            type: 'app.pipe',
            modelType: 'pipe',
            modelText: '管道',
            attrs: {
                '.': {
                    magnet: !1,
                    'data-tooltip': '管道',
                    'data-tooltip-position': 'left',
                    'data-tooltip-position-selector': '.joint-stencil'
                },
                text: {
                    text: '管道',
                }
            },
            ports: {
                groups: {
                    'out': {
                        position: {
                            name: 'absolute',
                            args: {
                                x: '100%',
                                y: '50%'
                            }
                        },
                        attrs: {
                            circle: {
                                fill: '#008B00',
                                stroke: '#008B00',
                                'stroke-width': 2,
                                r: 3,
                                magnet: true
                            }
                        }
                    },

                    'in': {
                        position: {
                            name: 'absolute',
                            args: {
                                x: '0%',
                                y: '50%'
                            }
                        },
                        attrs: {
                            circle: {
                                fill: '#FF0000',
                                stroke: '#FF0000',
                                'stroke-width': 2,
                                r: 3,
                                magnet: true
                            }
                        }
                    },
                },
            },

        }, joint.shapes.basic.Generic.prototype.defaults)
    });

// joint.shapes.devs.MyImageModel = joint.shapes.devs.Model.extend({

//   markup: [
//   '<g class="rotatable">',
//   '<g class="scalable">',
//   // '<rect class="body"/>',
//   '</g>',
//   '<image/>',
//   '<text class="label"/>',
//   '<g class="inPorts"/>',
//   '<g class="outPorts"/>',
//   '</g>'].join(''),
//   defaults: joint.util.deepSupplement({

//     type: 'devs.MyImageModel',
//     size: {
//       width: 80,
//       height: 80
//     },
//     attrs: {
//       // rect: {
//       //   stroke: '#d1d1d1',
//       //   fill: {
//       //     type: 'linearGradient',
//       //     stops: [{
//       //       offset: '0%',
//       //       color: 'white'
//       //     }, {
//       //       offset: '50%',
//       //       color: '#d1d1d1'
//       //     }],
//       //     attrs: {
//       //       x1: '0%',
//       //       y1: '0%',
//       //       x2: '0%',
//       //       y2: '100%'
//       //     }
//       //   }
//       // },
//       circle: {
//         stroke: 'gray'
//       },
//       '.label': {
//         text: 'My Shape',
//         'ref-y': -20
//       },
//       '.inPorts circle': {
//         fill: '#c8c8c8'
//       },
//       '.outPorts circle': {
//         fill: '#262626'
//       },
//       image: {
//         'xlink:href': 'assets/svg/进水池.svg',
//         width: 80,
//         height: 50,
//         'ref-x': .5,
//         'ref-y': .5,
//         // ref: 'rect',
//         'x-alignment': 'middle',
//         'y-alignment': 'middle'
//       }
//     }

//   }, joint.shapes.devs.Model.prototype.defaults)
// });

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
    }

  }, joint.shapes.devs.Model.prototype.defaults)
});

joint.shapes.devs.MyInsump = joint.shapes.devs.Model.extend({
  markup: [
  '<g class="rotatable">',
  '<g class="scalable">',
  '</g>',
  '<image class="body"/>',
  '</g>'].join(''),

  defaults: joint.util.deepSupplement({
    type: 'devs.MyInsump',
    size: {
      width: 70,
      height: 100
    },
    attrs: {
       '.': {
        'data-tooltip': '进水池',
        'data-tooltip-position': 'left',
        'data-tooltip-position-selector': '.joint-stencil'
         },
      image: {
        'xlink:href': 'assets/svg/进水池.svg',
      }
    }

  }, joint.shapes.devs.Model.prototype.defaults)
});

joint.shapes.devs.MyOutpool = joint.shapes.devs.Model.extend({
  markup: [
  '<g class="rotatable">',
  '<g class="scalable">',
  '</g>',
  '<image class="body"/>',
  '</g>'].join(''),

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
  '</g>'].join(''),

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
  '</g>'].join(''),

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
  '</g>'].join(''),

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
