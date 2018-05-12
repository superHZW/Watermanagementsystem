	$('#TandD_table').bootstrapTable({
			url: url + 'fetDev', //请求后台的URL（*）
			method: 'get', //请求方式（*）
			toolbar: '#toolbarProject', //工具按钮用哪个容器
			striped: true, //是否显示行间隔色
			cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
			pagination: true, //是否显示分页（*）
			sortable: true, //是否启用排序
			//sortName: 'update_TIME',
			//sortOrder: "desc", //排序方式
			//	queryParams: oTableInit.queryParams, //传递参数（*）
			sidePagination: "client", //分页方式：client客户端分页，server服务端分页（*）
			pageNumber: 1, //初始化加载第一页，默认第一页
			pageSize: 10, //每页的记录行数（*）
			pageList: [10, 25, 50, 100], //可供选择的每页的行数（*）
			search: true, //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
			strictSearch: false,
			showColumns: true, //是否显示所有的列
			showRefresh: true, //是否显示刷新按钮
			showPaginationSwitch: true,
			minimumCountColumns: 1, //最少允许的列数
			clickToSelect: true, //是否启用点击选中行
			//height: 500, //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
			uniqueId: "deviceCode", //每一行的唯一标识，一般为主键列
			showToggle: true, //是否显示详细视图和列表视图的切换按钮
			cardView: false, //设置为 true将显示card视图
			//	detailView: true, //设置为 true 可以显示详细页面模式。
			detailFormatter: function(index, row) { //格式化详细页面模式的视图。
				return '缩略图';
			},
			contextMenu: '#context-menu',
			idField: "deviceCode", //指定主键列
			uniqueId: "deviceCode",
			columns: [
				{
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
				},
			],


		});
