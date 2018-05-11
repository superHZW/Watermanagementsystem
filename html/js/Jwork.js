// 全局变量

var myChart; //全局结果图表对象
var getPRJ_CD = null; //全局工程ID
var myChartt; //单个设备属性或结果图表对象
var getSIM_CD = undefined; //获得的仿真记录编码
var getOBJ_CD = undefined; //获得鼠标点中的对象ID
var getPRJ_TYPE = undefined; //获得设备类型
var indexFz; //记录选中的仿真记录
var cell_view = null;
var cell_view_save = null;
var url = '../water_manage_system/';
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
var type = {
    "culvert": 1,
    "pipe": 2,
    "valve_b": 3,
    "valve_f": 4,
    "valve_n": 5,
    "valve_o": 6,
    "valve_a": 7,
    "was_p": 8,
    "was_c": 9,
    "surgetank": 10,
    "wds": 11,
    "wiust": 12,
    "overflow": 13,
    "bleeder": 14,
    "insump": 15,
    "outpool": 16,
    "coffer": 17,
    "mhprrp": 18,
    "hydturbine": 19,
    "piezometer": 20,
    "flow": 21,
    "node": 22,
    "ctwell": 23,
    "elbow": 24
};

//-------------------------修改密码-------------------------
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
        " " + date.getHours() + seperator2 + date.getMinutes() +
        seperator2 + date.getSeconds();
    return currentdate;
}
$(document).ready(function() {

    username = sessionStorage.getItem("username", null);
    if (username == null) {
        alert("请重新登录");
        window.location = "#";
    };
    $("#username").val(username);
    //登出
    logout = function() {
        id = sessionStorage.getItem("id");
        date = getNowFormatDate();
        json_data = {
            "id": id,
            "date": date
        };
        //移除session
        sessionStorage.removeItem("id");
        sessionStorage.removeItem("username");
        $.ajax({
            type: "POST",
            url: url + "logout",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(json_data),
            success: function(ret_data) {
                if (ret_data == "failed_update_date") {
                    alert("更新日期失败");
                } else {
                    window.location = "home.html";
                }
            },
            error: function() {
                alert("更新日期失败");
            }
        });
    };
    $("#btn_modify_password").click(function() {
        if ($("#password").val() != $("#confirm").val()) {

            $.messager.alert({
                title: '警告',
                msg: '两次输入密码不一样！！'
            });
            return;
        };
        password = $("#password").val();
        id = sessionStorage.getItem("id", null);
        pastpassword = $('#pastpassword').val();
        if (id == null || password == null) {
            $.messager.alert({
                title: '警告',
                msg: '错误,ID或者密码为空！'
            });
            // alert(id);
            // alert(password);
            return;
        }
        json_data = {
            "id": id,
            "password": password,
            "pastpassword": pastpassword
        };
        $.ajax({
            type: "POST",
            url: url + "updatepassword",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(json_data),
            success: function(ret_data) {
                if (ret_data == "old_error") {
                    $.messager.alert({
                        title: '警告',
                        msg: '旧密码错误，请重试！'
                    });
                    return;
                } else if (ret_data == "failed_modify_password") {
                    $.messager.alert({
                        title: '警告',
                        msg: '密码修改失败，请重试！'
                    });
                } else {
                    $('#user-management').modal('toggle');
                    $.messager.show({
                        title: '提示',
                        msg: '密码修改成功。'
                    });
                }
            },
            error: function() {
                $.messager.alert({
                    title: '警告',
                    msg: '密码修改失败，请重试！'
                });
            }
        });

    })

});