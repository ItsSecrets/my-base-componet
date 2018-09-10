"use strict";
cc._RF.push(module, '95c17rFj8ZIW6/4a13e0E15', 'GrayEffect');
// script/shader/GrayEffect.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var default_vert = "\n    attribute vec4 a_position;\n    attribute vec2 a_texCoord;\n    attribute vec4 a_color;\n    varying vec2 v_texCoord;\n    varying vec4 v_fragmentColor;\n    void main()\n    {\n        gl_Position = CC_PMatrix * a_position;\n        v_fragmentColor = a_color;\n        v_texCoord = a_texCoord;\n    }\n    ";
var gray_frag = "\n    #ifdef GL_ES\n    precision mediump float;\n    #endif\n    varying vec4 v_fragmentColor;\n    varying vec2 v_texCoord;\n    void main()\n    {\n        vec4 c = v_fragmentColor * texture2D(CC_Texture0, v_texCoord);\n        gl_FragColor.xyz = vec3(0.2126*c.r + 0.7152*c.g + 0.0722*c.b);\n        gl_FragColor.w = c.w;\n    }\n    ";
var GrayEffect = /** @class */ (function (_super) {
    __extends(GrayEffect, _super);
    function GrayEffect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isAllChildrenUse = false;
        return _this;
    }
    GrayEffect.prototype.onLoad = function () {
        this.grayShader();
    };
    // 变灰shader
    GrayEffect.prototype.grayShader = function () {
        this.program = new cc.GLProgram();
        if (cc.sys.isNative) {
            this.program.initWithString(default_vert, gray_frag);
            this.program.link();
            this.program.updateUniforms();
        }
        else {
            this.program.initWithVertexShaderByteArray(default_vert, gray_frag);
            this.program.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION, cc.macro.VERTEX_ATTRIB_POSITION);
            this.program.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR, cc.macro.VERTEX_ATTRIB_COLOR);
            this.program.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS);
            this.program.link();
            this.program.updateUniforms();
        }
        if (this.isAllChildrenUse) {
            this.setProgram(this.node._sgNode, this.program);
        }
        else {
            this.setProgram(this.node.getComponent(cc.Sprite)._sgNode, this.program);
        }
    };
    GrayEffect.prototype.setProgram = function (node, program) {
        if (cc.sys.isNative) {
            var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(program);
            node.setGLProgramState(glProgram_state);
        }
        else {
            node.setShaderProgram(program);
        }
        var children = node.children;
        if (!children)
            return;
        for (var i = 0; i < children.length; i++) {
            this.setProgram(children[i], program);
        }
    };
    // 恢复默认shader
    GrayEffect.prototype.resetProgram = function (node) {
        node.getComponent(cc.Sprite)._sgNode.setState(0);
        var children = node.children;
        if (!children)
            return;
        for (var i = 0; i < children.length; i++) {
            this.resetProgram(children[i]);
        }
    };
    GrayEffect.prototype.resetShader = function () {
        if (this.isAllChildrenUse) {
            this.resetProgram(this.node);
        }
        else {
            this.node.getComponent(cc.Sprite)._sgNode.setState(0);
        }
    };
    __decorate([
        property
    ], GrayEffect.prototype, "isAllChildrenUse", void 0);
    GrayEffect = __decorate([
        ccclass
    ], GrayEffect);
    return GrayEffect;
}(cc.Component));
exports.default = GrayEffect;

cc._RF.pop();