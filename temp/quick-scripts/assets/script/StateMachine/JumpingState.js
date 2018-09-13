(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/StateMachine/JumpingState.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '98199XpaX9LV4/DUmrPZN3z', 'JumpingState', __filename);
// script/StateMachine/JumpingState.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BaseState_1 = require("./BaseState");
var JumpingState = /** @class */ (function (_super) {
    __extends(JumpingState, _super);
    function JumpingState(fsm) {
        return _super.call(this, fsm) || this;
    }
    JumpingState.prototype.begin = function () {
    };
    return JumpingState;
}(BaseState_1.BaseState));
exports.JumpingState = JumpingState;

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
        //# sourceMappingURL=JumpingState.js.map
        