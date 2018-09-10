(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/Helloworld.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e1b90/rohdEk4SdmmEZANaD', 'Helloworld', __filename);
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
        return _this;
    }
    Helloworld.prototype.onLoad = function () {
        // this.initEraserEffect();
        // this.initMohuPrefab();
        this.initStateMachine();
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
    __decorate([
        property(cc.Prefab)
    ], Helloworld.prototype, "cardEffcPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], Helloworld.prototype, "mohuPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], Helloworld.prototype, "machinePrefab", void 0);
    Helloworld = __decorate([
        ccclass
    ], Helloworld);
    return Helloworld;
}(cc.Component));
exports.default = Helloworld;

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
        //# sourceMappingURL=Helloworld.js.map
        