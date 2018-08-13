(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/components/scrollview.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '0a641fa42pLv5BTKKsNfJmR', 'scrollview', __filename);
// script/components/scrollview.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ScrollView = /** @class */ (function () {
    function ScrollView(params) {
        var _this = this;
        this.scrollview = params.scrollview;
        this.mask = params.mask;
        this.content = params.content;
        this.node_pools = new Map();
        this.item_templates = new Map();
        params.item_templates.forEach(function (tpl) {
            tpl.node.active = false;
            _this.item_templates.set(tpl.key, tpl.node);
        });
        this.dir = params.direction || ScrollDirection.Vertical;
        this.width = params.width || this.mask.width;
        this.height = params.height || this.mask.height;
        this.gap_x = params.gap_x || 0;
        this.gap_y = params.gap_y || 0;
        this.cb_host = params.cb_host;
        this.item_setter = params.item_setter;
        this.recycle_cb = params.recycle_cb;
        this.scroll_to_end_cb = params.scroll_to_end_cb;
        this.auto_scrolling = params.auto_scrolling || false;
        if (this.dir == ScrollDirection.Vertical) {
            this.content.width = this.width;
        }
        else {
            this.content.height = this.height;
        }
        this.mask.setContentSize(this.width, this.height);
        this.mask.addComponent(cc.Mask);
        this.scrollview.node.setContentSize(this.width, this.height);
        this.scrollview.vertical = this.dir == ScrollDirection.Vertical;
        this.scrollview.horizontal = this.dir == ScrollDirection.Horizontal;
        this.scrollview.inertia = true;
        this.scrollview.node.on("scrolling", this.on_scrolling, this);
        this.scrollview.node.on("scroll-to-bottom", this.on_scroll_to_end, this);
        this.scrollview.node.on("scroll-to-right", this.on_scroll_to_end, this);
        // cc.info("constructor", this.mask.width, this.mask.height, this.scrollview.node.width, this.scrollview.node.height, this.content.width, this.content.height);
    }
    ScrollView.prototype.on_scroll_to_end = function () {
        if (this.scroll_to_end_cb) {
            this.scroll_to_end_cb.call(this.cb_host);
        }
    };
    ScrollView.prototype.on_scrolling = function () {
        if (!this.items || !this.items.length) {
            return;
        }
        if (this.dir == ScrollDirection.Vertical) {
            var posy = this.content.y;
            // cc.info("onscrolling, content posy=", posy);
            if (posy < 0) {
                posy = 0;
            }
            if (posy > this.content.height - this.height) {
                posy = this.content.height - this.height;
            }
            var start = 0;
            var stop = this.items.length - 1;
            var viewport_start = -posy;
            var viewport_stop = viewport_start - this.height;
            while (this.items[start].y - this.items[start].height > viewport_start) {
                start++;
            }
            while (this.items[stop].y < viewport_stop) {
                stop--;
            }
            if (start != this.start_index && stop != this.stop_index) {
                this.start_index = start;
                this.stop_index = stop;
                cc.info("render_from:", start, stop);
                this.render_items();
            }
        }
        else {
            var posx = this.content.x;
            // cc.info("onscrolling, content posx=", posx);
            if (posx > 0) {
                posx = 0;
            }
            if (posx < this.width - this.content.width) {
                posx = this.width - this.content.width;
            }
            var start = 0;
            var stop = this.items.length - 1;
            var viewport_start = -posx;
            var viewport_stop = viewport_start + this.width;
            while (this.items[start].x + this.items[start].width < viewport_start) {
                start++;
            }
            while (this.items[stop].x > viewport_stop) {
                stop--;
            }
            if (start != this.start_index && stop != this.stop_index) {
                this.start_index = start;
                this.stop_index = stop;
                cc.info("render_from:", start, stop);
                this.render_items();
            }
        }
    };
    ScrollView.prototype.spawn_node = function (key) {
        var node;
        var pools = this.node_pools.get(key);
        if (pools && pools.length > 0) {
            node = pools.pop();
        }
        else {
            node = cc.instantiate(this.item_templates.get(key));
            node.active = true;
            cc.info("spawn_node, key=", key);
        }
        node.parent = this.content;
        return node;
    };
    ScrollView.prototype.recycle_item = function (item) {
        if (item.node && cc.isValid(item.node)) {
            var pools = this.node_pools.get(item.data.key);
            if (!pools) {
                pools = [];
                this.node_pools.set(item.data.key, pools);
            }
            pools.push(item.node);
            if (this.recycle_cb) {
                this.recycle_cb.call(this.cb_host, item.node, item.data.key);
            }
            item.node.removeFromParent();
            item.node = null;
        }
    };
    ScrollView.prototype.clear_items = function () {
        var _this = this;
        if (this.items) {
            this.items.forEach(function (item) {
                _this.recycle_item(item);
            });
        }
    };
    ScrollView.prototype.render_items = function () {
        var item;
        for (var i = 0; i < this.start_index; i++) {
            item = this.items[i];
            if (item.node) {
                cc.info("recycle_item", i);
                this.recycle_item(item);
            }
        }
        for (var i = this.items.length - 1; i > this.stop_index; i--) {
            item = this.items[i];
            if (item.node) {
                cc.info("recycle_item", i);
                this.recycle_item(item);
            }
        }
        for (var i = this.start_index; i <= this.stop_index; i++) {
            item = this.items[i];
            if (!item.node) {
                cc.info("render_item", i);
                item.node = this.spawn_node(item.data.key);
                this.item_setter.call(this.cb_host, item.node, item.data.key, item.data.data, i);
            }
            item.node.setPosition(item.x, item.y);
        }
    };
    ScrollView.prototype.pack_item = function (index, data) {
        var node = this.spawn_node(data.key);
        var _a = this.item_setter.call(this.cb_host, node, data.key, data.data, index), width = _a[0], height = _a[1];
        var item = { x: 0, y: 0, width: width, height: height, data: data, node: node };
        this.recycle_item(item);
        return item;
    };
    ScrollView.prototype.layout_items = function (start) {
        // cc.info("layout_items, start=", start);
        if (this.items.length <= 0) {
            return;
        }
        var start_pos = 0;
        if (start > 0) {
            var prev_item = this.items[start - 1];
            if (this.dir == ScrollDirection.Vertical) {
                start_pos = prev_item.y - prev_item.height - this.gap_y;
            }
            else {
                start_pos = prev_item.x + prev_item.width + this.gap_x;
            }
        }
        for (var index = start, stop = this.items.length; index < stop; index++) {
            var item = this.items[index];
            if (this.dir == ScrollDirection.Vertical) {
                item.x = 0;
                item.y = start_pos;
                start_pos -= item.height + this.gap_y;
            }
            else {
                item.y = 0;
                item.x = start_pos;
                start_pos += item.width + this.gap_x;
            }
        }
    };
    ScrollView.prototype.resize_content = function () {
        if (this.items.length <= 0) {
            this.content.width = 0;
            this.content.height = 0;
            return;
        }
        var last_item = this.items[this.items.length - 1];
        if (this.dir == ScrollDirection.Vertical) {
            this.content.height = Math.max(this.height, last_item.height - last_item.y);
        }
        else {
            this.content.width = Math.max(this.width, last_item.x + last_item.width);
        }
        // cc.info("resize_content", this.mask.width, this.mask.height, this.scrollview.node.width, this.scrollview.node.height, this.content.width, this.content.height);
    };
    ScrollView.prototype.set_data = function (datas) {
        var _this = this;
        this.clear_items();
        this.items = [];
        datas.forEach(function (data, index) {
            var item = _this.pack_item(index, data);
            _this.items.push(item);
        });
        this.layout_items(0);
        this.resize_content();
        this.start_index = -1;
        this.stop_index = -1;
        if (this.dir == ScrollDirection.Vertical) {
            this.content.y = 0;
        }
        else {
            this.content.x = 0;
        }
        if (this.items.length > 0) {
            this.on_scrolling();
        }
    };
    ScrollView.prototype.insert_data = function (index) {
        var _this = this;
        var datas = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            datas[_i - 1] = arguments[_i];
        }
        if (datas.length == 0) {
            cc.info("nothing to insert");
            return;
        }
        if (!this.items) {
            this.items = [];
        }
        if (index < 0 || index > this.items.length) {
            cc.warn("invalid index", index);
            return;
        }
        var is_append = index == this.items.length;
        var items = [];
        datas.forEach(function (data, index) {
            var item = _this.pack_item(index, data);
            items.push(item);
        });
        (_a = this.items).splice.apply(_a, [index, 0].concat(items));
        this.layout_items(index);
        this.resize_content();
        this.start_index = -1;
        this.stop_index = -1;
        if (this.auto_scrolling && is_append) {
            this.scroll_to_end();
        }
        this.on_scrolling();
        var _a;
    };
    ScrollView.prototype.append_data = function () {
        var datas = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            datas[_i] = arguments[_i];
        }
        if (!this.items) {
            this.items = [];
        }
        this.insert_data.apply(this, [this.items.length].concat(datas));
    };
    ScrollView.prototype.scroll_to_end = function () {
        if (this.dir == ScrollDirection.Vertical) {
            this.scrollview.scrollToBottom();
        }
        else {
            this.scrollview.scrollToRight();
        }
    };
    ScrollView.prototype.destroy = function () {
        this.clear_items();
        this.node_pools.forEach(function (pools, key) {
            pools.forEach(function (node) {
                node.destroy();
            });
        });
        this.node_pools = null;
        this.items = null;
        if (cc.isValid(this.scrollview.node)) {
            this.scrollview.node.off("scrolling", this.on_scrolling, this);
            this.scrollview.node.off("scroll-to-bottom", this.on_scroll_to_end, this);
            this.scrollview.node.off("scroll-to-right", this.on_scroll_to_end, this);
        }
    };
    return ScrollView;
}());
exports.ScrollView = ScrollView;
var ScrollDirection;
(function (ScrollDirection) {
    ScrollDirection[ScrollDirection["Vertical"] = 1] = "Vertical";
    ScrollDirection[ScrollDirection["Horizontal"] = 2] = "Horizontal";
})(ScrollDirection = exports.ScrollDirection || (exports.ScrollDirection = {}));

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
        //# sourceMappingURL=scrollview.js.map
        