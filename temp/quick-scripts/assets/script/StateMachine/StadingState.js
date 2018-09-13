(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/StateMachine/StadingState.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '1106db1G0NPNoXuHnhCQPge', 'StadingState', __filename);
// script/StateMachine/StadingState.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BaseState_1 = require("./BaseState");
var StadingState = /** @class */ (function (_super) {
    __extends(StadingState, _super);
    function StadingState(fsm) {
        return _super.call(this, fsm) || this;
    }
    StadingState.prototype.begin = function () {
    };
    return StadingState;
}(BaseState_1.BaseState));
exports.StadingState = StadingState;

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
        //# sourceMappingURL=StadingState.js.map
        