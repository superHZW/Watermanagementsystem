(function(joint) {

  'use strict';

  joint.shapes.app = joint.shapes.app || {};
  joint.shapes.app.Connector = joint.shapes.basic.Circle.extend({
    defaults: _.defaultsDeep({
      type: "app.Connector",
      modelType:'node',
    }, joint.shapes.basic.Circle.prototype.defaults)
  });
  
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
        },
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
      DEVICE_CODE:'',
      DEVICE_NAME:'',
      BELONG_TO_PCODE:'',
      BEGIN_STAKE_MARK:'',
      END_STAKE_MARK:'',
      IN_HIGHT:'',
      OUT_HIGHT:'',
      PIPE_MATE:'',
      EQUIMENT_LENGTH:'',
      SLOPE:'',
      SHAPE:'',
      WATER_POWER:'',
      ROUGHNESS:'',
      YCXS:'',
      YCSS:'',
      TJTXML:'',
      INI_Q:'',
      RESULT_Q:'',
      DESIGN_PRESSURE:'',
      SCBS:'',
      DESIGN_V:'',
      PIPE_COUNT:'',
      INSIDE_P:'',
      PIPE_INSIDE_R:'',
      PIPE_THICK:'',
      CYDJ:'',
      QHYL:'',
      B:'',
      RL:'',
      NOTE:'',
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
      '</g>'
    ].join(''),

    defaults: joint.util.deepSupplement({
      type: 'devs.MyInsump',
      DEVICE_CODE:'',
      DEVICE_NAME:'',
      BELONG_TO_PCODE:'',
      LGTD:'',
      LTTD:'',
      DESIGN_Q:'',
      INTAKESUMP_LEVEL:'',
      PIPE_SIZE:'',
      PIPE_COUNT:'',
      DESIGN_PRESSURE:'',
      SECTION_IN:'',
      WATER_HEIGHT:'',
      NOTE:'',
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
          'xlink:href': 'assets/svg/insump.svg',
        },
      }
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
      DEVICE_CODE:'',
      DEVICE_NAME:'',
      BELONG_TO_PCODE:'',
      LGTD:'',
      LTTD:'',
      DESIGN_Q:'',
      OUTPOOL_LEVEL:'',
      PIPE_SIZE:'',
      PIPE_COUNT:'',
      SECTION_IN:'',
      WATER_HEIGHT:'',
      NOTE:'',
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
          'xlink:href': 'assets/svg/outpool.svg',
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
      DEVICE_CODE:'',
      DEVICE_NAME:'',
      BELONG_TO_PCODE:'',
      VAV_TYPE:'',
      IS_OPERATE:'',
      STAKE_MARK:'',
      VAV_WORK:'',
      VAV_SEC_IN:'',
      LGTD:'',
      LTTD:'',
      VAV_SIZE:'',
      PRESSURE_LEVEL:'',
      START_CONDI:'',
      MAX_DELPRE_START:'',
      USER_TYPE:'',
      INSTALL_HEIGHT:'',
      INI_OPEN_LEVEL:'',
      Q:'',
      DESIGN_PRESSURE:'',
      VAV_OTHER_SIZE:'',
      INI_OPENLEVEL_MIN:'',
      PRESSURE_WORK:'',
      PREW_MAX_DEL:'',
      NVAV_COUNT:'',
      K_ALL_OPEN:'',
      VAV_SIDE_S:'',
      NOTE:'',
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
          'xlink:href': 'assets/svg/valve_n.svg',
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
      DEVICE_CODE:'',
      DEVICE_NAME:'',
      BELONG_TO_PCODE:'',
      VAV_TYPE:'',
      IS_OPERATE:'',
      STAKE_MARK:'',
      VAV_WORK:'',
      VAV_SEC_IN:'',
      LGTD:'',
      LTTD:'',
      VAV_SIZE:'',
      PRESSURE_LEVEL:'',
      START_CONDI:'',
      MAX_DELPRE_START:'',
      USER_TYPE:'',
      INSTALL_HEIGHT:'',
      INI_OPEN_LEVEL:'',
      Q:'',
      DESIGN_PRESSURE:'',
      VAV_OTHER_SIZE:'',
      INI_OPENLEVEL_MIN:'',
      PRESSURE_WORK:'',
      PREW_MAX_DEL:'',
      NVAV_COUNT:'',
      K_ALL_OPEN:'',
      VAV_SIDE_S:'',
      NOTE:'',
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
          'xlink:href': 'assets/svg/valve_f.svg',
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
      DEVICE_CODE:'',
      DEVICE_NAME:'',
      BELONG_TO_PCODE:'',
      VAV_TYPE:'',
      IS_OPERATE:'',
      STAKE_MARK:'',
      VAV_WORK:'',
      VAV_SEC_IN:'',
      LGTD:'',
      LTTD:'',
      VAV_SIZE:'',
      PRESSURE_LEVEL:'',
      START_CONDI:'',
      MAX_DELPRE_START:'',
      USER_TYPE:'',
      INSTALL_HEIGHT:'',
      INI_OPEN_LEVEL:'',
      Q:'',
      DESIGN_PRESSURE:'',
      VAV_OTHER_SIZE:'',
      INI_OPENLEVEL_MIN:'',
      PRESSURE_WORK:'',
      PREW_MAX_DEL:'',
      NVAV_COUNT:'',
      K_ALL_OPEN:'',
      VAV_SIDE_S:'',
      NOTE:'',
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
          'xlink:href': 'assets/svg/valve_b.svg',
        }
      }

    }, joint.shapes.devs.Model.prototype.defaults)
  });

})(joint);