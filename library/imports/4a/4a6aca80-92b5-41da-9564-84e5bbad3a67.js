"use strict";
cc._RF.push(module, '4a6acqAkrVB2pVkhOW7rTpn', 'ShaderReaderCom');
// script/shader/ShaderReaderCom.ts

Object.defineProperty(exports, "__esModule", { value: true });
var default_vert = "\n    attribute vec4 a_position;\n    attribute vec2 a_texCoord;\n    attribute vec4 a_color;\n    varying vec2 v_texCoord;\n    varying vec4 v_fragmentColor;\n    void main()\n    {\n        gl_Position = CC_PMatrix * a_position;\n        v_fragmentColor = a_color;\n        v_texCoord = a_texCoord;\n    }\n    ";
var gray_frag = "\n    #ifdef GL_ES\n    precision mediump float;\n    #endif\n    varying vec4 v_fragmentColor;\n    varying vec2 v_texCoord;\n    void main()\n    {\n        vec4 c = v_fragmentColor * texture2D(CC_Texture0, v_texCoord);\n        gl_FragColor.xyz = vec3(0.2126*c.r + 0.7152*c.g + 0.0722*c.b);\n        gl_FragColor.w = c.w;\n    }\n    ";
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ShaderReaderCom = /** @class */ (function (_super) {
    __extends(ShaderReaderCom, _super);
    function ShaderReaderCom() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.flagShader = "";
        _this.startOnLoad = false;
        _this.frag_glsl = {
            default: "",
            visible: false,
        };
        _this._isStarted = false;
        _this.uniformMap = null;
        _this._program = null;
        return _this;
    }
    ShaderReaderCom.prototype.onLoad = function () {
        this.initUnformData();
        var self = this;
        cc.loader.loadRes(self.flagShader, function (err, txt) {
            if (err) {
                cc.log(err);
            }
            else {
                self.frag_glsl = txt;
                console.log("KKK" + self.frag_glsl);
            }
        });
        if (this.startOnLoad) {
            this.startShader();
        }
    };
    ShaderReaderCom.prototype.initUnformData = function () {
        this.uniformMap = {
            time: {
                type: "float",
                value: 0.0
            }
        };
    };
    ShaderReaderCom.prototype.startShader = function () {
        var _this = this;
        this.scheduleOnce(function () {
            _this.initUniform();
        }, 0);
    };
    ShaderReaderCom.prototype.initUniform = function () {
        if (this._isStarted) {
            console.log("startShader warning ==> 重复启动");
            return;
        }
        if (cc.sys.isNative) {
            console.log("use native GLProgram");
            this._program = new cc.GLProgram();
            this._program.initWithString(default_vert, this.frag_glsl);
            // this._program.initWithString(default_vert, gray_frag);
            this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION, cc.macro.VERTEX_ATTRIB_POSITION);
            this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR, cc.macro.VERTEX_ATTRIB_COLOR);
            this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS);
            this._program.link();
            this._program.updateUniforms();
        }
        if (cc.sys.isNative) {
            var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(this._program);
            for (var key in this.uniformMap) {
                this.setUniform(glProgram_state, this.uniformMap[key].type, key, this.uniformMap[key].value);
            }
        }
        this.setProgram(this.node._sgNode, this._program);
        this._isStarted = true;
    };
    ShaderReaderCom.prototype.updateUniform = function () {
        if (this._program) {
            this._program.use();
            if (cc.sys.isNative) {
                var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(this._program);
                for (var key in this.uniformMap) {
                    this.setUniform(glProgram_state, this.uniformMap[key].type, key, this.uniformMap[key].value);
                }
            }
        }
    };
    ShaderReaderCom.prototype.initCustomUniform = function (map) {
        for (var key in map) {
            this.uniformMap[key] = map[key];
        }
    };
    ShaderReaderCom.prototype.updateCustomUniform = function (map) {
        for (var key in map) {
            if (!this.uniformMap[key]) {
                console.log('updateCustomUniform error ==> ' + '"' + key + '"' + '这个自定义key没有被初始化');
                continue;
            }
            this.uniformMap[key] = map[key];
        }
    };
    ShaderReaderCom.prototype.setUniform = function (gps, t, k, v) {
        switch (t) {
            case "float":
                gps.setUniformFloat(k, v);
                break;
            case "vec2":
                gps.setUniformVec2(k, v);
                break;
            case "vec3":
                gps.setUniformVec3(k, v);
                break;
            case "vec4":
                gps.setUniformVec4(k, v);
                break;
            default:
                console.log('shader error ==> uniform无"' + type + '"类型');
        }
    };
    ShaderReaderCom.prototype.setProgram = function (node, program) {
        if (cc.sys.isNative) {
            var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(program);
            node.setGLProgramState(glProgram_state);
        }
        var children = node.children;
        if (!children)
            return;
        for (var i = 0; i < children.length; i++) {
            this.setProgram(children[i], program);
        }
    };
    ShaderReaderCom.prototype.update = function (dt) {
        if (this._isStarted) {
            this.uniformMap.time.value += dt;
            this.updateUniform();
        }
    };
    __decorate([
        property
    ], ShaderReaderCom.prototype, "flagShader", void 0);
    __decorate([
        property
    ], ShaderReaderCom.prototype, "startOnLoad", void 0);
    ShaderReaderCom = __decorate([
        ccclass
    ], ShaderReaderCom);
    return ShaderReaderCom;
}(cc.Component));
exports.default = ShaderReaderCom;
/*

     【 帮助文档 】

<<< glsl代码模板 >>>

#ifdef GL_ES
precision mediump float;
#endif
varying vec2 v_texCoord;
uniform float time;
void main(){}

<<< 自定义uniform的使用格式 >>>
uMap = {
    u0:{
        type:"float",
        value: 0.0,
    },
    u1:{
        type:"vec2",
        value: {x:0.0,y:0.0},
    }
}
initCustomUniform来初始化自定义的uniform参数
startShader启动shader
updateCustomUniform更新uniform参数

*/

cc._RF.pop();