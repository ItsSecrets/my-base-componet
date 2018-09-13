"use strict";
cc._RF.push(module, '98199XpaX9LV4/DUmrPZN3z', 'JumpingState');
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