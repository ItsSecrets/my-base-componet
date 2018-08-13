(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/components/toast.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '75c8fnhX+NEXL18sxa9BJ0i', 'toast', __filename);
// script/components/toast.ts

Object.defineProperty(exports, "__esModule", { value: true });
var appdata_1 = require("../../appdata");
var toast = /** @class */ (function () {
    function toast() {
        var _this = this;
        this.pool_nodes = [];
        this.using_nodes = [];
        this.anchors = [];
        appdata_1.appdata.app.toast.children.forEach(function (node) {
            if (node.name.indexOf("tip") != -1) {
                _this.pool_nodes.push(node);
            }
            if (node.name.indexOf("anchor") != -1) {
                _this.anchors.push(node);
            }
        });
    }
    toast.get_inst = function () {
        if (!this.inst) {
            this.inst = new toast();
        }
        return this.inst;
    };
    toast.show = function (content) {
        toast.get_inst().show(content);
    };
    toast.prototype.show = function (content) {
        var node = this.pool_nodes.pop();
        if (!node) {
            this.layout_nodes();
            node = this.using_nodes.shift();
            node.removeFromParent();
        }
        this.using_nodes.push(node);
        //找到第一个空的位置
        var anchor = this.anchors.find(function (ar) {
            return ar.childrenCount == 0;
        });
        node.parent = anchor;
        node.setPosition(0, 0);
        this.handle_node(node, content);
        this.set_top();
    };
    toast.prototype.handle_node = function (node, content) {
        node.active = true;
        node.opacity = 255;
        this.set_content(node, content);
        node.runAction(cc.sequence(cc.delayTime(1.5), cc.fadeOut(0.4), cc.callFunc(this.on_node_hide, this, node)));
    };
    toast.prototype.set_content = function (node, content) {
        var bg_node = node.getChildByName("bg");
        var txt_node = node.getChildByName("txt");
        var txt = txt_node.getComponent(cc.Label);
        txt.overflow = cc.Label.Overflow.NONE;
        txt.string = content;
        // cc.info("set_content, width=", txt_node.width);
        // if(txt_node.width > 500)
        // {
        //     txt.overflow = cc.Label.Overflow.RESIZE_HEIGHT;
        //     txt_node.width = 500;
        // }
        bg_node.setContentSize(txt_node.width + 20, txt_node.height + 20);
    };
    toast.prototype.on_node_hide = function (node) {
        node.removeFromParent();
        var index = this.using_nodes.findIndex(function (pnode) {
            return pnode == node;
        });
        this.using_nodes.splice(index, 1);
        this.pool_nodes.push(node);
    };
    toast.prototype.set_top = function () {
        var toast = appdata_1.appdata.app.toast;
        toast.setSiblingIndex(toast.parent.childrenCount - 1);
    };
    toast.prototype.layout_nodes = function () {
        if (this.using_nodes.length <= 0) {
            return;
        }
        for (var i = this.using_nodes.length - 1; i > 0; i--) {
            this.using_nodes[i].parent = this.using_nodes[i - 1].parent;
            this.using_nodes[i].setPosition(0, 0);
        }
    };
    return toast;
}());
exports.toast = toast;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=toast.js.map
        