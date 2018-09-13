(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/StateMachine/BaseState.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6c8a7tV2oRM+KFOsNpB0RnF', 'BaseState', __filename);
// script/StateMachine/BaseState.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BaseState = /** @class */ (function () {
    function BaseState(fsm) {
        this.fsm = null;
    }
    BaseState.prototype.end = function () {
    };
    BaseState.prototype.update = function (dt) {
    };
    return BaseState;
}());
exports.BaseState = BaseState;

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
        //# sourceMappingURL=BaseState.js.map
        