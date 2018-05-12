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



//设备匹配出现的表格
$(function () {

    $('#TandDevice').on('shown.bs.modal', function () {
        if (cell_view != null && cell_view.model.get('type') != 'basic.Text') {
            document.getElementById("T_name").value = cell_view.model.toJSON().modelText;
            // 获取当前图元匹配的设备名称...
            var objcd = cell_view.model.toJSON().id
            $.ajax({
                type: 'post',
                url: url + 'matchOrNot',
                data: {
                    OBJ_CD: objcd.substring(0, 8) + objcd.substring(9, 13) + objcd.substring(14, 18) + objcd.substring(19, 23) + objcd.substring(24, 36),
                },
                beforeSend: function () {
                },
                success: function (data) {
                    document.getElementById("TA_name").value = data;
                },
                error: function (errorMsg) {
                }
            });debugger
            $('#TandD_table').datagrid({
                width: 570,
                height: 349,
                url: url + 'getRealByType',
                method: 'post',
                singleSelect: true,
                collapsible: true, //按钮可折叠
                rownumbers: true, //行号
                pagination: true, //分页
                pageSize: 10,
                pageList: [10, 20, 30, 40, 50],
                pageNumber: 1,
                queryParams: {
                    PRJ_TYPE: cell_view.model.toJSON().modelType
                    //PRJ_TYPE:$('#devices').datagrid('getSelected').PRJ_TYPE
                }, //其余发送到服务器的参数
                //设置默认的排列
                //sortName:'PEL_NM',
                //sortOrder:'ASC',
                remoteSort: true, // true时服务器进行排序
                //multiSort:true, 多列排序,一般设置为false

                fitColumns: true, //各列宽度自适应
                toolbar: '#TandD_tb',
                columns: [
                    [{
                        field: 'DEVICE_NM',
                        title: '设备名称',
                        width: 30,
                        align: 'center',
                        sortable: true //可排序
                    },
                        {
                            field: 'DEVICE_CD',
                            title: '设备编码',
                            width: 60, //DEVICE_CD
                            align: 'center'
                            //editor:{
                            //    type:'validatebox',
                            //    options:{
                            //        required:true,
                            //    },
                            //},
                        },
                    ]
                ],
                //双击获取设备属性
                onDblClickRow: function (rowIndex, rowData) {
                    $.ajax({
                        type: 'get',
                        url: url + 'getTdata',
                        data: {
                            DEVICE_CD: rowData.DEVICE_CD,
                            //PRJ_TYPE:rowData.PRJ_TYPE,
                            //PRJ_TYPE:$('#TandD_table').datagrid('getSelected').PRJ_TYPE,
                            PRJ_TYPE: cell_view.model.toJSON().modelType
                        },
                        beforeSend: function () {
                            $('#devicemanagement').datagrid('loading');
                        },
                        success: function (data) {
                            if (data) {
                                $('#devicemanagement').datagrid('loaded');
                                if (data.success) {
                                    $.messager.show({
                                        title: '提示',
                                        msg: data.data,
                                        height: '200px',
                                        style: {
                                            left: '',
                                            right: 0,
                                            top: '',
                                            bottom: 0
                                        }
                                    })
                                }
                                ;
                                if (!data.success) {
                                    $.messager.alert({
                                        title: '提示',
                                        msg: data.errormsg,
                                    })
                                }
                            }
                        },
                        error: function (errorMsg) {
                            $.messager.alert({
                                title: '提示',
                                msg: '获取失败！',
                            })
                        }
                    });
                },
            });
        } else {debugger 
            $('#TandD_table').datagrid('loadData', {total: 0, rows: []});
        }
    })
});

//查找
function SearchDEV() {
    $('#TandD_table').datagrid('load', {
        DEVICE_NM: $.trim($('#TandD_PEL_NM').val()),
        PRJ_TYPE: type[cell_view.model.toJSON().modelType]
    });
};

//确定匹配函数
function mapping() {

    //检测是否能够匹配//BySong
    if (modifyData.length > 0) {
        for (var i = 0; i < modifyData.length; i++) {
            if (modifyData[i].type == "addDevice" && modifyData[i].data.OBJ_CD == cell_view.model.toJSON().id) {
                $.messager.alert("操作提示", "这个图元尚未保存到数据库中，无法匹配");
                return;
            }
        }

    }


    if ($('#TandD_table').datagrid('getSelected')) {
        $('#TandD_table').datagrid('loading');
        var objcd = cell_view.model.toJSON().id
        $.ajax({
            type: 'post',
            url: url + 'updatehob',
            data: {
                OBJ_CD: objcd.substring(0, 8) + objcd.substring(9, 13) + objcd.substring(14, 18) + objcd.substring(19, 23) + objcd.substring(24, 36),
                DEVICE_CD: $('#TandD_table').datagrid('getSelected').DEVICE_CD,
                DEVICE_NM: $('#TandD_table').datagrid('getSelected').DEVICE_NM
            },
            beforeSend: function () {
            },
            success: function (data) {
                //匹配成功则不能添加属性
                document.getElementById("inserT").disabled = "true";
                document.getElementById("modifyT").disabled = undefined;
                if (data) {
                    $('#TandD_table').datagrid('loaded');
                    if (data.success) {
                        $.messager.show({
                            title: '提示',
                            msg: '匹配成功'

                        });
                        // 需添加代码刷新表格
                        var cellId = cell_view.model.toJSON().id; //图元id
                        var type = cell_view.model.toJSON().modelType; //图元类型
                        var sendData = {
                            PRJ_TYPE: type,
                            OBJ_CD: cellId.substring(0, 8) + cellId.substring(9, 13) + cellId.substring(14, 18) + cellId.substring(19, 23) + cellId.substring(24, 36)
                        };
                        $.ajax({
                            type: 'post',
                            url: url + 'matchOrNot',
                            data: {
                                OBJ_CD: cellId.substring(0, 8) + cellId.substring(9, 13) + cellId.substring(14, 18) + cellId.substring(19, 23) + cellId.substring(24, 36),
                            },
                            beforeSend: function () {
                            },
                            success: function (data) {
                                document.getElementById("valueT").disabled = "true";
                                $.ajax({
                                    type: 'post',
                                    url: url + 'getRealdata',
                                    data: sendData,
                                    beforeSend: function () {
                                    },
                                    success: function (data) {
                                        Remove();

                                        var tagElements = data.modify;
                                        var form = document.getElementById("property");
                                        var propertyNew = cell_view.model.toJSON().property;

                                        for (var i = 0; i < data.modify.length; i++) {
                                            if (data.modify[i].unit) {
                                                //动态加载设备真实属性
                                                $("#property").append('<div class="input-group">' +
                                                    '<label class="input-group-addon" for="property_data' + i + '" style="width: 5%">' + data.modify[i].name + '</label>' +
                                                    '<input name="' + data.modify[i].Ename + '"type="text" class="form-control" id="property_data' + i + '" placeholder="' + data.modify[i].value + '" disabled="true">' +
                                                    '<span class="input-group-addon" style="width: 5%">' + data.modify[i].unit + '</span>' +
                                                    '</div>');
                                            }
                                            if (!data.modify[i].unit) {
                                                $("#property").append('<div class="input-group">' +
                                                    '<label class="input-group-addon" for="property_data' + i + '"style="width: 5%">' + data.modify[i].name + '</label>' +
                                                    '<input name="' + data.modify[i].Ename + '" type="text" class="form-control" id="property_data' + i + '" placeholder="' + data.modify[i].value + '" disabled="true">' +
                                                    '<span class="input-group-addon" style="width: 5%"></span>' +
                                                    '</div>');
                                            }
                                        }

                                        for (var i = 0; i < data.modifyLine.length; i++) {
                                            $("#property").append('<div class="input-group">' +
                                                '<label class="input-group-addon" for="property_line' + i + '" style="width: 5%">' + data.modifyLine[i].name + '</label>' +
                                                '<input type="text" class="form-control" id="property_line' + i + '" placeholder="' + data.modifyLine[i].Ename + '" disabled="true">' +
                                                '<span class="input-group-addon" style="width: 5%">' +
                                                '<button  type="button" data-toggle="modal" data-target="#onecomLine" onclick="getonlinedataline(' + i + ')">' +
                                                'Go!' +
                                                '</button>' +
                                                '</span>' +
                                                '</div>');
                                        }
                                        //保存在图元里面
                                        for (var j = 0; j < tagElements.length; j++) {

                                            if (propertyNew.modify[j] != undefined) {
                                                propertyNew.modify[j].value = tagElements[j].value;
                                            }
                                        }
                                        cell_view.model.prop('property', propertyNew);
                                    },
                                })
                            }
                        });
                    }


                    if (!data.success) {
                        $.messager.alert({
                            title: '提示',
                            msg: data.errormsg
                        });
                    }

                    document.getElementById("TA_name").value = $('#TandD_table').datagrid('getSelected').DEVICE_NM;
                    $('#devices').datagrid('reload');
                    selectobj();

                }
            },
            error: function (errorMsg) {
                $('#TandD_table').datagrid('loaded');

                $.messager.alert({
                    title: '提示',
                    msg: errorMsg.statusText,
                })
            }
        });
    }
};


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
$(document).ready(function () {

    username = sessionStorage.getItem("username", null);
    if (username == null) {
           alert("请重新登录");
        window.location = "aslogin.html";
    };
    $("#username").val(username);
    //登出
    logout = function () {
        id = sessionStorage.getItem("id");
        date = getNowFormatDate();
        json_data = {"id": id, "date": date};
        //移除session
        sessionStorage.removeItem("id");
        sessionStorage.removeItem("username");
        $.ajax({
            type: "POST",
            url: url + "logout",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(json_data),
            success: function (ret_data) {
                if (ret_data.msg == "failed_update_date") {
                    alert("更新日期失败");
                } else {
                    window.location = "aslogin.html";
                }
            },
            error: function () {
                alert("更新日期失败");
            }
        });
    };
    $("#btn_modify_password").click(function () {
        if ($("#password").val() != $("#confirm").val()) {

            $.messager.alert({
                title: '警告',
                msg: '两次输入密码不一样！！'
            });
            return;
        }
        ;
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
        json_data = {"id": id, "password": password, "pastpassword": pastpassword};
        $.ajax({
            type: "POST",
            url: url + "updatepassword",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(json_data),
            success: function (ret_data) {
            	var data = ret_data.msg;
                if (data == "old_error") {
                    $.messager.alert({
                        title: '警告',
                        msg: '旧密码错误，请重试！'
                    });
                    return;
                } else if (data == "failed_modify_password") {
                        msg: '密码修改失败，请重试！'
                    $.messager.alert({
                        title: '警告',
                    });
                } else {
                    $('#user-management').modal('toggle');
                    $.messager.show({
                        title: '提示',
                        msg: '密码修改成功。'
                    });
                }
            },
            error: function () {
                $.messager.alert({
                    title: '警告',
                    msg: '密码修改失败，请重试！'
                });
            }
        });

    })

});




