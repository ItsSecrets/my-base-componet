"use strict";
cc._RF.push(module, '4fc11nncYtCWbwpp9sscFez', 'EraserEffect');
// script/shader/EraserEffect.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.uMap = {
            pos: {
                type: "vec2",
                value: { x: 0.0, y: 0.0 },
            }
        };
        return _this;
    }
    NewClass.prototype.onLoad = function () {
        console.log("========onLoad========");
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        this.shaderReader = this.node.getComponent("ShaderReaderCom");
        this.shaderReader.initCustomUniform(this.uMap);
        this.shaderReader.startShader();
    };
    NewClass.prototype.onDestroy = function () {
        this.node.off(cc.Node.EventType.TOUCH_START, this.touchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
    };
    NewClass.prototype.start = function () {
    };
    // update (dt) {}
    NewClass.prototype.touchStart = function (event) {
        console.log("111");
        console.log(event);
    };
    NewClass.prototype.touchMove = function (event) {
        var touchPos = this.node.convertToNodeSpaceAR(event.getLocation());
        var x = (touchPos.x + this.node.width / 2) / this.node.width;
        this.uMap.pos.value.x = (touchPos.x + this.node.width / 2) / this.node.width;
        this.uMap.pos.value.y = (touchPos.y + this.node.height / 2) / this.node.height;
        this.shaderReader.updateCustomUniform(this.uMap);
    };
    NewClass.prototype.touchEnd = function (event) {
        console.log("333");
    };
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();