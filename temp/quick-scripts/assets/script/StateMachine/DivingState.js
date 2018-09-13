(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/StateMachine/DivingState.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'db3cem6pzJGn68TuW7lH4IL', 'DivingState', __filename);
// script/StateMachine/DivingState.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BaseState_1 = require("./BaseState");
var DivingState = /** @class */ (function (_super) {
    __extends(DivingState, _super);
    function DivingState(fsm) {
        return _super.call(this, fsm) || this;
    }
    DivingState.prototype.begin = function () {
    };
    return DivingState;
}(BaseState_1.BaseState));
exports.DivingState = DivingState;

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
        //# sourceMappingURL=DivingState.js.map
        