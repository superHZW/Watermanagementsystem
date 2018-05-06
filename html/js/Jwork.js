// 全局变量

var myChart; //全局结果图表对象
var getPRJ_CD = null;//全局工程ID
var myChartt; //单个设备属性或结果图表对象
var getSIM_CD = undefined; //获得的仿真记录编码
var getOBJ_CD = undefined; //获得鼠标点中的对象ID
var getPRJ_TYPE = undefined; //获得设备类型
var indexFz;//记录选中的仿真记录
var cell_view = null;
var cell_view_save = null;
var url = '../LXBWaterAutomation/';
var option2;
var app;
var appp = {};
var symbolSize = 10;
var dataa = [
    [],
    [],
    [],
    [],
    [],
    [],
    []
];
var type={
    "culvert": 1,
    "pipe": 2,
    "valve_b": 3,
    "valve_f": 4,
    "valve_n": 5,
    "valve_o": 6,
    "valve_a": 7 ,
    "was_p": 8 ,
    "was_c": 9 ,
    "surgetank": 10 ,
    "wds": 11,
    "wiust": 12 ,
    "overflow": 13 ,
    "bleeder": 14 ,
    "insump": 15 ,
    "outpool": 16 ,
    "coffer": 17,
    "mhprrp": 18 ,
    "hydturbine": 19 ,
    "piezometer": 20,
    "flow": 21,
    "node": 22,
    "ctwell": 23,
    "elbow": 24
};