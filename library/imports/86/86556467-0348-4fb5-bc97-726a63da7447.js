"use strict";
cc._RF.push(module, '86556RnA0hPtbyXcmpj2nRH', 'listview_demo');
// script/components/listview_demo.ts

Object.defineProperty(exports, "__esModule", { value: true });
var listview_1 = require("./listview");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ListView_Demo = /** @class */ (function (_super) {
    __extends(ListView_Demo, _super);
    function ListView_Demo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListView_Demo.prototype.onLoad = function () {
        var list = new listview_1.ListView({
            scrollview: this.scrollview,
            mask: this.mask,
            content: this.content,
            item_tpl: this.item_tpl,
            cb_host: this,
            item_setter: this.update_list_item,
            select_cb: this.on_item_select,
            column: 1,
            row: 1,
            direction: listview_1.ListViewDir.Vertical,
            scroll_to_end_cb: this.scroll_to_end_cb,
        });
        list.set_data([
            "第1条数据啊啊啊啊",
            "第2条数据啊啊啊啊",
            "第3条数据啊啊啊啊",
            "第4条数据啊啊啊啊",
            "第5条数据啊啊啊啊",
            "第6条数据啊啊啊啊",
            "第7条数据啊啊啊啊",
            "第8条数据啊啊啊啊",
            "第9条数据啊啊啊啊",
            "第10条数据啊啊啊啊",
            "第11条数据啊啊啊啊",
            "第12条数据啊啊啊啊",
            "第13条数据啊啊啊啊",
            "第14条数据啊啊啊啊",
            "第15条数据啊啊啊啊",
            "第16条数据啊啊啊啊",
            "第17条数据啊啊啊啊",
            "第18条数据啊啊啊啊",
            "第19条数据啊啊啊啊",
            "第20条数据啊啊啊啊",
        ]);
    };
    ListView_Demo.prototype.on_item_select = function (data, index) {
        cc.info(data, index);
    };
    ListView_Demo.prototype.update_list_item = function (item, data, index) {
        item.getComponent(cc.Label).string = data.toString();
    };
    ListView_Demo.prototype.scroll_to_end_cb = function (event) {
        console.log(event);
    };
    __decorate([
        property(cc.ScrollView)
    ], ListView_Demo.prototype, "scrollview", void 0);
    __decorate([
        property(cc.Node)
    ], ListView_Demo.prototype, "mask", void 0);
    __decorate([
        property(cc.Node)
    ], ListView_Demo.prototype, "content", void 0);
    __decorate([
        property(cc.Node)
    ], ListView_Demo.prototype, "item_tpl", void 0);
    ListView_Demo = __decorate([
        ccclass
    ], ListView_Demo);
    return ListView_Demo;
}(cc.Component));
exports.default = ListView_Demo;

cc._RF.pop();