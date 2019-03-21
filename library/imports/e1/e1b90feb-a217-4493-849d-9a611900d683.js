"use strict";
cc._RF.push(module, 'e1b90/rohdEk4SdmmEZANaD', 'Helloworld');
// script/Helloworld.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Helloworld = /** @class */ (function (_super) {
    __extends(Helloworld, _super);
    function Helloworld() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cardEffcPrefab = null;
        _this.mohuPrefab = null;
        _this.machinePrefab = null;
        _this.listViewPrefab = null;
        _this.screenCutPrefab = null;
        return _this;
    }
    Helloworld.prototype.onLoad = function () {
        // this.initEraserEffect();
        // this.initMohuPrefab();
        // this.initStateMachine();
        // this.initListVViewDemo();
        this.initScreenCutDemo();
    };
    Helloworld.prototype.start = function () {
    };
    // 橡皮擦效果
    Helloworld.prototype.initEraserEffect = function () {
        var eraserNode = cc.instantiate(this.cardEffcPrefab);
        eraserNode.parent = this.node;
    };
    Helloworld.prototype.initMohuPrefab = function () {
        var mohuNode = cc.instantiate(this.mohuPrefab);
        mohuNode.parent = this.node;
    };
    Helloworld.prototype.initStateMachine = function () {
        var machineNode = cc.instantiate(this.machinePrefab);
        machineNode.parent = this.node;
    };
    Helloworld.prototype.initListVViewDemo = function () {
        var listViewNode = cc.instantiate(this.listViewPrefab);
        listViewNode.parent = this.node;
    };
    Helloworld.prototype.initScreenCutDemo = function () {
        var screenCutNode = cc.instantiate(this.screenCutPrefab);
        screenCutNode.parent = this.node;
    };
    __decorate([
        property(cc.Prefab)
    ], Helloworld.prototype, "cardEffcPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], Helloworld.prototype, "mohuPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], Helloworld.prototype, "machinePrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], Helloworld.prototype, "listViewPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], Helloworld.prototype, "screenCutPrefab", void 0);
    Helloworld = __decorate([
        ccclass
    ], Helloworld);
    return Helloworld;
}(cc.Component));
exports.default = Helloworld;

cc._RF.pop();