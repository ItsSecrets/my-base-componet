(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/StateMachine/fsm-test.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '50b7d9LapRCjZ42ZOyaYhYO', 'fsm-test', __filename);
// script/StateMachine/fsm-test.ts

Object.defineProperty(exports, "__esModule", { value: true });
var StateMachine = require("./state-machine");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NewClass.prototype.onLoad = function () {
        var fsm = new StateMachine({
            init: 'gas',
            transitions: [
                { name: 'melt', from: 'solid', to: 'liquid' },
                { name: 'freeze', from: 'liquid', to: 'solid' },
                { name: 'vaporize', from: 'liquid', to: 'gas' },
                { name: 'condense', from: 'gas', to: 'liquid' }
            ],
            methods: {
                onMelt: function () {
                    console.log('11111 ' + '  current state ' + fsm.state);
                    setTimeout(function () {
                        fsm.vaporize();
                    }, 1);
                }.bind(this),
                onFreeze: function () {
                    console.log('22222 ' + '  current state ' + fsm.state);
                    setTimeout(function () {
                        fsm.melt();
                    }, 1);
                }.bind(this),
                onVaporize: function () {
                    console.log('3333 ' + '  current state ' + fsm.state);
                    setTimeout(function () {
                        fsm.condense();
                    }, 1);
                }.bind(this),
                onCondense: function () {
                    console.log('4444' + '  current state ' + fsm.state);
                    setTimeout(function () {
                        fsm.freeze();
                    }, 1);
                }.bind(this)
            }
        });
        console.log("==========", fsm.state);
        fsm.condense();
    };
    NewClass.prototype.start = function () {
    };
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

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
        //# sourceMappingURL=fsm-test.js.map
        