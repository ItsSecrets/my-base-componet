"use strict";
cc._RF.push(module, '1106db1G0NPNoXuHnhCQPge', 'StadingState');
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