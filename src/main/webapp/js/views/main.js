var App = window.App || {};
var modifyData = [];
var modifyTopology = []; //由于 ctrl+z 拓扑回退问题的逆操作不能获取targetCD，所以记录增加的拓扑
var newkey = "";
var objType = {
    "culvert": 1, "pipe": 2, "valve_b": 3, "valve_f": 4, "valve_n": 5, "valve_o": 6,
    "valve_a": 7, "was_p": 8, "was_c": 9, "surgetank": 10, "wds": 11, "wiust": 12, "overflow": 13,
    "bleeder": 14, "insump": 15, "outpool": 16, "coffer": 17, "mhprrp": 18, "hydturbine": 19,
    "piezometer": 20, "flow": 21, "node": 22, "ctwell": 23, "elbow": 24
};
//------------------从后台数据库获取设备属性值 函数封装------------------------
function getOnlineDate(cellId, type) {
    this.tagElements = null;
    this.form = null;
    this.propertyNew = null;
    var self =this ;
    var sendData = {
        PRJ_TYPE: type,
        OBJ_CD: cellId.substring(0, 8) + cellId.substring(9, 13) + cellId.substring(14, 18) + cellId.substring(19, 23) + cellId.substring(24, 36),
    };
    $.ajax({
        type: 'post',
        url: url + 'matchOrNot',
        async: false,
        data: {
            OBJ_CD: cellId.substring(0, 8) + cellId.substring(9, 13) + cellId.substring(14, 18) + cellId.substring(19, 23) + cellId.substring(24, 36),
        },
        success: function (data) {
            document.getElementById("valueT").disabled = "true";
            $.ajax({
                type: 'post',
                url: url + 'getRealdata',
                async: false,
                data: sendData,
                beforeSend: function () {
                },
                success: function (data) {
                    Remove();
                    self.tagElements = data.modify;
                    self.form = document.getElementById("property");
                    self.propertyNew = cell_view.model.toJSON().property;
                    for (var i = 0; i < data.modify.length; i++) {
                        if (data.modify[i].unit) {
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
                }
            })
        }
    });
};

(function(_, joint) {

    'use strict';

    App.MainView = joint.mvc.View.extend({

        className: 'app',

        events: {
            'focus input[type="range"]': 'removeTargetFocus',
            'mousedown': 'removeFocus',
            'touchstart': 'removeFocus'
        },

        removeTargetFocus: function(evt) {
            evt.target.blur();
        },

        removeFocus: function() {
            document.activeElement.blur();
            window.getSelection().removeAllRanges();
        },

        init: function() {

            this.initializePaper();
            this.initializeStencil();
            this.initializeSelection();
            this.initializeHaloAndInspector();
            this.initializeNavigator();
            this.initializeToolbar();
            this.initializeKeyboardShortcuts();
            this.initializeTooltips();
            this.initializeInlineTextEditor(); //文字编辑
            this.menu();
        },

        // Create a graph, paper and wrap the paper in a PaperScroller.
        initializePaper: function() {

            var graph = this.graph = new joint.dia.Graph;

            // graph.on('add', function(cell, collection, opt) {
            //     if (opt.stencil) this.createInspector(cell);
            // }, this);

            this.commandManager = new joint.dia.CommandManager({
                graph: graph
            });

            var paper = this.paper = new joint.dia.Paper({
                width: 1000,
                height: 1000,
                gridSize: 10,
                drawGrid: true,
                model: graph,
                defaultLink: new joint.dia.Link({ //设置线的风格
                    router: {
                        name: 'manhattan' //折线
                    },
                    connector: {
                        name: 'rounded'
                    }, //折线部分有一定弧度
                    toolMarkup: [
                        '<g class="link-tool">',
                        '<g class="tool-remove" event="remove">',
                        '<circle r="11" />',
                        '<path transform="scale(.8) translate(-16, -16)" d="M24.778,21.419 19.276,15.917 24.777,10.415 21.949,7.585 16.447,13.087 10.945,7.585 8.117,10.415 13.618,15.917 8.116,21.419 10.946,24.248 16.447,18.746 21.948,24.248z" />',
                        '<title>Remove link.</title>',
                        '</g>',
                        '</g>'
                    ].join('')
                }),
                linkPinning: false, //限制线条从出发必须连接
                snapLinks: { //连线捕捉
                    radius: 20
                },
                interactive: { //线条不可折叠
                    vertexAdd: false
                },
                validateMagnet: function(cellView, magnet) {
                    // Prevent links from ports that already have a link
                    var port = magnet.getAttribute('port');
                    var links = graph.getConnectedLinks(cellView.model, {
                        outbound: true
                    });
                    var portLinks = _.filter(links, function(o) {
                        return o.get('source').port == port;
                    });
                    if (portLinks.length > 0) return false;
                    // Note that this is the default behaviour. Just showing it here for reference.
                    // Disable linking interaction for magnets marked as passive (see below `.inPorts circle`).
                    return magnet.getAttribute('magnet') !== 'passive';
                },
            });

            paper.on('blank:mousewheel', _.partial(this.onMousewheel, null), this);
            paper.on('cell:mousewheel', this.onMousewheel, this);

            this.snaplines = new joint.ui.Snaplines({
                theme: 'material',
                paper: paper,
                distance: 3
            });

            var paperScroller = this.paperScroller = new joint.ui.PaperScroller({
                paper: paper,
                autoResizePaper: true,
                cursor: 'grab'
            });

            this.$('.paper-container').append(paperScroller.el);
            
            paperScroller.render().center();
            $('.paper-container').hide();

            
        },

        // Create and populate stencil.
        initializeStencil: function() {

            var stencil = this.stencil = new joint.ui.Stencil({
                paper: this.paperScroller,
                snaplines: this.snaplines,
                scaleClones: true,
                // width: 140,

                groups: App.config.stencil.groups,
                dropAnimation: true,
                groupsToggleButtons: true,
                search: {
                    '*': ['type', 'attrs/text/text', 'attrs/.label/text'],
                },
                label: "图元选择框",
                // Use default Grid Layout
                layout: {
                    rowHeight: 70,
                    resizeToFit: false, //显示定义时的大小
                },

                paperPadding: 20,

                // Remove tooltip definition from clone
                dragStartClone: function(cell) {
                    return cell.clone().removeAttr('./data-tooltip');
                }
            });

            this.$('.stencil-container').append(stencil.el);
            stencil.render().load(App.config.stencil.shapes);
        },

        initializeKeyboardShortcuts: function() {

            this.keyboard = new joint.ui.Keyboard();
            this.keyboard.on({

                'ctrl+c': function() {
                    // Copy all selected elements and their associated links.
                    this.clipboard.copyElements(this.selection.collection, this.graph);
                },

                'ctrl+v': function() {

                    var pastedCells = this.clipboard.pasteCells(this.graph, {
                        translate: {
                            dx: 20,
                            dy: 20
                        },
                        useLocalStorage: true
                    });

                    var elements = _.filter(pastedCells, function(cell) {
                        return cell.isElement();
                    });

                    // Make sure pasted elements get selected immediately. This makes the UX better as
                    // the user can immediately manipulate the pasted elements.
                    this.selection.collection.reset(elements);
                },

                'ctrl+x shift+delete': function() {
                    this.clipboard.cutElements(this.selection.collection, this.graph);
                },

                'delete backspace': function(evt) {
                    evt.preventDefault();
                    this.graph.removeCells(this.selection.collection.toArray());
                },

                'ctrl+z': function() {
                    this.commandManager.undo();
                    this.selection.cancelSelection();
                },

                'ctrl+y': function() {
                    this.commandManager.redo();
                    this.selection.cancelSelection();
                },

                'ctrl+a': function() {
                    this.selection.collection.reset(this.graph.getElements());
                },

                'ctrl+plus': function(evt) {
                    evt.preventDefault();
                    this.paperScroller.zoom(0.2, {
                        max: 5,
                        grid: 0.2
                    });
                },

                'ctrl+minus': function(evt) {
                    evt.preventDefault();
                    this.paperScroller.zoom(-0.2, {
                        min: 0.2,
                        grid: 0.2
                    });
                },

                'keydown:shift': function(evt) {
                    this.paperScroller.setCursor('crosshair');
                },

                'keyup:shift': function() {
                    this.paperScroller.setCursor('grab');
                }

            }, this);
        },

        initializeSelection: function() {

            this.clipboard = new joint.ui.Clipboard();
            this.selection = new joint.ui.Selection({
                paper: this.paper,
                handles: App.config.selection.handles
            });

            // Initiate selecting when the user grabs the blank area of the paper while the Shift key is pressed.
            // Otherwise, initiate paper pan.
            this.paper.on('blank:pointerdown', function(evt, x, y) {

                if (this.keyboard.isActive('shift', evt)) {
                    this.selection.startSelecting(evt);
                } else {
                    this.selection.cancelSelection();
                    this.paperScroller.startPanning(evt, x, y);
                }

            }, this);

            this.paper.on('element:pointerdown', function(elementView, evt) {

                // Select an element if CTRL/Meta key is pressed while the element is clicked.
                if (this.keyboard.isActive('ctrl meta', evt)) {
                    this.selection.collection.add(elementView.model);
                }

            }, this);

            this.selection.on('selection-box:pointerdown', function(elementView, evt) {

                // Unselect an element if the CTRL/Meta key is pressed while a selected element is clicked.
                if (this.keyboard.isActive('ctrl meta', evt)) {
                    this.selection.collection.remove(elementView.model);
                }

            }, this);
        },
        
        createInspector: function(cell) {

            return joint.ui.Inspector.create('.inspector-container', _.extend({
                cell: cell
            }, App.config.inspector[cell.get('type')]));
        },

        initializeHaloAndInspector: function() {

            this.paper.on('element:pointerup link:options', function(cellView) {

                var cell = cellView.model;

                if (cell.isElement() && cell.get('type') != 'basic.Text') {
                    document.getElementById('T_name').value = cell.get("modelType");
                    document.getElementById('T_id').value = cell.id;
                    document.getElementById('TA_name').value = cell.get("DEVICE_NAME");
                }

                if (!this.selection.collection.contains(cell)) {

                    if (cell.isElement()) {

                        new joint.ui.FreeTransform({
                            cellView: cellView,
                            allowRotation: false,
                            preserveAspectRatio: !!cell.get('preserveAspectRatio'),
                            allowOrthogonalResize: cell.get('allowOrthogonalResize') !== false
                        }).render();

                        new joint.ui.Halo({
                            cellView: cellView,
                            handles: App.config.halo.handles
                        }).render();

                        this.selection.collection.reset([]);
                        this.selection.collection.add(cell, {
                            silent: true
                        });
                    }

                    this.createInspector(cell);
                }

            }, this);
        },

        
        
        
        initializeNavigator: function() {

            var navigator = this.navigator = new joint.ui.Navigator({
                width: 240,
                height: 115,
                paperScroller: this.paperScroller,
                zoom: false
            });

            this.$('.navigator-container').append(navigator.el);
            navigator.render();
        },

        initializeToolbar: function() {

            var toolbar = this.toolbar = new joint.ui.Toolbar({
                groups: App.config.toolbar.groups,
                tools: App.config.toolbar.tools,
                references: {
                    paperScroller: this.paperScroller,
                    commandManager: this.commandManager
                }
            });

            toolbar.on({
                'to-front:pointerclick': _.bind(this.selection.collection.invoke, this.selection.collection, 'toFront'),
                'to-back:pointerclick': _.bind(this.selection.collection.invoke, this.selection.collection, 'toBack'),
                'layout:pointerclick': _.bind(this.layoutDirectedGraph, this),
                'snapline:change': _.bind(this.changeSnapLines, this),
                'clear:pointerclick': _.bind(this.graph.clear, this.graph),
                'print:pointerclick': _.bind(this.paper.print, this.paper),
                'grid-size:change': _.bind(this.paper.setGridSize, this.paper)
            });

            this.$('.toolbar-container').append(toolbar.el);
            toolbar.render();
        },

        changeSnapLines: function(checked) {

            if (checked) {
                this.snaplines.startListening();
                this.stencil.options.snaplines = this.snaplines;
            } else {
                this.snaplines.stopListening();
                this.stencil.options.snaplines = null;
            }
        },

        
        

        
        
        
    
        
        
        initializeTooltips: function() {

            new joint.ui.Tooltip({
                rootTarget: document.body,
                target: '[data-tooltip]',
                direction: 'auto',
                padding: 10
            });
        },

        //保存为json格式
        toJSON: function() {

            var windowFeatures = 'menubar=no,location=no,resizable=yes,scrollbars=yes,status=no';
            var windowName = _.uniqueId('json_output');
            var jsonWindow = window.open('', windowName, windowFeatures);

            var model = this.graph.toJSON().cells;
            var length = model.length;

            var modelJSON = '{"model":[';
            var linkJSON = '{"link":[';
            for (var i = 0; i < length; i++) {
                if (model[i].type == 'link') {

                    linkJSON += '{"source":"' + model[i].source.id + '","target":"' + model[i].target.id + '"},';
                } else {

                    //  modelJSON += '{"type":"' + model[i].source.id + '","target":"' + model[i].target.id + '"},';
                }

            }
            linkJSON = linkJSON.substr(0, linkJSON.length - 1) + ']}';
            modelJSON = modelJSON.substr(0, modelJSON.length - 1) + ']}';

        },

        //文字编辑
        initializeInlineTextEditor: function() {
            //双击鼠标时
            this.paper.on('cell:pointerdblclick', function(cellView, evt) {

                var editor = joint.ui.TextEditor.edit(evt.target, {
                    annotateUrls: true,
                    cellView: cellView,
                    annotationsProperty: 'attrs/text/annotations',
                    textProperty: 'attrs/text/text' //文字属性

                    //textProperty: cellView.model.isLink() ? 'labels/0/attrs/text/text' : 'attrs/text/text'
                });
                if (editor) {
                    editor.on('caret:change', updateToolbar); //改变文字时更新快捷小部件
                    editor.on('select:changed', updateToolbar); //更改对应小部件的时候变化文字
                }
            });

            //单击空白部分！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！当一个图元为选中状态时，完成文字编辑后单击空白，该图元还为选中状态或者是未选中状态？
            this.paper.on('blank:pointerdown', function(cellView, evt) {
                joint.ui.TextEditor.close();
            });

            //根据文字多少自动更新文本框大小
            this.graph.on({
                'change:attrs': _.bind(this.autosize, this)
            });
        },
        //根据文字自动调整图元大小
        autosize: function(element) {

            var view = this.paper.findViewByModel(element);
            view.unhighlight();
            var text = view.$('text')[0];

            var bbox = V(text).bbox(true);

            element.resize(bbox.width, bbox.height);
        },

        //加载例子
        loadExample: function (prj_ID) {
            var graph = this.graph;
            //alert(prj_ID);
            $.ajax({
                url: url + 'getGraph', //保存可二次编辑的json信息
                type: 'post',
            	async : true,
                contentType: 'application/json;charset=utf-8', // 这句不加出现415错误:Unsupported Media Type
                data: JSON.stringify({PRJ_CD: prj_ID}),
//				data:{ PRJ_NM: value				},
				dataType: 'json',  	
                success: function (data) {
                	newkey = data.newKey;
                	if (data.error == "none") {
                        modifyData = [];
                        modifyTopology = [];
                        graph.fromJSON(JSON.parse(data.graphData));
                    } else {
                        $.messager.alert("操作提示", "读取工程失败", data.error);
                    }
                    // if(data != null || data != undefined || data != '') {
                    //
                    //
                    // }
                },
                error: function (xhr, status, error) {

                }
            });

        },
        menu: function () {
            var graph = this.graph;
            var paperScroller = this.paperScroller;
            var paper = this.paper;

            var commandManager = new joint.dia.CommandManager({
                graph: graph
            });
            var loadtest;
            var modifyData = [];
            
            
            
            //保存菜单
            $('#save').on('click', function () {
                //----var windowFeatures = 'menubar=no,location=no,resizable=yes,scrollbars=yes,status=no';
                //----------保存当前时间----------
            	//alert(getPRJ_CD);
            if(getPRJ_CD!=-1&&getPRJ_CD!=null){
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
	                var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
	                    + " " + date.getHours() + seperator2 + date.getMinutes()
	                    + seperator2 + date.getSeconds();
	
	                var sendData = {
	                    PRJ_CD: getPRJ_CD,
	                    Graph: graph.toJSON(),
	                    modifyData: modifyData,
	                    //这里newKey是什么？？？？？？？？？？？？？？？
	                    "newKey": '0'
	                }
	
	                $.ajax({
	                    url: url + 'saveGraph', //保存可二次编辑的json信息
	                    type: 'post',
	    				async : true,
	                    contentType: 'application/json;charset=utf-8', // 这句不加出现415错误:Unsupported Media Type
	                    data: JSON.stringify(sendData),
	//    				data:{ PRJ_NM: value				},
	    				dataType: 'json',  	
	                    success: function (data) {
	                    	
	                        if (data.error == "none") {
	                        	
	                            modifyData = [];
	                            $('#devices').datagrid('reload');
	                            $.messager.show({
	                                title: '提示',
	                                msg: '工程保存成功！'
	                            })
	                            //这里有个 newKey = data.newKey！！！！！！！！！！！！！！！！
	                            //alert(data.newKey);
	                        } else {
	                            $.messager.show({
	                                title: '提示',
	                                msg: data.error
	                            })
	                        }
	                    },
	                    error: function (xhr, status, error) {
	                        $.messager.show({
	                            title: '提示',
	                            msg: error
	                        })
	                    }
	                });
	                
	            }else {
	            	
                    $.messager.show({
                        title: '提示',
                        msg:"<font color='orange'>请新建工程或编辑工程!</font>"
                    })
	            	
	            }
                
            
                
            });
            // //点击计算按钮时
            // $('#checkform').on('click', function () {
            //     var toJson = graph.toJSON().cells;

            //     var pipe = [], //管道
            //         culvert = [], //涵洞
            //         node = [], // 节点
            //         coffer = [], //
            //         ctwell = [], //
            //         elbow = [], //
            //         flow = [], //
            //         hydturbine = [], //
            //         insump = [], //
            //         mhprrp = [], //
            //         piezometer = [], //
            //         outpool = [], //
            //         overflow = [], //
            //         surgetank = [], //
            //         valve_a = [], //
            //         valve_b = [], //
            //         valve_f = [], //
            //         valve_n = [], //
            //         valve_o = [], //
            //         was_p = [], //
            //         was_c = [], //
            //         bleeder = [], //
            //         wds = [], //
            //         wiust = []; //

            //     if (document.getElementById('SIM_DATA_TYPE').value == 0) { //离线计算模式下
            //         for (var i = 0; i < toJson.length; i++) {
            //             var temp = {};
            //             temp['OBJ_CD'] = toJson[i].id;
            //             temp['property'] = {};
            //             for (var key in toJson[i].modify) {
            //                 temp['property'][key] = toJson[i].modify[key].value;
            //             }
            //             switch (toJson[i].modelType) {
            //                 case 'pipe':
            //                     pipe.push(temp);
            //                     break;
            //                 case 'culvert':
            //                     culvert.push(temp);
            //                     break;
            //                 case 'node':
            //                     node.push(temp);
            //                     break;
            //                 case 'coffer':
            //                     coffer.push(temp);
            //                     break;
            //                 case 'ctwell':
            //                     ctwell.push(temp);
            //                     break;
            //                 case 'elbow':
            //                     elbow.push(temp);
            //                     break;
            //                 case 'flow':
            //                     flow.push(temp);
            //                     break;
            //                 case 'hydturbine':
            //                     hydturbine.push(temp);
            //                     break;
            //                 case 'insump':
            //                     insump.push(temp);
            //                     break;
            //                 case 'mhprrp':
            //                     mhprrps.push(temp);
            //                     break;
            //                 case 'piezometer':
            //                     piezometer.push(temp);
            //                     break;
            //                 case 'outpool':
            //                     outpool.push(temp);
            //                     break;
            //                 case 'overflow':
            //                     overflow.push(temp);
            //                     break;
            //                 case 'surgetank':
            //                     surgetank.push(temp);
            //                     break;
            //                 case 'valve_a':
            //                     valve_a.push(temp);
            //                     break;
            //                 case 'valve_b':
            //                     valve_b.push(temp);
            //                     break;
            //                 case 'valve_f':
            //                     valve_f.push(temp);
            //                     break;
            //                 case 'valve_n':
            //                     valve_n.push(temp);
            //                     break;
            //                 case 'was_p':
            //                     was_p.push(temp);
            //                     break;
            //                 case 'was_c':
            //                     was_c.push(temp);
            //                     break;
            //                 case 'bleeder':
            //                     bleeder.push(temp);
            //                     break;
            //                 case 'wds':
            //                     wds.push(temp);
            //                     break;
            //                 case 'wiust':
            //                     wiust.push(temp);
            //                     break;
            //             }
            //         }
            //     }
            //     var send = {};
            //     send['pipe'] = pipe;
            //     send['culvert'] = culvert;
            //     send['node'] = node;
            //     send['coffer'] = coffer;
            //     send['ctwell'] = ctwell;
            //     send['elbow'] = elbow;
            //     send['hydturbine'] = hydturbine;
            //     send['insump'] = insump;
            //     send['mhprrp'] = mhprrp;
            //     send['piezometer'] = piezometer;
            //     send['outpool'] = outpool;
            //     send['overflow'] = overflow;
            //     send['surgetank'] = surgetank;
            //     send['valve_a'] = valve_a;
            //     send['valve_b'] = valve_b;
            //     send['valve_f'] = valve_f;
            //     send['valve_n'] = valve_n;
            //     send['valve_o'] = valve_o;
            //     send['was_p'] = was_p;
            //     send['was_c'] = was_c;
            //     send['bleeder'] = bleeder;
            //     send['wds'] = wds;
            //     send['wiust'] = wiust;

            //     var condition = {};
            //     condition['SIM_CAL_TYPE'] = document.getElementById('SIM_CAL_TYPE').value; // 水力模式，长度为一个字符，约束（0:恒定,1:非恒定）
            //     condition['SIM_DATA_TYPE'] = document.getElementById('SIM_DATA_TYPE').value; // 数据来源，长度为一个字符，约束（0:离线,1:在线）
            //     condition['SIM_TIME_LEN'] = document.getElementById('SIM_TIME_LEN').value; // 仿真总时长，保留小数点后3位
            //     condition['SIM_TIME_STEP'] = document.getElementById('SIM_TIME_STEP').value; // 仿真时间步长,保留小数点后3位
            //     condition['SIM_START_STR'] = document.getElementById('SIM_START_STR').value; // 存储开始时间,保留小数点后3位
            //     condition['SIM_STEP_NUM'] = document.getElementById('SIM_STEP_NUM').value; // 存储步长数

            //     send['condition'] = condition;

            //     //              $.ajax({
            //     //                  url: '', //计算时的url
            //     //                  type: 'GET',
            //     //                  data: send,
            //     //                  success: function(data) {
            //     //
            //     //                  },
            //     //                  error: function(xhr, status, error) {
            //     //
            //     //                  }
            //     //              });
            // });
        },

        otherMenu: function () {
            //属性，结果，仿真参数
            $("#data-type-one").bind({change: this.property}); //绑定下面的函数
            //在线离线按钮
            $("#dataonline").bind({click: this.property}); //绑定下面的函数
            //----------------在线下，进行添加属性------------------
            $('#inserT').on('click', function (evt) {
                if (document.getElementById('data-type-two').checked) {
                    //在线下能添加属性
                    var form = document.getElementById("property");
                    var tagElements = form.getElementsByTagName('input');
                    //form.getElementsByTagName('input')
                    var propertyNew = cell_view.model.toJSON().property;
                    var objcd = cell_view.model.toJSON().id;         // 获取设备ID
                    var type = getPRJ_TYPE;
                    var itype = objType[type];
                    for (var j = 0; j < tagElements.length; j++) {
                        var value = tagElements[j].value;
                        if (propertyNew.modify[j] != undefined) {
                            propertyNew.modify[j].value = value;
                        }
                    }
                    cell_view.model.prop('property', propertyNew);
                    var mess = JSON.stringify(propertyNew.modify);
                    //              console.log(mess);
                    $.ajax({
                        type: 'post',
                        url: url + 'Tnsert',
                        data: {
                            OBJ_CD: objcd,              //图元ID
                            PRJ_TYPE: itype,            //图元类型
                            message: mess       //设备属性
                        },
                        success: function (data) {
                            if (data.error === undefined) {
                                $.messager.show({
                                    width: 400,
                                    height: 200,
                                    title: '提示',
                                    msg: '添加属性成功',
                                })
                            } else {
                                $.messager.show({
                                    width: 400,
                                    height: 200,
                                    title: '提示',
                                    msg: '添加属性失败' + data.error.toString()
                                })
                            }
                        },
                        error: function (data) {

                            $.messager.show({
                                title: '提示',
                                msg: '添加属性失败' + data
                            })
                        }
                    })
                }
                //true为在线,false为离线
                else if (!document.getElementById('data-type-two').checked) {
                    //离线下不可以添加属性
                    $.messager.show({
                        title: '提示',
                        msg: '不能添加属性'
                    })
                }
            });

            // --------- 保存属性！！分在线或者离线情况下的提交属性（注意加判断）
            $('#valueT').on('click', function (evt) {
                var form = document.getElementById("property");
                var tagElements = form.getElementsByTagName('input');
                var propertyNew = cell_view.model.toJSON().property;
                for (var j = 0; j < tagElements.length; j++) {
                    var value = tagElements[j].value; //输入的值
                    if (propertyNew.modify[j] != undefined) {
                        propertyNew.modify[j].value = value;
                    }
                }
                cell_view.model.prop('property', propertyNew);
                //---------------在线提交修改数据-------------------
                if (document.getElementById('data-type-two').checked) {

                    var objcd = cell_view.model.toJSON().id;         // 获取设备ID
                    var type = getPRJ_TYPE;
                    var itype = objType[type];
                    var mess = JSON.stringify(propertyNew.modify);
                    $.ajax({
                        type: 'post',
                        url: url + 'modifyT',
                        data: {
                            OBJ_CD: objcd,              //图元ID
                            PRJ_TYPE: itype,            //图元类型
                            message: mess       //设备属性
                        },
                        success: function (data) {
                            if (data.error === undefined) {
                                $.messager.show({
                                    width: 400,
                                    height: 200,
                                    title: '提示',
                                    msg: '成功保存修改属性',
                                })
                            } else {
                                $.messager.show({
                                    width: 400,
                                    height: 200,
                                    title: '提示',
                                    msg: '保存属性失败' + data.error.toString()
                                })

                            }
                            getOnlineDate(objcd, type);
                        },
                        error: function (data) {
                            $.messager.show({
                                title: '提示',
                                msg: '保存属性失败' + data
                            })
                        }
                    });
                    //alert('提交的为在线属性');
                }
                //---------------保存离线数据----------------
                if (!document.getElementById('data-type-two').checked) {
                    //alert('提交的为离线属性');
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
                    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                        + " " + date.getHours() + seperator2 + date.getMinutes()
                        + seperator2 + date.getSeconds();
                    var sendData = {
                        PRJ_CD: getPRJ_CD,
                        Graph: JSON.stringify(app.paper.model.toJSON()),
                        modifyData: JSON.stringify(modifyData),
                        "newKey": newkey
                    };
                    $.ajax({
                        url: url + 'saveGraph', //保存可二次编辑的json信息
                        async: true,
                        type: 'post',
                        data: JSON.stringify(sendData),
                        datatype:'json',
                        success: function (data) {
                            if (data.error == "none") {
                                modifyData = [];
                                $('#devices').datagrid('reload');
                                $.messager.show({
                                    title: '提示',
                                    msg: '记录保存成功！'
                                })
                                newkey = data.newKey;
                            } else {
                                $.messager.show({
                                    title: '提示',
                                    msg: data.error
                                })
                            }

                        },
                        error: function (xhr, status, error) {
                            $.messager.show({
                                title: '提示',
                                msg: error
                            })
                        }
                    })
                    Remove();
                    var outlinedata = cell_view.model.toJSON().property; //属性json
                    for (var i in outlinedata.modify) {
                        var unit = '';
                        if (outlinedata.modify[i].unit != undefined)
                            unit = outlinedata.modify[i].unit;
                        var value = '';
                        if (outlinedata.modify[i].value != undefined)
                            value = outlinedata.modify[i].value;
                        $("#property").append('<div class="input-group">' +
                            '<label class="input-group-addon" for="first" style="width: 5%">' + outlinedata.modify[i].name + '</label>' +
                            '<input type="text" class="form-control" id="first"  placeholder="' + value + '" disabled="true">' +
                            '<span class="input-group-addon" style="width: 5%">' + unit + '</span>' +
                            '</div>');
                    }
                    for (var i in outlinedata.modifyLine) {
                        $("#property").append('<div class="input-group">' +
                            '<label class="input-group-addon" for="property_line' + i + '" style="width: 5%">' + outlinedata.modifyLine[i].name + '</label>' +
                            '<input type="text" class="form-control" id="property_line' + i + '" placeholder="' + outlinedata.modifyLine[i].Ename + '" disabled="true">' +
                            '<span class="input-group-addon" style="width: 5%">' +
                            '<button  type="button" data-toggle="modal" data-target="#onecomLine" onclick="getoutlinedataline_Submit(' + i + ')">' +
                            'Go!' +
                            '</button>' +
                            '</span>' +
                            '</div>');
                    }
                    document.getElementById("resetT").disabled = true;
                }
                document.getElementById("valueT").disabled = true;
            });

            //--------------------------重置属性------------------------------------
            $("#resetT").on('click', function (evt) {
                var cellId = cell_view.model.toJSON().id; //图元id
                var type = cell_view.model.toJSON().modelType; //图元类型
                var sendData = {
                    PRJ_TYPE: type,
                    OBJ_CD: cellId.substring(0, 8) + cellId.substring(9, 13) + cellId.substring(14, 18) + cellId.substring(19, 23) + cellId.substring(24, 36)
                };
                if (!document.getElementById('data-type-two').checked) {
                    var obj =  new getOnlineDate(cellId,type);
                    var tagdate=obj.tagElements;
                    var propertyNew = cell_view.model.toJSON().property;
                    for (var j = 0; j < tagdate.length; j++) {
                        var value = tagdate[j].value; //输入的值
                        if (propertyNew.modify[j] != undefined) {
                            propertyNew.modify[j].value = value;
                        }
                    }
                    cell_view.model.prop('property', propertyNew);
                }
                document.getElementById("valueT").disabled = true;
                document.getElementById("resetT").disabled = true;
            });

            //----------------------------修改属性-------------------------
            $("#modifyT").on('click', function (evt) {
                document.getElementById("valueT").disabled = undefined;
                document.getElementById("inserT").disabled = true;
                if (document.getElementById('data-type-two').checked) {
                    Remove();
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
                        success: function (data) {
                            if (data) {
                                $.ajax({
                                    type: 'post',
                                    url: url + 'getRealdata',
                                    data: sendData,
                                    beforeSend: function () {
                                    },
                                    success: function (data) {
                                        Remove();
                                        for (var i = 0; i < data.modify.length; i++) {
                                            if (data.modify[i].unit) {
                                                $("#property").append('<div class="input-group">' +
                                                    '<label class="input-group-addon" for="property_data' + i + '" style="width: 5%">' + data.modify[i].name + '</label>' +
                                                    '<input name="' + data.modify[i].Ename + '" type="text" class="form-control" id="property_data' + i + '" value= "' + data.modify[i].value + '">' +
                                                    '<span class="input-group-addon" style="width: 5%">' + data.modify[i].unit + '</span>' +
                                                    '</div>');
                                            }
                                            if (!data.modify[i].unit) {
                                                if (data.modify[i].Ename == "KD" || data.modify[i].Ename == "Z" || data.modify[i].Ename == "MODEL_CD") {
                                                    $("#property").append('<div class="input-group">' +
                                                        '<label class="input-group-addon" for="property_data' + i + '"style="width: 5%">' + data.modify[i].name + '</label>' +
                                                        '<input name="' + data.modify[i].Ename + '" type="text" class="form-control" id="property_data' + i + '" value="' + data.modify[i].value + '" disabled="true">' +
                                                        '<span class="input-group-addon" style="width: 5%"></span>' +
                                                        '</div>');
                                                }
                                                else {
                                                    $("#property").append('<div class="input-group">' +
                                                        '<label class="input-group-addon" for="property_data' + i + '"style="width: 5%">' + data.modify[i].name + '</label>' +
                                                        '<input name="' + data.modify[i].Ename + '" type="text" class="form-control" id="property_data' + i + '" value="' + data.modify[i].value + '" >' +
                                                        '<span class="input-group-addon" style="width: 5%"></span>' +
                                                        '</div>');
                                                }
                                            }
                                        }
                                        for (var i = 0; i < data.modifyLine.length; i++) {
                                            $("#property").append('<div class="input-group">' +
                                                '<label class="input-group-addon" for="property_line' + i + '" style="width: 5%">' + data.modifyLine[i].name + '</label>' +
                                                '<input type="text" class="form-control" id="property_line' + i + '" placeholder="' + data.modifyLine[i].Ename + '" >' +
                                                '<span class="input-group-addon" style="width: 5%">' +
                                                '<button  type="button" data-toggle="modal" data-target="#onecomLine" onclick="getonlinedataline(' + i + ')">' +
                                                'Go!' +
                                                '</button>' +
                                                '</span>' +
                                                '</div>');
                                        }
                                    }
                                })
                            } //当前有匹配到一个设备
                        },
                        error: function (errorMsg) {
                            $.messager.alert({
                                title: '提示',
                                msg: '修改数据请求失败！',
                            })
                        }
                    });
                }

                if (!document.getElementById('data-type-two').checked) {
                    Remove();
                    document.getElementById("resetT").disabled = undefined;
                    var outlinedata = cell_view.model.toJSON().property; //属性json
                    var isNUllFlag = true;
                    for (var i = 0; i < outlinedata.modify.length; i++) {
                        if (outlinedata.modify[i].value != undefined) {
                            isNUllFlag = false;
                            break;
                        }
                    }
                    if (isNUllFlag) {
                        //在线获取数据
                        var cellId = cell_view.model.toJSON().id;
                        var type = cell_view.model.toJSON().modelType; //图元类型
                        var sendData = {
                            PRJ_TYPE: type,
                            OBJ_CD: cellId.substring(0, 8) + cellId.substring(9, 13) + cellId.substring(14, 18) + cellId.substring(19, 23) + cellId.substring(24, 36)
                        };
                        $.ajax({
                            type: 'post',
                            url: url + 'getRealdata',
                            data: sendData,
                            async: false,       //同步执行
                            success: function (data) {
                                outlinedata = data;
                                cell_view.model.prop('property', outlinedata);
                            }
                        });
                    }
                    for (var i in outlinedata.modify) {
                        var unit = '';
                        if (outlinedata.modify[i].unit != undefined)
                            unit = outlinedata.modify[i].unit;

                        var value = '';
                        if (outlinedata.modify[i].value != undefined)
                            value = outlinedata.modify[i].value;

                        $("#property").append('<div class="input-group">' +
                            '<label class="input-group-addon" for="first" style="width: 5%">' + outlinedata.modify[i].name + '</label>' +
                            '<input type="text" class="form-control" id="first" value="' + value + '">' +
                            '<span class="input-group-addon" style="width: 5%">' + unit + '</span>' +
                            '</div>');

                    }
                    for (var i in outlinedata.modifyLine) {
                        $("#property").append('<div class="input-group">' +
                            '<label class="input-group-addon" for="property_line' + i + '" style="width: 5%">' + outlinedata.modifyLine[i].name + '</label>' +
                            '<input type="text" class="form-control" id="property_line' + i + '" placeholder="' + outlinedata.modifyLine[i].Ename + '" disabled="true">' +
                            '<span class="input-group-addon" style="width: 5%">' +
                            '<button  type="button" data-toggle="modal" data-target="#onecomLine" onclick="getoutlinedataline_Submit(' + i + ')">' +
                            'Go!' +
                            '</button>' +
                            '</span>' +
                            '</div>');
                    }
                }
            });
        },

        //已选中图元时，转换在线离线时触发
        property: function () {
            if ($('#data-type-one').children('option:selected').val() == 0) {
                if (cell_view != null && cell_view.model.get('type') != 'basic.Text') {
                    if (document.getElementById('data-type-two').checked) { //在线模式下
                        Remove();
                        document.getElementById("hideee").disabled = undefined;
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
                                if (data) {
                                    document.getElementById("inserT").disabled = "true";
                                    document.getElementById("modifyT").disabled = undefined;
                                    $.ajax({
                                        type: 'post',
                                        url: url + 'getRealdata',
                                        data: sendData,
                                        beforeSend: function () {
                                        },
                                        success: function (data) {
                                            Remove();
                                            for (var i = 0; i < data.modify.length; i++) {
                                                if (data.modify[i].unit) {
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
                                        },
                                    })
                                } //当前有匹配到一个设备
                                if (!data) {
                                    document.getElementById("inserT").disabled = undefined;
                                    document.getElementById("modifyT").disabled = true;
                                    $.ajax({
                                        type: 'post',
                                        url: url + 'getRealdata',
                                        data: sendData,
                                        beforeSend: function () {
                                        },
                                        success: function (data) {
                                            Remove();
                                            for (var i = 0; i < data.modify.length; i++) {
                                                if (data.modify[i].unit) {
                                                    $("#property").append('<div class="input-group">' +
                                                        '<label class="input-group-addon" for="property_data' + i + '" style="width: 5%">' + data.modify[i].name + '</label>' +
                                                        '<input name="' + data.modify[i].Ename + '" type="text" class="form-control" id="property_data' + i + '">' +
                                                        '<span class="input-group-addon" style="width: 5%">' + data.modify[i].unit + '</span>' +
                                                        '</div>');
                                                }
                                                if (!data.modify[i].unit) {
                                                    $("#property").append('<div class="input-group">' +
                                                        '<label class="input-group-addon" for="property_data' + i + '"style="width: 5%">' + data.modify[i].name + '</label>' +
                                                        '<input name="' + data.modify[i].Ename + '" type="text" class="form-control" id="property_data' + i + '">' +
                                                        '<span class="input-group-addon" style="width: 5%"></span>' +
                                                        '</div>');
                                                }
                                            }

                                            for (var i = 0; i < data.modifyLine.length; i++) {
                                                $("#property").append('<div class="input-group">' +
                                                    '<label class="input-group-addon" for="property_line' + i + '" style="width: 5%">' + data.modifyLine[i].name + '</label>' +
                                                    '<input type="text" class="form-control" id="property_line' + i + '" placeholder="' + data.modifyLine[i].Ename + '" disabled="true">' +
                                                    '<span class="input-group-addon" style="width: 5%">' +
                                                    '<button  type="button" data-toggle="modal" data-target="#onecomLine" onclick="getonlinedataline_Submit(' + i + ')">' +
                                                    'Go!' +
                                                    '</button>' +
                                                    '</span>' +
                                                    '</div>');
                                            }
                                        },
                                    })
                                } //当前未匹配到一个设备
                            },
                            error: function (errorMsg) {
                                $.messager.alert({
                                    title: '提示',
                                    msg: '仿真数据请求失败！',
                                })
                            }
                        });
                    } //在线模式下
                    //获取离线属性，如果后台离线属性不存，则获取在线属性
                    else {
                        Remove();
                        document.getElementById("hideee").disabled = true;
                        var outlinedata = cell_view.model.toJSON().property; //属性json
                        var isNUllFlag = true;
                        for (var i = 0; i < outlinedata.modify.length; i++) {
                            if (outlinedata.modify[i].value != undefined) {
                                isNUllFlag = false;
                                break;
                            }
                        }
                        if (isNUllFlag) {
                            //在线获取数据
                            var cellId = cell_view.model.toJSON().id;
                            var type = cell_view.model.toJSON().modelType; //图元类型
                            var sendData = {
                                PRJ_TYPE: type,
                                OBJ_CD: cellId.substring(0, 8) + cellId.substring(9, 13) + cellId.substring(14, 18) + cellId.substring(19, 23) + cellId.substring(24, 36)
                            };

                            $.ajax({
                                type: 'post',
                                url: url + 'getRealdata',
                                data: sendData,
                                async: false,       //同步执行
                                success: function (data) {
                                    outlinedata = data;
                                    cell_view.model.prop('property', outlinedata);
                                }
                            });
                        }
                        for (var i in outlinedata.modify) {
                            var unit = '';
                            if (outlinedata.modify[i].unit != undefined)
                                unit = outlinedata.modify[i].unit;

                            var value = '';
                            if (outlinedata.modify[i].value != undefined)
                                value = outlinedata.modify[i].value;
                            $("#property").append('<div class="input-group">' +
                                '<label class="input-group-addon" for="first" style="width: 5%">' + outlinedata.modify[i].name + '</label>' +
                                '<input type="text" class="form-control" id="first"  placeholder="' + value + '" disabled="true">' +
                                '<span class="input-group-addon" style="width: 5%">' + unit + '</span>' +
                                '</div>');

                        }
                        for (var i in outlinedata.modifyLine) {
                            $("#property").append('<div class="input-group">' +
                                '<label class="input-group-addon" for="property_line' + i + '" style="width: 5%">' + outlinedata.modifyLine[i].name + '</label>' +
                                '<input type="text" class="form-control" id="property_line' + i + '" placeholder="' + outlinedata.modifyLine[i].Ename + '" disabled="true">' +
                                '<span class="input-group-addon" style="width: 5%">' +
                                '<button  type="button" data-toggle="modal" data-target="#onecomLine" onclick="getoutlinedataline_Submit(' + i + ')">' +
                                'Go!' +
                                '</button>' +
                                '</span>' +
                                '</div>');
                        }
                    }
                } //当前已有图元被选中下
            }
            ; //获得属性
        },

        initializeAjax: function () {

            var paper = this.paper;

            //新增图元时！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！需更行对象表，及其选中对象
            this.graph.on('add', function (cell) {
            	alert("sdad");
                var cellView = paper.findViewByModel(cell);
               /* if (cell.isElement() && cell.get('type') != 'basic.Text') {
                    Remove();
                    getOBJ_CD = cell.toJSON().id;
                    getOBJ_CD = getOBJ_CD.substring(0, 8) + getOBJ_CD.substring(9, 13) + getOBJ_CD.substring(14, 18) + getOBJ_CD.substring(19, 23) + getOBJ_CD.substring(24, 36);
                    getPRJ_TYPE = cell.toJSON().modelType;
                    this.highlightAndHaloCommon(cellView);
                    var id = cell.id;
                    var type = cell.toJSON().modelType;
                    var cellName = cell.toJSON().modelText; //图元名称
                    var sendData = {PRJ_CD: getPRJ_CD, PRJ_TYPE: type, OBJ_CD: id, PEL_NM: cellName};
                    //----------------------记录增加图元的操作BySong----------------------------
                    //sessionStorage.setItem("userModifyOperation",JSON.stringify({"addDevice":sendData}));
                    modifyData.push({type: "addDevice", data: sendData});
                    //---------------------记录增加图元的操作-----------------------
                    $.ajax({
                        url: url + 'addDevice', //增加的url
                        type: 'post',
                        data: sendData,
                        success: function (data) {
                            //新增图元添加功能可操作
                            document.getElementById("valueT").disabled = true;
                            if (document.getElementById('data-type-two').checked) {
                                document.getElementById("resetT").disabled = true;
                                document.getElementById("modifyT").disabled = true;
                                document.getElementById("inserT").disabled = undefined;
                            } else {
                                document.getElementById("inserT").disabled = true;
                                document.getElementById("resetT").disabled = undefined;
                                document.getElementById("modifyT").disabled = undefined;
                            }

                            if (data != null || data != undefined || data != '') {
                                cell.prop('property', data); //先将属性插入图元中1
                                if (document.getElementById('data-type-one').value == 0) { //属性界面
                                    if (document.getElementById('data-type-two').checked) { //在线模式下
                                        for (var i = 0; i < data.modify.length; i++) {

                                            if (data.modify[i].unit) {
                                                $("#property").append('<div class="input-group">' +
                                                    '<label class="input-group-addon" for="property_data' + i + '" style="width: 5%">' + data.modify[i].name + '</label>' +
                                                    '<input name="' + data.modify[i].Ename + '" type="text" class="form-control" id="property_data' + i + '">' +
                                                    '<span class="input-group-addon" style="width: 5%">' + data.modify[i].unit + '</span>' +
                                                    '</div>');
                                            }
                                            if (!data.modify[i].unit) {
                                                //console.log( data.modify[i].Ename);
                                                if (data.modify[i].Ename == "KD" || data.modify[i].Ename == "Z") {

                                                    $("#property").append('<div class="input-group">' +
                                                        '<label class="input-group-addon" for="property_data' + i + '"style="width: 5%">' + data.modify[i].name + '</label>' +
                                                        '<input name="' + data.modify[i].Ename + '" type="text" class="form-control" id="property_data' + i + '" placeholder="' + -1 + '" disabled="true">' +
                                                        '<span class="input-group-addon" style="width: 5%"></span>' +
                                                        '</div>');
                                                }
                                                else {
                                                    $("#property").append('<div class="input-group">' +
                                                        '<label class="input-group-addon" for="property_data' + i + '"style="width: 5%">' + data.modify[i].name + '</label>' +
                                                        '<input name="' + data.modify[i].Ename + '" type="text" class="form-control" id="property_data' + i + '">' +
                                                        '<span class="input-group-addon" style="width: 5%"></span>' +
                                                        '</div>');
                                                }
                                            }
                                        }
                                        for (var i = 0; i < data.modifyLine.length; i++) {
                                            $("#property").append('<div class="input-group">' +
                                                '<label class="input-group-addon" for="property_line' + i + '" style="width: 5%">' + data.modifyLine[i].name + '</label>' +
                                                '<input type="text" class="form-control" id="property_line' + i + '" placeholder="' + data.modifyLine[i].Ename + '" disabled="true">' +
                                                '<span class="input-group-addon" style="width: 5%">' +
                                                '<button  type="button" data-toggle="modal" data-target="#onecomLine" onclick="getonlinedataline_Submit(' + i + ')">' +
                                                'Go!' +
                                                '</button>' +
                                                '</span>' +
                                                '</div>');
                                        }
                                    }
                                    ; //在线属性
                                    if (!document.getElementById('data-type-two').checked) {
                                        $('#valueT').removeAttr("disabled");

                                        console.log(data.modify[i].name);
                                        var data = cell.toJSON().property; //属性json
                                        for (var i in data.modify) {
                                            var unit = '';
                                            if (data.modify[i].unit != undefined)
                                                unit = data.modify[i].unit;

                                            var value = '';
                                            if (data.modify[i].value != undefined)
                                                value = data.modify[i].value;
                                            if (data.modify[i].Ename == "KD" || data.modify[i].name == "KD") {
                                                $("#property").append('<div class="input-group">' +
                                                    '<label class="input-group-addon" for="first" style="width: 5%">' + data.modify[i].name + '</label>' +
                                                    '<input type="text" class="form-control" id="first"  placeholder="' + value + '" disabled="true">' +
                                                    '<span class="input-group-addon" style="width: 5%">' + unit + '</span>' +
                                                    '</div>');
                                            }
                                            else {
                                                $("#property").append('<div class="input-group">' +
                                                    '<label class="input-group-addon" for="first" style="width: 5%">' + data.modify[i].name + '</label>' +
                                                    '<input type="text" class="form-control" id="first"  value="' + value + '">' +
                                                    '<span class="input-group-addon" style="width: 5%">' + unit + '</span>' +
                                                    '</div>');
                                            }

                                        }
                                        for (var i in data.modifyLine) {
                                            //$("#property").append('<div class="input-group">' +
                                            //  '<label class="input-group-addon" for="property_line' + i + '" style="width: 5%">' + data.modifyLine[i].name + '</label>' +
                                            //  '<input type="text" class="form-control" id="property_line' + i + '" placeholder="' + '" >' +
                                            //  '<span class="input-group-addon" style="width: 5%">' +
                                            //  '<button  type="button" data-toggle="modal" data-target="#onecomLine" onclick="getenddataline(' + i + ')">' +
                                            //  'Go!' +
                                            //  '</button>' +
                                            //  '</span>' +
                                            //  '</div>');

                                            $("#property").append('<div class="input-group">' +
                                                '<label class="input-group-addon" for="property_line' + i + '" style="width: 5%">' + data.modifyLine[i].name + '</label>' +
                                                '<input type="text" class="form-control" id="property_line' + i + '" placeholder="' + data.modifyLine[i].Ename + '" disabled="true">' +
                                                '<span class="input-group-addon" style="width: 5%">' +
                                                '<button  type="button" data-toggle="modal" data-target="#onecomLine" onclick="getoutlinedataline_Submit(' + i + ')">' +
                                                'Go!' +
                                                '</button>' +
                                                '</span>' +
                                                '</div>');
                                        }
                                    }
                                    ; //离线属性
                                }
                                ; //属性栏放置东西------应该判断一下是在线或者离线
                                if (document.getElementById('data-type-one').value == 1 || document.getElementById('data-type-one').value == 2) {
                                }
                                ; //清空属性输入栏
                                $('#devices').datagrid('reload', {PRJ_CD: getPRJ_CD});
                            }
                        },
                        error: function (xhr, status, error) {
                        }
                    });
                } else if (cell.isLink() && ctrlZFlag) {
                    ctrlZFlag = false;
                    //如果连接的是线:
                    var sourceId = cellView.model.toJSON().source.id; //源cellId
                    var sourceView = this.paper.findViewByModel(sourceId); //源图元视图
                    var sourceDir = '';

                    if (sourceView.model.get('modelType') != 'node') {

                        var sourcePortId = cellView.model.toJSON().source.port; //源端点id
                        var sourcePortModel = sourceView.model.getPort(sourcePortId); //端点视图
                        sourceDir = sourcePortModel.group[0];
                    }

                    var targetId = cellView.model.toJSON().target.id;
                    var targetView = this.paper.findViewByModel(targetId);
                    var targetDir = '';

                    if (targetView.model.get('modelType') != 'node') {

                        var targetPortId = cellView.model.toJSON().target.port;
                        var targetPortModel = targetView.model.getPort(targetPortId);
                        targetDir = targetPortModel.group[0];
                    }


                    var sendDate = {
                        source_CD: sourceId + '+' + sourceDir,
                        target_CD: targetId + '+' + targetDir,
                        PRJ_CD: getPRJ_CD
                    };

                    /////////////////////////////////////将拓扑的记录暂时保存到前台BySong//////////////////////////////////////////////////////////////////////////
                    var sendData = {
                        source_CD: sourceId + '+' + sourceDir,
                        target_CD: targetId + '+' + targetDir,
                        PRJ_CD: getPRJ_CD
                    };
                    modifyData.push({"type": "saveTopology", "data": sendData});
                    modifyTopology.push({
                        source_CD: sourceId + '+' + sourceDir,
                        target_CD: targetId + '+' + targetDir,
                        PRJ_CD: getPRJ_CD
                    });
                    $.ajax({
                        url: url + 'saveTopology', //新增连线时的处理的url
                        type: 'post',
                        data: sendDate,
                        success: function (data) {

                        },
                        error: function (xhr, status, error) {

                        }
                    });


                }*/
                //              else if(cell.isLink()) {
                //                  var sourceId = cell.toJSON().source.id; //源cellId
                //                  var sourcePortId = cell.toJSON().source.port;//源端点id
                //                  var sourceView = this.paper.findViewByModel(sourceId); //源图元视图
                //                  var sourcePortModel = sourceView.model.getPort(sourcePortId); //端点视图
                //
                //
                //                  var targetId = cell.toJSON().target.id;
                //                  console.log(targetId);
                //                  var targetPortId = cell.toJSON().target.port;
                ////                    var targetView = this.paper.findViewByModel(targetId);
                ////                    var targetPortModel = targetView.model.getPort(targetPortId);
                //
                //                  console.log(sourcePortModel.group);
                //
                //                  var sendDate = { source_CD: sourceId, target_CD: targetId };
                //                  console.log(sendDate);
                //                  $.ajax({
                //                      url: 'saveTopology', //新增连线时的处理的url
                //                      type: 'post',
                //                      data: sendDate,
                //                      success: function(data) {
                //                          console.log(data);
                //                      },
                //                      error: function(xhr, status, error) {
                //
                //                      }
                //                  });
                //              }

            }, this);

            //新增连接线时，传递源端点和目的端点
            this.paper.on('link:connect', function (cellView) {

                var sourceId = cellView.model.toJSON().source.id; //源cellId
                var sourceView = this.paper.findViewByModel(sourceId); //源图元视图
                var sourceDir = '';

                if (sourceView.model.get('modelType') != 'node') {

                    var sourcePortId = cellView.model.toJSON().source.port; //源端点id
                    var sourcePortModel = sourceView.model.getPort(sourcePortId); //端点视图
                    sourceDir = sourcePortModel.group[0];
                }

                var targetId = cellView.model.toJSON().target.id;
                var targetView = this.paper.findViewByModel(targetId);
                var targetDir = '';

                if (targetView.model.get('modelType') != 'node') {

                    var targetPortId = cellView.model.toJSON().target.port;
                    var targetPortModel = targetView.model.getPort(targetPortId);
                    targetDir = targetPortModel.group[0];
                }


                var sendDate = {
                    source_CD: sourceId + '+' + sourceDir,
                    target_CD: targetId + '+' + targetDir,
                    PRJ_CD: getPRJ_CD
                };

                /////////////////////////////////////将拓扑的记录暂时保存到前台BySong//////////////////////////////////////////////////////////////////////////
                var sendData = {
                    source_CD: sourceId + '+' + sourceDir,
                    target_CD: targetId + '+' + targetDir,
                    PRJ_CD: getPRJ_CD
                };
                modifyData.push({"type": "saveTopology", "data": sendData});
                modifyTopology.push({
                    source_CD: sourceId + '+' + sourceDir,
                    target_CD: targetId + '+' + targetDir,
                    PRJ_CD: getPRJ_CD
                });
                $.ajax({
                    url: url + 'saveTopology', //新增连线时的处理的url
                    type: 'post',
                    data: sendDate,
                    success: function (data) {

                    },
                    error: function (xhr, status, error) {

                    }
                });
            }, this);

            //单击图元时处理的函数！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！需选中对象表的记录
            this.paper.on('cell:pointerdown', function (cellView) {
            	
            	alert("单击图元");
            	
                var cell = cellView.model;
                if (cell.isElement() && cell.get('type') != 'basic.Text') {
                    getOBJ_CD = cell.toJSON().id;
                    getOBJ_CD = getOBJ_CD.substring(0, 8) + getOBJ_CD.substring(9, 13) + getOBJ_CD.substring(14, 18) + getOBJ_CD.substring(19, 23) + getOBJ_CD.substring(24, 36);
                    getPRJ_TYPE = cell.toJSON().modelType;
                    selectobj();
                    //！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！需要更新对象表标记
                    if (document.getElementById('data-type-one').value == 0) {
                        selectzero();
                        Remove(); //清空属性下的数据
                        if (document.getElementById('data-type-two').checked) { //在线模式下
                            document.getElementById("hideee").disabled = undefined;
                            var cellId = cell.id; //图元id
                            var type = cell.toJSON().modelType;
                            var sendData = {
                                PRJ_TYPE: type,
                                OBJ_CD: cellId.substring(0, 8) + cellId.substring(9, 13) + cellId.substring(14, 18) + cellId.substring(19, 23) + cellId.substring(24, 36),
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
                                    if (data) {
                                        document.getElementById("inserT").disabled = true;
                                        document.getElementById("valueT").disabled = "true";
                                        document.getElementById("modifyT").disabled = undefined;
                                        $.ajax({
                                            type: 'post',
                                            url: url + 'getRealdata',
                                            data: sendData,
                                            beforeSend: function () {
                                            },
                                            success: function (data) {
                                                Remove();


                                                for (var i = 0; i < data.modify.length; i++) {
                                                    if (data.modify[i].unit) {
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
                                            },
                                        })
                                    } //当前有匹配到一个设备
                                    if (!data) {
                                        document.getElementById("inserT").disabled = undefined;
                                        document.getElementById("valueT").disabled = undefined;
                                        document.getElementById("modifyT").disabled = true;
                                        document.getElementById("valueT").disabled = true;
                                        $.ajax({
                                            type: 'post',
                                            url: url + 'getRealdata',
                                            data: sendData,
                                            beforeSend: function () {
                                            },
                                            success: function (data) {
                                                Remove();
                                                for (var i = 0; i < data.modify.length; i++) {
                                                    if (data.modify[i].unit) {
                                                        $("#property").append('<div class="input-group">' +
                                                            '<label class="input-group-addon" for="property_data' + i + '" style="width: 5%">' + data.modify[i].name + '</label>' +
                                                            '<input name="' + data.modify[i].Ename + '" type="text" class="form-control" id="property_data' + i + '">' +
                                                            '<span class="input-group-addon" style="width: 5%">' + data.modify[i].unit + '</span>' +
                                                            '</div>');
                                                    }
                                                    if (!data.modify[i].unit) {
                                                        $("#property").append('<div class="input-group">' +
                                                            '<label class="input-group-addon" for="property_data' + i + '"style="width: 5%">' + data.modify[i].name + '</label>' +
                                                            '<input name="' + data.modify[i].Ename + '" type="text" class="form-control" id="property_data' + i + '">' +
                                                            '<span class="input-group-addon" style="width: 5%"></span>' +
                                                            '</div>');
                                                    }
                                                }

                                                for (var i = 0; i < data.modifyLine.length; i++) {
                                                    $("#property").append('<div class="input-group">' +
                                                        '<label class="input-group-addon" for="property_line' + i + '" style="width: 5%">' + data.modifyLine[i].name + '</label>' +
                                                        '<input type="text" class="form-control" id="property_line' + i + '" placeholder="' + data.modifyLine[i].Ename + '" disabled="true">' +
                                                        '<span class="input-group-addon" style="width: 5%">' +
                                                        '<button  type="button" data-toggle="modal" data-target="#onecomLine" onclick="getonlinedataline_Submit(' + i + ')">' +
                                                        'Go!' +
                                                        '</button>' +
                                                        '</span>' +
                                                        '</div>');
                                                }
                                            },
                                        })
                                    } //当前未匹配到一个设备
                                },
                                error: function (errorMsg) {
                                    $.messager.alert({
                                        title: '提示',
                                        msg: '仿真数据请求失败！',
                                    })
                                }
                            });
                        } else { //离线模式
                            document.getElementById("hideee").disabled = true;
                            Remove();
                            $('#valueT').removeAttr("disabled");
                            //TODO

                            var data = cell_view.model.toJSON().property;
                            // var data = cell.toJSON().property; //属性json
                            for (var i in data.modify) {
                                var unit = '';
                                if (data.modify[i].unit != undefined)
                                    unit = data.modify[i].unit;

                                var value = '';
                                if (data.modify[i].value != undefined)
                                    value = data.modify[i].value;
                                $("#property").append('<div class="input-group">' +
                                    '<label class="input-group-addon" for="first" style="width: 5%">' + data.modify[i].name + '</label>' +
                                    '<input type="text" class="form-control" id="first"  value="' + value + '">' +
                                    '<span class="input-group-addon" style="width: 5%">' + unit + '</span>' +
                                    '</div>');

                            }
                            for (var i in data.modifyLine) {

                                $("#property").append('<div class="input-group">' +
                                    '<label class="input-group-addon" for="property_line' + i + '" style="width: 5%">' + data.modifyLine[i].name + '</label>' +
                                    '<input type="text" class="form-control" id="property_line' + i + '" placeholder="' + data.modifyLine[i].Ename + '" disabled="true">' +
                                    '<span class="input-group-addon" style="width: 5%">' +
                                    '<button  type="button" data-toggle="modal" data-target="#onecomLine" onclick="getoutlinedataline_Submit(' + i + ')">' +
                                    'Go!' +
                                    '</button>' +
                                    '</span>' +
                                    '</div>');
                            }
                        }
                    } //获得属性
                    if (document.getElementById('data-type-one').value == 1) {
                        selectone();
                        if (!$('#slect-moni').datagrid('getSelected')) {
                            Remove();
                            $.messager.show({
                                title: '提示',
                                msg: '请先选择一次仿真记录！'
                            })
                        } //提示未选中记录
                       ;

                        if ($('#slect-moni').datagrid('getSelected')) {
                            if ($('#slect-moni').datagrid('getSelected').SIM_RET_STAT == '成功' && $('#slect-moni').datagrid('getSelected').SIM_CAL_TYPE == '非恒定') {
                                $.ajax({
                                    type: 'post',
                                    url: url + 'getResultData',
                                    data: {
                                        OBJ_CD: getOBJ_CD,//选中的对象ID
                                        SIM_CD: $('#slect-moni').datagrid('getSelected').SIM_CD,//选中的模拟记录ID
                                        SIM_CAL_TYPE: $('#slect-moni').datagrid('getSelected').SIM_CAL_TYPE,
                                        //PRJ_TYPE:$('#devices').datagrid('getSelected').PRJ_TYPE
                                        PRJ_TYPE: cell_view.model.toJSON().modelType

                                        //OBJ_CD: "bf899545978b4affbd1dbc52603199a5",
                                        //SIM_CD: 2,
                                        //SIM_CAL_TYPE: "Steady",
                                        //PRJ_TYPE:2

                                    },
                                    beforeSend: function () {
                                    },
                                    success: function (data) {
                                        Remove();
                                        var index = 0;
                                        for (var prop in data.result_D) {
                                            if (1 == ++index) {
                                                $("#property").append('<div><button  type= "button"   id="resultLineBut" data-toggle="modal" data-target="#onecomLine" class="btn navbar-btn btn-info btn-sm" style="width: 90%;"   onclick="Resultfun()">' + '结果' + '</button></div>');
                                            }
                                            $("#property").append('<hr><em>' + prop + ':</em>');
                                            //alert(prop + "有" + data.result_D[prop].length + "个结果类型");
                                            for (var i = 0; i < data.result_D[prop].length; i++) {
                                                var nodeNum = parseInt(prop);  // 内点号

                                                //alert("第" + i + "类结果类型为：" + data.result_D[prop][i].Name);
                                                var idString = "_" + prop + "_" + i.toString();

                                                $("#property").append('<div class="input-group">' +
                                                    '<label class="input-group-addon" for="property_line' + i + '" style="width: 5%">' + data.result_D[prop][i].Name + '</label>' +
                                                    '<input type="text" class="form-control" id="property_line' + idString + '" disabled="true" value = "' + data.result_D[prop][i].Ename + '" placeholder=' + prop + '>' +
                                                    '<span class="input-group-addon" style="width: 4%">' +
                                                    '<button  type="button" data-toggle="modal" data-target="#onecomLine" onclick="getresultline(' + nodeNum + ',' + i + ')">' +
                                                    'go' +
                                                    '</button>' +
                                                    '</span>' +
                                                    '</div>');
                                            }
                                            //for(var i in data.result_W.prop)
                                        }
                                        //for(var i=0;i < data.result_W.length; i++){
                                        //    $.message.show({
                                        //        title:'111',
                                        //        msg:data.result_W[i].name
                                        //    })
                                        //$("#property").append('<div class="input-group">'+
                                        //    '<label class="input-group-addon" for="property_'+ i +'">' + data.inherent[i].name + '</label>' +
                                        //    '<input type="text" class="form-control" id="property_'+ i +'" disabled="true" placeholder="100">' +
                                        //    '<span class="input-group-addon">'+
                                        //    '<button  type="button" data-toggle="modal" data-target="#onecomLine" onclick="getresultline()">'+
                                        //    'Go!'+
                                        //    '</button>'+
                                        //    '</span>'+
                                        //    '</div>');
                                        //}
                                    },
                                });
                            } //1,表示非恒定，结果为曲线，success接收到的data应该为结果名称；内点号
                            if ($('#slect-moni').datagrid('getSelected').SIM_RET_STAT == '成功' && $('#slect-moni').datagrid('getSelected').SIM_CAL_TYPE == '恒定') {
                                $.ajax({
                                    type: 'post',
                                    url: url + 'getResultData',
                                    data: {
                                        OBJ_CD: getOBJ_CD, //选中的对象ID
                                        SIM_CD: $('#slect-moni').datagrid('getSelected').SIM_CD, //选中的模拟记录ID
                                        SIM_CAL_TYPE: $('#slect-moni').datagrid('getSelected').SIM_CAL_TYPE,
                                        //PRJ_TYPE:$('#devices').datagrid('getSelected').PRJ_TYPE,
                                        PRJ_TYPE: getPRJ_TYPE,

                                        //OBJ_CD: "bf899545978b4affbd1dbc52603199a5",
                                        //SIM_CD: 2,
                                        //SIM_CAL_TYPE: "Steady",
                                        //PRJ_TYPE:2
                                    },
                                    beforeSend: function () {
                                    },
                                    success: function (data) {
                                        Remove();
                                        for (var prop in data.result_W) {
                                            $("#property").append('<hr><em>' + prop + ':</em>');
                                            for (var i = 0; i < data.result_W[prop].length; i++) {
                                                if (data.result_W[prop][i].unit) {
                                                    $("#property").append('<div class="input-group">' +
                                                        '<label class="input-group-addon" for="property_' + i + '" style="width: 5%">' + data.result_W[prop][i].Name + '</label>' +
                                                        '<input type="text" class="form-control" id="property_data' + i + '" placeholder="' + data.result_W[prop][i].value + '" disabled="true">' +
                                                        '<span class="input-group-addon" style="width: 5%">' + data.result_W[prop][i].unit + '</span>' +
                                                        '</div>');
                                                } else {
                                                    $("#property").append('<div class="input-group">' +
                                                        '<label class="input-group-addon" for="property_' + i + '" style="width: 5%">' + data.result_W[prop][i].Name + '</label>' +
                                                        '<input type="text" class="form-control" id="property_data' + i + '" placeholder="' + data.result_W[prop][i].value + '" disabled="true">' +
                                                        '<span class="input-group-addon" style="width: 5%"></span>' +
                                                        '</div>');
                                                }
                                            }
                                            //alert("jsonObj[" + prop + "]=" + data.result_W[prop][0].value);
                                        }
                                        //for(var i = 0; i < data.result_W.length; i++){
                                        //    $.message.show({
                                        //        title:'111',
                                        //        msg:data.result_W[i].name
                                        //    })
                                        //$("#property").append('<div class="input-group">' +
                                        //    '<label class="input-group-addon" for="property_'+ i +'">' + data.result_W[i].name + '</label>' +
                                        //    '<input type="text" class="form-control" id="property_'+ i +'" placeholder="' + data.result_W[i].value + '" disabled="true">' +
                                        //    '<span class="input-group-addon">.'+ data.inherent[i].unit +'</span>' +
                                        //    '</div>');
                                        //}
                                    },
                                });
                            } //0,表示恒定,结果为值，不需要按钮
                            if ($('#slect-moni').datagrid('getSelected').SIM_RET_STAT == '失败') {
                                Remove();
                            }
                        } //判断当前是否有选中一条模拟记录ID

                    } //获得结果
                    if (document.getElementById('data-type-one').value == 2) {
                        selectone();
                        if (!$('#slect-moni').datagrid('getSelected')) {
                            Remove();
                            $.messager.show({
                                title: '提示',
                                msg: '请先选择一次仿真记录！'
                            })
                        } //提示未选中记录
                        if ($('#slect-moni').datagrid('getSelected')) {
                            $.ajax({
                                type: 'post',
                                url: url + 'getOldData',
                                data: {
                                    OBJ_CD: getOBJ_CD, //选中的对象ID
                                    SIM_CD: $('#slect-moni').datagrid('getSelected').SIM_CD, //选中的模拟记录ID
                                    PRJ_TYPE: cell_view.model.toJSON().modelType
                                },
                                success: function (data) {
                                    Remove();
                                    for (var i = 0; i < data.modify.length; i++) {
                                        if (data.modify[i].unit) {
                                            $("#property").append('<div class="input-group">' +
                                                '<label class="input-group-addon" for="property_data' + i + '" style="width: 5%";>' + data.modify[i].name + '</label>' +
                                                '<input type="text" class="form-control" id="property_data' + i + '" placeholder="' + data.modify[i].value + '" disabled="true">' +
                                                '<span class="input-group-addon">' + data.modify[i].unit + '</span>' +
                                                '</div>');
                                        }
                                        if (!data.modify[i].unit) {
                                            $("#property").append('<div class="input-group">' +
                                                '<label class="input-group-addon" for="property_data' + i + '"style="width: 5%">' + data.modify[i].name + '</label>' +
                                                '<input type="text" class="form-control" id="property_data' + i + '" placeholder="' + data.modify[i].value + '" disabled="true">' +
                                                '<span class="input-group-addon"></span>' +
                                                '</div>');
                                        }
                                    }
                                    for (var i = 0; i < data.modifyLine.length; i++) {
                                        $("#property").append('<div class="input-group">' +
                                            '<label class="input-group-addon" for="property_line' + i + '">' + data.modifyLine[i].name + '</label>' +
                                            '<input type="text" class="form-control" id="property_line' + i + '" placeholder="' + data.modifyLine[i].Ename + '" disabled="true">' +
                                            '<span class="input-group-addon">' +
                                            '<button  type="button" data-toggle="modal" data-target="#onecomLine" onclick="getenddataline(' + i + ')">' +
                                            'Go!' +
                                            '</button>' +
                                            '</span>' +
                                            '</div>');
                                    }
                                },
                            })
                        } //判断当前是否有选中一条模拟记录ID
                    } //获得某次仿真的输入
                }
                ;
                if (cell.isElement() && cell.get('type') == 'basic.Text') {
                    getOBJ_CD = undefined;
                    getPRJ_TYPE = undefined;
                }
            }, this);

            //点击空白！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！需清空对象表选中状态
            this.paper.on('blank:pointerdown', function (cellView) {
                if (cell_view != null) {
                    cell_view.unhighlight();
                    cell_view = null;
                } //去除高亮
                getOBJ_CD = undefined;
                getPRJ_TYPE = undefined;
                Remove();
                $('#devices').datagrid('unselectAll'); //清空对象表的选中状态
            });

            //删除图元的时候处理的函数！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！需更新对象表，及清空选中状态
            this.graph.on('remove', function (cell) {
                ctrlZFlag = false;
                if (cell.isElement() && getPRJ_CD != "-1") {
                    var id = cell.id;

                    var type = cell.toJSON().modelType;
                    var sendDate = {OBJ_CD: id};
                    var sendData = {OBJ_CD: id};
                    //////添加删除的更新的记录BySong:
                    modifyData.push({"type": "deleteDevice", "data": sendData})
                    $.ajax({
                        url: url + 'deleteDevice', //删除的url
                        type: 'post',
                        data: sendDate,
                        success: function (data) {

                            //全局变量设置为空
                            getOBJ_CD = undefined;
                            getPRJ_TYPE = undefined;
                            Remove();
                            $('#devices').datagrid('reload'); //刷新对象表
                            $('#devices').datagrid('unselectAll'); //清空对象表的选中状态
                        },
                        error: function (xhr, status, error) {

                        }
                    });
                    id = null;
                    type = null;
                }
                ;
                //连接线删除的操作:
                if (cell.isLink() && getPRJ_CD != "-1") {
                    var source = cell.toJSON().source.id;
                    var target = cell.toJSON().target.id;
                    if (target === undefined) {
                        //撤销拓扑（连接线）操作的问题，没有targetcd，因为撤销操作一定是上一个增加操作的逆操作,所以找出上一个操作:BySong
                        //  var info  = modifyTopology.pop();
                        // source = info.source_CD;
                        //  target = info.target_CD;
                        return;
                    }


                    var sendDate = {source_CD: source, target_CD: target};

                    /////////////////////////////////将删除拓扑保存到前台的modifyUpdate中/////////////////////////////////
                    var sendData = {source_CD: source, target_CD: target};
                    modifyData.push({"type": "deleteTopology", "data": sendData});
                    modifyTopology.push({source_CD: source, target_CD: target, PRJ_CD: getPRJ_CD});
                    /////////////////////////////////将删除拓扑保存到前台的modifyUpdate中/////////////////////////////////
                    $.ajax({
                        url: url + 'deleteTopology', //删除连线时的处理的url
                        type: 'post',
                        data: sendDate,
                        success: function (data) {

                        },
                        error: function (xhr, status, error) {
                        }
                    });
                }
            });

        },

        exportStylesheet: [
            '.scalable * { vector-effect: non-scaling-stroke }',
            '.marker-arrowheads { display:none }',
            '.marker-vertices { display:none }',
            '.link-tools { display:none }'
        ].join(''),
        
        onMousewheel: function(cellView, evt, x, y, delta) {

            if (this.keyboard.isActive('alt', evt)) {
                evt.preventDefault();
                this.paperScroller.zoom(delta * 0.2, {
                    min: 0.2,
                    max: 5,
                    grid: 0.2,
                    ox: x,
                    oy: y
                });
            }
        },

        layoutDirectedGraph: function() {

            joint.layout.DirectedGraph.layout(this.graph, {
                setLinkVertices: true,
                rankDir: 'TB',
                marginX: 100,
                marginY: 100
            });

            this.paperScroller.centerContent();
        }
    });

})(_, joint);