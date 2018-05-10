var App = window.App || {};

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
                    document.getElementById('T_name').value = cell.get("modeltext");
                    document.getElementById('T_id').value = cell.id;
                    document.getElementById('TA_name').value = cell.get("name");
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
            if (element.attributes.type == 'basic.Text') {
                var view = this.paper.findViewByModel(element);
                var text = view.$('text')[0];

                var bbox = V(text).bbox(true);

                element.resize(bbox.width, bbox.height);
            }
        },

        //加载例子
        loadExample: function(prj_ID) {
            var graph = this.graph;
            $.ajax({
                url: url + 'getGraph', //保存可二次编辑的json信息
                type: 'post',
                data: {
                    PRJ_CD: prj_ID
                },
                success: function(data) {
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
                error: function(xhr, status, error) {

                }
            });

        },


        menu: function() {
            var graph = this.graph;
            var paperScroller = this.paperScroller;
            var paper = this.paper;
            var cell = this.cellView
            var commandManager = new joint.dia.CommandManager({
                graph: graph
            });
            var modifyData = [];

            //确定匹配
            $('#mapping').on('click', function() {
                var id = document.getElementById('T_id').value;
                var mycell = graph.getCell(id);
                console.log(mycell);
                mycell.prop('name','test');
            });


            //保存菜单
            $('#save').on('click', function() {
                //----var windowFeatures = 'menubar=no,location=no,resizable=yes,scrollbars=yes,status=no';
                //----------保存当前时间----------
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

                var sendData = {
                    PRJ_CD: getPRJ_CD,
                    Graph: JSON.stringify(graph.toJSON()),
                    modifyData: JSON.stringify(modifyData),
                    // "newKey": newkey
                }
                // $.ajax({
                //     url: url + 'saveGraph', //保存可二次编辑的json信息
                //     type: 'post',
                //     data: sendData,
                //     success: function (data) {
                //         if (data.error == "none") {
                //             modifyData = [];
                //             $('#devices').datagrid('reload');
                //             $.messager.show({
                //                 title: '提示',
                //                 msg: '工程保存成功！'
                //             })
                //             newkey = data.newKey;
                //         } else {
                //             $.messager.show({
                //                 title: '提示',
                //                 msg: data.error
                //             })
                //         }
                //     },
                //     error: function (xhr, status, error) {
                //         $.messager.show({
                //             title: '提示',
                //             msg: error
                //         })
                //     }
                // });
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