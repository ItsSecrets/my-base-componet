"use strict";
cc._RF.push(module, 'db3cem6pzJGn68TuW7lH4IL', 'DivingState');
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