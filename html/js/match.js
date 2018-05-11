$('#TandD_table').bootstrapTable({
	ajax : function (request) {  
	 var id = document.getElementById('T_id').value;
     var DEVICE_TYPE = graph.getCell(type);
     console.log(DEVICE_TYPE);
        $.ajax({  
            type : "GET",  
            url : 
            contentType: "application/json;charset=utf-8",  
            dataType:"jsonp",  
            data:'',  
            jsonp:'callback',  
            success : function (msg) {            
                request.success({  
                    row : msg  
                });  
                $('#TandD_table').bootstrapTable('load', msg);  
            },  
            error:function(){  
                alert("错误");  
            }  
        });  
    },

	striped: true, //是否显示行间隔色
	cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
	pagination: true, //是否显示分页（*）
	sidePagination: "client", //分页方式：client客户端分页，server服务端分页（*）
	pageNumber: 1, //初始化加载第一页，默认第一页
	pageSize: 10, //每页的记录行数（*）
	strictSearch: false,
	showColumns: false, //是否显示所有的列
	showRefresh: false, //是否显示刷新按钮
	showPaginationSwitch: false,
	minimumCountColumns: 1, //最少允许的列数
	clickToSelect: true, //是否启用点击选中行
	showToggle: false, //是否显示详细视图和列表视图的切换按钮
	cardView: false, //设置为 true将显示card视图
	contextMenu: '#context-menu',
	idField: "DEVICE_CODE", //指定主键列
	uniqueId: "DEVICE_CODE",
	columns: [{
			checkbox: true
		}, {
			field: 'DEVICE_CODE',
			title: '设备ID',
			visible: false
		}, {
			field: 'DEVICE_NAME',
			title: '设备名称',
			align: 'center',
		},
		{
			field: 'update_TIME',
			title: '上传时间',
			align: 'center',
		},
	],
});