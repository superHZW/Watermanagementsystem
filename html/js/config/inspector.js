var App = App || {};
App.config = App.config || {};

(function() {

    'use strict';
    App.config.inspector = {
            'devs.MyInsump': {
                inputs: {
                    DEVICE_NAME: {
                        type: 'text',
                        label: '进水池',
                        group: 'text',
                        index: 1
                    },
                    LGTD: {
                        type: 'text',
                        label: '经度',
                        group: 'text',
                        index: 3
                    },
                    LTTD: {
                        type: 'text',
                        label: '纬度',
                        group: 'text',
                        index: 4
                    },
                    DESIGN_Q: {
                        type: 'text',
                        label: '设计流量(m3/s)',
                        group: 'text',
                        index: 5
                    },
                    PIPE_SIZE: {
                        type: 'text',
                        label: '水管直径(mm)',
                        group: 'text',
                        index: 6
                    },
                    PIPE_COUNT: {
                        type: 'text',
                        label: '水管根数',
                        group: 'text',
                        index: 7
                    },
                    DESIGN_PRESSURE: {
                        type: 'text',
                        label: '设计压力标高(m)',
                        group: 'text',
                        index: 8
                    },
                    SECTION_IN: {
                        type: 'text',
                        label: '所在分段',
                        group: 'text',
                        index: 9
                    },
                    WATER_HEIGHT: {
                        type: 'text',
                        label: '水位高程(m)',
                        group: 'text',
                        index: 10
                    },
                    NOTE: {
                        type: 'text',
                        label: '备注',
                        group: 'text',
                        index: 11
                    },
                },
                groups: {
                    text: {
                        label: '设备属性',
                        index: 1
                    }
                }
            },
        },
        App.config.inspector = {
            'devs.MyOutpool': {
                inputs: {
                    DEVICE_NAME: {
                        type: 'text',
                        label: '出水池',
                        group: 'text',
                        index: 1
                    },
                    LGTD: {
                        type: 'text',
                        label: '经度',
                        group: 'text',
                        index: 2
                    },
                    LTTD: {
                        type: 'text',
                        label: '纬度',
                        group: 'text',
                        index: 3
                    },
                    DESIGN_Q: {
                        type: 'text',
                        label: '设计流量(m3/s)',
                        group: 'text',
                        index: 4
                    },
                    PIPE_SIZE: {
                        type: 'text',
                        label: '水管直径(mm)',
                        group: 'text',
                        index: 5
                    },
                    PIPE_COUNT: {
                        type: 'text',
                        label: '水管根数',
                        group: 'text',
                        index: 6
                    },
                    OUTPOOL_LEVEL: {
                        type: 'text',
                        label: '出水池水位(m)',
                        group: 'text',
                        index: 7
                    },
                    SECTION_IN: {
                        type: 'text',
                        label: '所在分段',
                        group: 'text',
                        index: 8
                    },
                    WATER_HEIGHT: {
                        type: 'text',
                        label: '水位高程(m)',
                        group: 'text',
                        index: 9
                    },
                    NOTE: {
                        type: 'text',
                        label: '备注',
                        group: 'text',
                        index: 10
                    },
                },
                groups: {
                    text: {
                        label: '设备属性',
                        index: 1
                    }
                }
            },
        },

        App.config.inspector = {
            'devs.Mypipe': {
                inputs: {
                    DEVICE_NAME: {
                        type: 'text',
                        label: '管道',
                        group: 'text',
                        index: 1
                    },
                    BEGIN_STAKE_MARK: {
                        type: 'text',
                        label: '起点桩号',
                        group: 'text',
                        index: 2
                    },
                    END_STAKE_MARK: {
                        type: 'text',
                        label: '终点桩号',
                        group: 'text',
                        index: 3
                    },
                    IN_HIGHT: {
                        type: 'text',
                        label: '进口底高程',
                        group: 'text',
                        index: 4
                    },
                    OUT_HIGHT: {
                        type: 'text',
                        label: '出口底高程',
                        group: 'text',
                        index: 5
                    },
                    PIPE_MATE: {
                        type: 'text',
                        label: '设备材料',
                        group: 'text',
                        index: 7
                    },
                    EQUIMENT_LENGTH: {
                        type: 'text',
                        label: '设备长度',
                        group: 'text',
                        index: 8
                    },
                    SLOPE: {
                        type: 'text',
                        label: '坡度',
                        group: 'text',
                        index: 10
                    },
                    SHAPE: {
                        type: 'text',
                        label: '断面形状',
                        group: 'text',
                        index: 11
                    },
                    WATER_POWER: {
                        type: 'text',
                        label: '水力半径',
                        group: 'text',
                        index: 12
                    },
                    ROUGHNESS: {
                        type: 'text',
                        label: '糙率',
                        group: 'text',
                        index: 13
                    },
                    YCXS: {
                        type: 'text',
                        label: '沿程系数',
                        group: 'text',
                        index: 14
                    },
                    YCSS: {
                        type: 'text',
                        label: '沿程损失',
                        group: 'text',
                        index: 15
                    },
                    TJTXML: {
                        type: 'text',
                        label: '体积弹性模量',
                        group: 'text',
                        index: 16
                    },
                    INI_Q: {
                        type: 'text',
                        label: '出水池水位(m)',
                        group: 'text',
                        index: 17
                    },
                    RESULT_Q: {
                        type: 'text',
                        label: '稳态计算的结果',
                        group: 'text',
                        index: 18
                    },
                    DESIGN_PRESSURE: {
                        type: 'text',
                        label: '设计压力',
                        group: 'text',
                        index: 19
                    },
                    SCBS: {
                        type: 'text',
                        label: '水锤波速',
                        group: 'text',
                        index: 20
                    },
                    DESIGN_V: {
                        type: 'text',
                        label: '设计流速',
                        group: 'text',
                        index: 21
                    },
                    PIPE_COUNT: {
                        type: 'text',
                        label: '水管根数',
                        group: 'text',
                        index: 22
                    },
                    INSIDE_P: {
                        type: 'text',
                        label: '纬度',
                        group: 'text',
                        index: 23
                    },
                    PIPE_INSIDE_R: {
                        type: 'text',
                        label: '内管径',
                        group: 'text',
                        index: 24
                    },
                    PIPE_THICK: {
                        type: 'text',
                        label: '壁厚',
                        group: 'text',
                        index: 25
                    },
                    CYDJ: {
                        type: 'text',
                        label: '承压等级',
                        group: 'text',
                        index: 26
                    },
                    QHYL: {
                        type: 'text',
                        label: '汽化压力',
                        group: 'text',
                        index: 28
                    },
                    B: {
                        type: 'text',
                        label: 'B',
                        group: 'text',
                        index: 29
                    },
                    RL: {
                        type: 'text',
                        label: 'RL',
                        group: 'text',
                        index: 30
                    },
                    NOTE: {
                        type: 'text',
                        label: '备注',
                        group: 'text',
                        index: 31
                    },
                },
                groups: {
                    text: {
                        label: '设备属性',
                        index: 1
                    }
                }
            },
        },

})();