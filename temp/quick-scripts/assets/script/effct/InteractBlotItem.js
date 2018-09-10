(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/effct/InteractBlotItem.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e3421RTyyVHcpbzNLmDK9DF', 'InteractBlotItem', __filename);
// script/effct/InteractBlotItem.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BlotDataManager_1 = require("./../../../../../work/nurture/nurture/assets/script/BlotDataManager");
var CommonDef_1 = require("./../../../../../work/nurture/nurture/assets/script/CommonDef");
var creator_d_1 = require("./../../../../../work/nurture/nurture/creator.d");
var EventCenter_1 = require("./../../../../../work/nurture/nurture/assets/script/EventCenter");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var InteractBlotItem = /** @class */ (function (_super) {
    __extends(InteractBlotItem, _super);
    function InteractBlotItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.blotSprite = null;
        _this.touchNode = null;
        _this.eraserPoints = [
            { x: -11.5, y: 74.5 },
            { x: -30.5, y: 64.5 },
            { x: -41.5, y: 53.5 },
            { x: -59.5, y: 44.5 },
            { x: -67.5, y: 34.5 },
            { x: -66.5, y: 11.5 },
            { x: -63.5, y: 5.5 },
            { x: -55.5, y: -3.5 },
            { x: -51.5, y: -11.5 },
            { x: -44.5, y: -36.5 },
            { x: -38.5, y: -47.5 },
            { x: -33.5, y: -52.5 },
            { x: -20.5, y: -58.5 },
            { x: -17.5, y: -62.5 },
            { x: -15.5, y: -62.5 },
            { x: -3.5, y: -73.5 },
            { x: 5.5, y: -74.5 },
            { x: 11.5, y: -71.5 },
            { x: 17.5, y: -65.5 },
            { x: 22.5, y: -56.5 },
            { x: 36.5, y: -57.5 },
            { x: 43.5, y: -55.5 },
            { x: 51.5, y: -49.5 },
            { x: 53.5, y: -49.5 },
            { x: 60.5, y: -40.5 },
            { x: 59.5, y: -34.5 },
            { x: 57.5, y: -32.5 },
            { x: 58.5, y: -16.5 },
            { x: 60.5, y: -13.5 },
            { x: 61.5, y: -0.5 },
            { x: 65.5, y: 7.5 },
            { x: 67.5, y: 16.5 },
            { x: 67.5, y: 34.5 },
            { x: 63.5, y: 42.5 },
            { x: 59.5, y: 44.5 },
            { x: 49.5, y: 45.5 },
            { x: 36.5, y: 50.5 },
            { x: 35.5, y: 52.5 },
            { x: 27.5, y: 56.5 },
            { x: 18.5, y: 66.5 },
            { x: 16.5, y: 66.5 },
            { x: 9.5, y: 72.5 },
            { x: 3.5, y: 74.5 }
        ];
        return _this;
    }
    InteractBlotItem.prototype.onLoad = function () {
        this.touchNode.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
        this.touchNode.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.touchNode.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        this.touchNode.on(cc.Node.EventType.TOUCH_CANCEL, this.touchCancel, this);
        EventCenter_1.EventCenter.onEvent(creator_d_1.EventType.CHECK_TRIGGER_STATE, this.onRcvBlotState, this);
    };
    InteractBlotItem.prototype.onDestroy = function () {
        this.touchNode.off(cc.Node.EventType.TOUCH_START, this.touchStart, this);
        this.touchNode.off(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.touchNode.off(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        this.touchNode.off(cc.Node.EventType.TOUCH_CANCEL, this.touchCancel, this);
        EventCenter_1.EventCenter.offEvent(creator_d_1.EventType.CHECK_TRIGGER_STATE, this.onRcvBlotState, this);
    };
    InteractBlotItem.prototype.onRcvBlotState = function (triggerResult) {
        if (triggerResult.triggerType === CommonDef_1.TriggerType.Clean) {
            var blotList = BlotDataManager_1.BlotDataManager.getInstance().getBlotList();
            if (blotList.length > 0) {
                //拉近场景
                EventCenter_1.EventCenter.post(creator_d_1.EventType.CHANGE_SCENE_SHOT, this.node.position);
            }
            else {
                //这个污渍已经被清理过了
            }
        }
    };
    // update (dt) {}
    InteractBlotItem.prototype.touchStart = function (e) {
        e.stopPropagation();
        //阻止多点触摸
        if (e.getID() > 0) {
            return;
        }
        var point = e.touch.getLocation();
        point = this.node.convertToNodeSpaceAR(point);
        this._addCircle(point);
    };
    InteractBlotItem.prototype.touchMove = function (e) {
        e.stopPropagation();
        if (e.getID() > 0) {
            return;
        }
        var delta_x = e.getDelta().x;
        var delta_y = e.getDelta().y;
        var delta = Math.sqrt((delta_x * delta_x) + (delta_y * delta_y));
        console.log("=============touch move: ", delta);
        var point = e.touch.getLocation();
        point = this.node.convertToNodeSpaceAR(point);
        this._addCircle(point);
    };
    InteractBlotItem.prototype.touchEnd = function (e) {
        e.stopPropagation();
        if (e.getID() > 0) {
            return;
        }
        var point = e.touch.getLocation();
        point = this.node.convertToNodeSpaceAR(point);
        this._addCircle(point);
    };
    InteractBlotItem.prototype.touchCancel = function (e) {
        e.stopPropagation();
        if (e.getID() > 0) {
            return;
        }
    };
    InteractBlotItem.prototype._addCircle = function (point) {
        var stencil = this.mask._clippingStencil;
        var color = cc.color(255, 255, 255, 0);
        var p = this.dealPoints(point);
        stencil.drawPoly(p, color, 0, color);
        if (!CC_JSB) {
            cc.renderer.childrenOrderDirty = true;
        }
    };
    InteractBlotItem.prototype.dealPoints = function (point) {
        var curPoints = JSON.parse(JSON.stringify(this.eraserPoints));
        for (var index = 0; index < curPoints.length; index++) {
            var element = curPoints[index];
            curPoints[index].x = curPoints[index].x + point.x;
            curPoints[index].y = curPoints[index].y + point.y;
        }
        return curPoints;
    };
    __decorate([
        property(cc.Mask)
    ], InteractBlotItem.prototype, "mask", void 0);
    __decorate([
        property(cc.Sprite)
    ], InteractBlotItem.prototype, "blotSprite", void 0);
    __decorate([
        property(cc.Node)
    ], InteractBlotItem.prototype, "touchNode", void 0);
    InteractBlotItem = __decorate([
        ccclass
    ], InteractBlotItem);
    return InteractBlotItem;
}(cc.Component));
exports.default = InteractBlotItem;

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
        //# sourceMappingURL=InteractBlotItem.js.map
        