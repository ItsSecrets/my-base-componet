"use strict";
cc._RF.push(module, '965a3PcbH5FabkcFxqbtRYN', 'event_mgr');
// script/event/event_mgr.ts

Object.defineProperty(exports, "__esModule", { value: true });
var event_mgr = /** @class */ (function () {
    function event_mgr() {
        this.listeners = {};
    }
    event_mgr.get_inst = function () {
        if (!this.inst) {
            this.inst = new event_mgr();
        }
        return this.inst;
    };
    event_mgr.prototype.fire = function (event) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        var cbs = this.listeners[event];
        if (!cbs) {
            return;
        }
        for (var i = 0, len = cbs.length; i < len; i += 2) {
            var cb = cbs[i];
            var host = cbs[i + 1];
            cb.call.apply(cb, [host].concat(params));
        }
    };
    event_mgr.prototype.add = function (event, cb, host) {
        if (host === void 0) { host = null; }
        var cbs = this.listeners[event];
        if (!cbs) {
            this.listeners[event] = cbs = [];
        }
        cbs.push(cb, host);
    };
    event_mgr.prototype.remove = function (event, cb) {
        var cbs = this.listeners[event];
        if (!cbs) {
            return;
        }
        var index = cbs.indexOf(cb);
        if (index < 0) {
            cc.warn("event_mgr remove", event, ", but cb not exists!");
            return;
        }
        cbs.splice(index, 2);
    };
    event_mgr.prototype.clear = function () {
        for (var key in this.listeners) {
            this.listeners[key].length = 0;
        }
        this.listeners = {};
    };
    return event_mgr;
}());
exports.event_mgr = event_mgr;
/**事件名称定义*/
var Event_Name;
(function (Event_Name) {
    Event_Name[Event_Name["USER_INFO_INIT"] = 0] = "USER_INFO_INIT";
    Event_Name[Event_Name["COIN_CHANGED"] = 1] = "COIN_CHANGED";
    Event_Name[Event_Name["PASS_CHANGED"] = 2] = "PASS_CHANGED";
    Event_Name[Event_Name["GRADE_CHANGED"] = 3] = "GRADE_CHANGED";
    Event_Name[Event_Name["SHAREHINT_CHANGED"] = 4] = "SHAREHINT_CHANGED";
    Event_Name[Event_Name["GAME_LEVEL_CHANGED"] = 5] = "GAME_LEVEL_CHANGED";
    Event_Name[Event_Name["UI_SHOW"] = 6] = "UI_SHOW";
    Event_Name[Event_Name["UI_HIDE"] = 7] = "UI_HIDE";
})(Event_Name = exports.Event_Name || (exports.Event_Name = {}));

cc._RF.pop();