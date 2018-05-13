(function(joint) {

  'use strict';
  joint.shapes.app = joint.shapes.app || {};
  joint.shapes.app.Connector = joint.shapes.basic.Circle.extend({
    defaults: _.defaultsDeep({
      type: "app.Connector",
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
      modelType:'管道',
      DEVICE_CODE: '0',
      DEVICE_NAME: '管道',
      BELONG_TO_PCODE: '0',
      BEGIN_NODE_CD:'0',
      END_NODE_CD:'0',
      BEGIN_STAKE_MARK: '0',
      END_STAKE_MARK: '0',
      IN_HIGHT: '0',
      OUT_HIGHT: '0',
      PIPE_MATE: '0',
      EQUIMENT_LENGTH: '0',
      SLOPE: '0',
      SHAPE: '0',
      WATER_POWER: '0',
      ROUGHNESS: '0',
      YCXS: '0',
      YCSS: '0',
      TJTXML: '0',
      INI_Q: '0',
      RESULT_Q: '0',
      DESIGN_PRESSURE: '0',
      SCBS: '0',
      DESIGN_V: '0',
      PIPE_COUNT: '0',
      INSIDE_P: '0',
      PIPE_INSIDE_R: '0',
      PIPE_THICK: '0',
      CYDJ: '0',
      QHYL: '0',
      B: '0',
      RL: '0',
      INDEX_IN_MATRIX:'0',
      NOTE: '0',
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
      modelType: '进水池',
      DEVICE_CODE: '0',
      DEVICE_NAME: '进水池',
      BELONG_TO_PCODE: '0',
      NODE_CODE:'0',
      LGTD: '0',
      LTTD: '0',
      DESIGN_Q: '0',
      INTAKESUMP_LEVEL: '0',
      PIPE_SIZE: '0',
      PIPE_COUNT: '0',
      DESIGN_PRESSURE: '0',
      SECTION_IN: '0',
      WATER_HEIGHT: '0',
      INDEX_IN_MATRIX:'0',
      NOTE: '0',
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
      modelType:'出水池',
      DEVICE_CODE: '0',
      DEVICE_NAME: '出水池',
      BELONG_TO_PCODE: '0',
      NODE_CODE:'0',
      LGTD: '0',
      LTTD: '0',
      DESIGN_Q: '0',
      OUTPOOL_LEVEL: '0',
      PIPE_SIZE: '0',
      PIPE_COUNT: '0',
      SECTION_IN: '0',
      WATER_HEIGHT: '0',
      INDEX_IN_MATRIX:'0',
      NOTE: '0',
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
      modelType: '调流阀',
      DEVICE_CODE: '0',
      DEVICE_NAME: '调流阀',
      BELONG_TO_PCODE: '0',
      VAV_TYPE: '0',
      IS_OPERATE: '0',
      STAKE_MARK: '0',
      VAV_WORK: '0',
      VAV_SEC_IN: '0',
      LGTD: '0',
      LTTD: '0',
      VAV_SIZE: '0',
      PRESSURE_LEVEL: '0',
      START_CONDI: '0',
      MAX_DELPRE_START: '0',
      USER_TYPE: '0',
      INSTALL_HEIGHT: '0',
      INI_OPEN_LEVEL: '0',
      Q: '0',
      DESIGN_PRESSURE: '0',
      VAV_OTHER_SIZE: '0',
      INI_OPENLEVEL_MIN: '0',
      PRESSURE_WORK: '0',
      PREW_MAX_DEL: '0',
      NVAV_COUNT: '0',
      K_ALL_OPEN: '0',
      VAV_SIDE_S: '0',
      INDEX_IN_MATRIX:'0',
      NOTE: '0',
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
      modelType:'蝶阀',
      DEVICE_CODE: '0',
      DEVICE_NAME: '蝶阀',
      BELONG_TO_PCODE: '0',
      VAV_TYPE: '0',
      IS_OPERATE: '0',
      STAKE_MARK: '0',
      VAV_WORK: '0',
      VAV_SEC_IN: '0',
      LGTD: '0',
      LTTD: '0',
      VAV_SIZE: '0',
      PRESSURE_LEVEL: '0',
      START_CONDI: '0',
      MAX_DELPRE_START: '0',
      USER_TYPE: '0',
      INSTALL_HEIGHT: '0',
      INI_OPEN_LEVEL: '0',
      Q: '0',
      DESIGN_PRESSURE: '0',
      VAV_OTHER_SIZE: '0',
      INI_OPENLEVEL_MIN: '0',
      PRESSURE_WORK: '0',
      PREW_MAX_DEL: '0',
      NVAV_COUNT: '0',
      K_ALL_OPEN: '0',
      VAV_SIDE_S: '0',
      INDEX_IN_MATRIX:'0',
      NOTE: '0',
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
      modelType:'球阀',
      DEVICE_CODE: '0',
      DEVICE_NAME: '球阀',
      BELONG_TO_PCODE: '0',
      VAV_TYPE: '0',
      IS_OPERATE: '0',
      STAKE_MARK: '0',
      VAV_WORK: '0',
      VAV_SEC_IN: '0',
      LGTD: '0',
      LTTD: '0',
      VAV_SIZE: '0',
      PRESSURE_LEVEL: '0',
      START_CONDI: '0',
      MAX_DELPRE_START: '0',
      USER_TYPE: '0',
      INSTALL_HEIGHT: '0',
      INI_OPEN_LEVEL: '0',
      Q: '0',
      DESIGN_PRESSURE: '0',
      VAV_OTHER_SIZE: '0',
      INI_OPENLEVEL_MIN: '0',
      PRESSURE_WORK: '0',
      PREW_MAX_DEL: '0',
      NVAV_COUNT: '0',
      K_ALL_OPEN: '0',
      VAV_SIDE_S: '0',
      INDEX_IN_MATRIX:'0',
      NOTE: '0',
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