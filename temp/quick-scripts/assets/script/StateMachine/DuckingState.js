(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/StateMachine/DuckingState.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '92d3ch82adOk6OgSR/d4uVb', 'DuckingState', __filename);
// script/StateMachine/DuckingState.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BaseState_1 = require("./BaseState");
var DuckingState = /** @class */ (function (_super) {
    __extends(DuckingState, _super);
    function DuckingState(fsm) {
        return _super.call(this, fsm) || this;
    }
    DuckingState.prototype.begin = function () {
    };
    return DuckingState;
}(BaseState_1.BaseState));
exports.DuckingState = DuckingState;

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
        //# sourceMappingURL=DuckingState.js.map
        