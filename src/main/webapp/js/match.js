var mycell = null;
function mapTableinit(cell) {
	mycell = cell;
	$("#match-select").on('click', function() {
		if (mycell.isElement() && mycell.get('type') != 'basic.Text') {
			document.getElementById('T_name').value = mycell.get("modelType");
			document.getElementById('TA_name').value = mycell.get("DEVICE_NAME");
		}
		var celltype = mycell.get('type');
		$.ajax({
			url: url + "fetDev",
			type: 'post',
			async: true,
			contentType: 'application/json;charset=utf-8', // 这句不加出现415错误:Unsupported Media Type
			data: JSON.stringify({
				devType: celltype,
			}), // 以json字符串方式传递
			//				data:{ PRJ_NM: value				},
			dataType: 'json',
			success: function(data) {
				$('#TandD_table').bootstrapTable('load', data);
				// console.log(data);
			},
			error: function(xhr, status, error) {
				$.messager.show({
					title: '提示',
					msg: '<font color="green">加载匹配对象失败!</font>'
				})
			}
		});
	});

	$("#mapYes").on('click', function() {
		var selects = $('#TandD_table').bootstrapTable('getSelections')[0];
		setattrs(selects, mycell);
		$('#TandD_table').bootstrapTable('refresh');
	});

	$('#TandD_table').bootstrapTable({
		striped: true, //是否显示行间隔色
		cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
		pagination: false, //是否显示分页（*）
		sortable: true, //是否启用排序
		//sortName: 'update_TIME',
		//sortOrder: "desc", //排序方式
		//	queryParams: oTableInit.queryParams, //传递参数（*）
		sidePagination: "client", //分页方式：client客户端分页，server服务端分页（*）
		pageNumber: 1, //初始化加载第一页，默认第一页
		pageSize: 10, //每页的记录行数（*）
		pageList: [10, 25, 50, 100], //可供选择的每页的行数（*）
		search: false, //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
		strictSearch: false,
		showColumns: false, //是否显示所有的列
		showRefresh: false, //是否显示刷新按钮
		showPaginationSwitch: false,
		singleSelect: true,
		minimumCountColumns: 1, //最少允许的列数
		clickToSelect: true, //是否启用点击选中行
		//height: 500, //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
		uniqueId: "deviceCode", //每一行的唯一标识，一般为主键列
		showToggle: false, //是否显示详细视图和列表视图的切换按钮
		cardView: false, //设置为 true将显示card视图

		contextMenu: '#context-menu',
		idField: "deviceCode", //指定主键列
		uniqueId: "deviceCode",
		columns: [{
			checkbox: true
		}, {
			field: 'deviceCode',
			title: '设备ID',
			visible: false
		}, {
			field: 'deviceName',
			title: '设备名称',
			sortable: true,
			align: 'center',
			editable: true,
		}, ],
	});
}

function setattrs(data, cell) {
	var celltype = cell.get('type');
	if (celltype == 'devs.MyInsump') {
	  cell.set('DEVICE_NAME', data['deviceName']);
      cell.set('LGTD', data['lgtd']);
	  cell.set('LTTD', data['lttd']);
	  cell.set('DESIGN_Q', data['designQ']);
	  cell.set('INTAKESUMP_LEVEL', data['intakesumpLevel']);
	  cell.set('PIPE_SIZE', data['pipeSize']);
	  cell.set('PIPE_COUNT', data['pipeCount']);
	  cell.set('DESIGN_PRESSURE', data['designPressure']);
	  cell.set('SECTION_IN', data['sectionIn']);
	  cell.set('WATER_HEIGHT', data['waterHeight']);
	  cell.set('NOTE', data['note']);
	} 
	else if (celltype == 'devs.MyOutpool') {
	  cell.set('DEVICE_NAME', data['deviceName']);
      cell.set('LGTD', data['lgtd']);
	  cell.set('LTTD', data['lttd']);
	  cell.set('DESIGN_Q', data['designQ']);
	  cell.set('OUTPOOL_LEVEL', data['outpoolLevel']);
	  cell.set('PIPE_SIZE', data['pipeSize']);
	  cell.set('PIPE_COUNT', data['pipeCount']);
	  cell.set('SECTION_IN', data['sectionIn']);
	  cell.set('WATER_HEIGHT', data['waterHeight']);
	  cell.set('NOTE', data['note']);
	} 
	else if (celltype == 'devs.Mypipe') {
	  cell.set('DEVICE_NAME', data['deviceName']);
      cell.set('BEGIN_STAKE_MARK', data['beginStakeMark']);
	  cell.set('END_STAKE_MARK', data['endStakeMark']);
	  cell.set('IN_HIGHT', data['inHight']);
	  cell.set('OUT_HIGHT', data['outHight']);
	  cell.set('PIPE_MATE', data['pipeMate']);
	  cell.set('EQUIMENT_LENGTH', data['equimentLength']);
	  cell.set('SLOPE', data['slope']);
	  cell.set('SHAPE', data['shape']);
	  cell.set('WATER_POWER', data['waterPower']);
	  cell.set('ROUGHNESS', data['roughness']);
      cell.set('YCXS', data['ycxs']);
	  cell.set('YCSS', data['ycss']);
	  cell.set('TJTXML', data['tjtxml']);
	  cell.set('INI_Q', data['iniQ']);
	  cell.set('RESULT_Q', data['resultQ']);
	  cell.set('DESIGN_PRESSURE', data['designPressure']);
	  cell.set('SCBS', data['scbs']);
	  cell.set('DESIGN_V', data['designV']);
	  cell.set('PIPE_COUNT', data['pipeCount']);
	  cell.set('INSIDE_P', data['insideP']);
      cell.set('PIPE_INSIDE_R', data['pipeInsideR']);
	  cell.set('PIPE_THICK', data['pipeThick']);
	  cell.set('CYDJ', data['cydj']);
	  cell.set('QHYL', data['qhyl']);
	  cell.set('B', data['b']);
	  cell.set('RL', data['r']);
	  cell.set('NOTE', data['note']);
	} 
	else {
	  cell.set('DEVICE_NAME', data['deviceName']);
	  cell.set('VAV_TYPE', data['outHight']);
	  cell.set('IS_OPERATE', data['isOperate']);
	  cell.set('STAKE_MARK', data['stakeMark']);
	  cell.set('VAV_WORK', data['vavWork']);
	  cell.set('VAV_SEC_IN', data['vavSecIn']);
	  cell.set('LGTD', data['lgtd']);
	  cell.set('LTTD', data['lttd']);
	  cell.set('VAV_SIZE', data['vavSize']);
      cell.set('PRESSURE_LEVEL', data['pressureLevel']);
	  cell.set('START_CONDI', data['startCondi']);
	  cell.set('MAX_DELPRE_START', data['maxDelpreStart']);
	  cell.set('USER_TYPE', data['userType']);
	  cell.set('INSTALL_HEIGHT', data['installHeight']);
	  cell.set('INI_OPEN_LEVEL', data['iniOpenLevel']);
	  cell.set('Q', data['q']);
	  cell.set('DESIGN_PRESSURE', data['designPressure']);
	  cell.set('VAV_OTHER_SIZE', data['vavOtherSize']);
	  cell.set('INI_OPENLEVEL_MIN', data['iniOpenlevelMin']);
      cell.set('PRESSURE_WORK', data['pressureWork']);
	  cell.set('PREW_MAX_DEL', data['prewMaxDel']);
	  cell.set('NVAV_COUNT', data['nvavCount']);
	  cell.set('K_ALL_OPEN', data['kAllOpen']);
	  cell.set('VAV_SIDE_S', data['vavSideS']);
	  cell.set('NOTE', data['note']);
	}
	$('#TandDevice').modal('hide');
}