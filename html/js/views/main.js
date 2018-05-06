/*! Rappid v2.2.0 - HTML5 Diagramming Framework - TRIAL VERSION

Copyright (c) 2015 client IO

 2018-04-30 


This Source Code Form is subject to the terms of the Rappid Trial License
, v. 2.0. If a copy of the Rappid License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
 or from the Rappid archive as was distributed by client IO. See the LICENSE file.*/


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
        },

        // Create a graph, paper and wrap the paper in a PaperScroller.
        initializePaper: function() {

            var graph = this.graph = new joint.dia.Graph;

            // graph.on('add', function(cell, collection, opt) {
            //     if (opt.stencil) this.createInspector(cell);
            // }, this);

            this.commandManager = new joint.dia.CommandManager({ graph: graph });

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
                    var links = graph.getConnectedLinks(cellView.model, { outbound: true });
                    var portLinks = _.filter(links, function(o) {
                        return o.get('source').port == port;
                    });
                    if(portLinks.length > 0) return false;
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
                layout:  {
                    rowHeight: 70,
                    resizeToFit: false, //显示定义时的大小
                },

                paperPadding:20,

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
                        translate: { dx: 20, dy: 20 },
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
                    this.paperScroller.zoom(0.2, { max: 5, grid: 0.2 });
                },

                'ctrl+minus': function(evt) {
                    evt.preventDefault();
                    this.paperScroller.zoom(-0.2, { min: 0.2, grid: 0.2 });
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

        initializeHaloAndInspector: function () 
        {
            this.paper.on('element:pointerup link:options', function(cellView) {

                var cell = cellView.model;

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
                        this.selection.collection.add(cell, { silent: true });
                    }
                }
            }, this);
            //右键
            this.paper.on('cell:contextmenu', function (cellView, evt) { //图元右键单击事件
                var cell = cellView.model;

                getOBJ_CD = cell.toJSON().id;
                getOBJ_CD = getOBJ_CD.substring(0, 8) + getOBJ_CD.substring(9, 13) + getOBJ_CD.substring(14, 18) + getOBJ_CD.substring(19, 23) + getOBJ_CD.substring(24, 36);
                alert(getOBJ_CD);
                if (cell.isElement()) {

                    var id = cell.toJSON().id;

                    // 编辑内容（属性）
                    var inspector = new joint.ui.Inspector({
                        theme: 'modern',
                        cellView: cellView,
                        live: false, //不立即更新
                        inputs: {
                            'id': {
                                type: 'text',
                                label: '图元ID',
                                index: 1,
                            },

                            'modelText': {
                                type: 'text',
                                label: '图元名称',
                                index: 2,
                            }

                        }
                    });

                    var dialog = new joint.ui.Dialog({
                        theme: 'modern',
                        type: 'info',
                        width: 350,
                        title: '设备属性',
                        closeButton: true,

                        content: inspector.render().$el,

                        buttons: [{
                            content: '取消',
                            action: 'cancel'
                        }, {
                            content: '确定',
                            action: 'apply'
                        }]
                    });
                    //<a data-toggle="modal"  data-target="#TandDevice" href="#">测试</a>
                    dialog.on({
                        'action:cancel': function () {
                            inspector.remove();
                            dialog.close();
                        },
                        'action:apply': function () {
                            var cellId = cell.get("id"); //图元id
                            //var cellName = cell.get("attrs").text.text; //图元名称
                            //var cellNAME =  cell.get("modelText");//
                            //var cellNAME = cell_view.model.toJSON().modelText;
                            var cellNAME = $(".joint-dialog input[type=text]").eq(1).val();
                            //alert(cellNAME);
                            var epId = cell.get("equipmentId"); //设备id
                            var epName = cell.get("equipmentName"); //设备名称
                            //var sendDate = '{"cellId":"' + cellName + '","PEL_NM":"' + cellName + '"}';

                            //右键弹出框确定后的ajax。传递图元名称和设备名称
                            $.ajax({
                                url: url + 'updatehob', //增加的url
                                type: 'post',
                                data: {
                                    OBJ_CD: cellId.substring(0, 8) + cellId.substring(9, 13) + cellId.substring(14, 18) + cellId.substring(19, 23) + cellId.substring(24, 36),
                                    //PEL_NM:cell_view.model.toJSON().modelText
                                    PEL_NM: cellNAME
                                },
                                success: function (data) {
                                    $('#devices').datagrid('reload', {PRJ_CD: getPRJ_CD});
                                    selectobj();
                                    inspector.updateCell();
                                    inspector.remove();
                                    dialog.close();
                                },
                                error: function (xhr, status, error) {
                                }
                            });
                        }
                    });
                    dialog.open();
                }
            });
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

        exportStylesheet: [
            '.scalable * { vector-effect: non-scaling-stroke }',
            '.marker-arrowheads { display:none }',
            '.marker-vertices { display:none }',
            '.link-tools { display:none }'
        ].join(''),


        onMousewheel: function(cellView, evt, x, y, delta) {

            if (this.keyboard.isActive('alt', evt)) {
                evt.preventDefault();
                this.paperScroller.zoom(delta * 0.2, { min: 0.2, max: 5, grid: 0.2, ox: x, oy: y });
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
