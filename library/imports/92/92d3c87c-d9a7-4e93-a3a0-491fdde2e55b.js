"use strict";
cc._RF.push(module, '92d3ch82adOk6OgSR/d4uVb', 'DuckingState');
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