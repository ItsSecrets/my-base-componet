(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/StateMachine/fsm.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4bf54zWBMlBeIcng4LRGJCD', 'fsm', __filename);
// script/StateMachine/fsm.ts

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 增加简单状态机
 */
var DivingState_1 = require("./DivingState");
var DuckingState_1 = require("./DuckingState");
var JumpingState_1 = require("./JumpingState");
var StadingState_1 = require("./StadingState");
var fsm = /** @class */ (function () {
    function fsm(parameters) {
        this.stateMap = null;
        this.currentState = null;
        this.stateMap = new Map();
    }
    fsm.prototype.initState = function () {
        this.stateMap.set(IState.STATE_STANDING, new StadingState_1.StadingState(this));
        this.stateMap.set(IState.STATE_JUMPING, new JumpingState_1.JumpingState(this));
        this.stateMap.set(IState.STATE_DUCKING, new DuckingState_1.DuckingState(this));
        this.stateMap.set(IState.STATE_DIVING, new DivingState_1.DivingState(this));
    };
    fsm.prototype.changeState = function (state) {
        if (this.currentState) {
            this.currentState.end();
        }
        this.currentState = this.stateMap.get(state);
        if (this.currentState) {
            this.currentState.begin();
        }
    };
    fsm.prototype.update = function (dt) {
        if (this.currentState) {
            this.currentState.update(dt);
        }
    };
    return fsm;
}());
exports.fsm = fsm;
var IState;
(function (IState) {
    IState[IState["STATE_STANDING"] = 0] = "STATE_STANDING";
    IState[IState["STATE_JUMPING"] = 1] = "STATE_JUMPING";
    IState[IState["STATE_DUCKING"] = 2] = "STATE_DUCKING";
    IState[IState["STATE_DIVING"] = 3] = "STATE_DIVING";
})(IState = exports.IState || (exports.IState = {}));

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
        //# sourceMappingURL=fsm.js.map
        