(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/components/layout_utils.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '3c4bcjv63NHVId07AId0bOj', 'layout_utils', __filename);
// script/components/layout_utils.ts

Object.defineProperty(exports, "__esModule", { value: true });
//item及父节点锚点都为(0,1)
var LayoutUtil = /** @class */ (function () {
    function LayoutUtil() {
    }
    LayoutUtil.vertical_layout = function (index, item_width, item_height, column, gap_x, gap_y) {
        if (column === void 0) { column = 1; }
        if (gap_x === void 0) { gap_x = 0; }
        if (gap_y === void 0) { gap_y = 0; }
        var x = (index % column) * (item_width + gap_x);
        var y = -Math.floor(index / column) * (item_height + gap_y);
        return [x, y];
    };
    LayoutUtil.horizontal_layout = function (index, item_width, item_height, row, gap_x, gap_y) {
        if (row === void 0) { row = 1; }
        if (gap_x === void 0) { gap_x = 0; }
        if (gap_y === void 0) { gap_y = 0; }
        var x = Math.floor(index / row) * (item_width + gap_x);
        var y = -(index % row) * (item_height + gap_y);
        return [x, y];
    };
    return LayoutUtil;
}());
exports.LayoutUtil = LayoutUtil;

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
        //# sourceMappingURL=layout_utils.js.map
        