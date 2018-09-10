
let default_vert = `
    attribute vec4 a_position;
    attribute vec2 a_texCoord;
    attribute vec4 a_color;
    varying vec2 v_texCoord;
    varying vec4 v_fragmentColor;
    void main()
    {
        gl_Position = CC_PMatrix * a_position;
        v_fragmentColor = a_color;
        v_texCoord = a_texCoord;
    }
    `;

let gray_frag = `
    #ifdef GL_ES
    precision mediump float;
    #endif
    varying vec4 v_fragmentColor;
    varying vec2 v_texCoord;
    void main()
    {
        vec4 c = v_fragmentColor * texture2D(CC_Texture0, v_texCoord);
        gl_FragColor.xyz = vec3(0.2126*c.r + 0.7152*c.g + 0.0722*c.b);
        gl_FragColor.w = c.w;
    }
    `;

const { ccclass, property } = cc._decorator;

@ccclass
export default class ShaderReaderCom extends cc.Component {
    @property
    flagShader: string = "";

    @property
    startOnLoad = false;

    frag_glsl = {
        default: "",
        visible: false,
    };

    _isStarted = false;

    uniformMap = null;
    _program = null;
    onLoad() {
        this.initUnformData();
        var self = this;
        cc.loader.loadRes(self.flagShader, function (err, txt) {
            if (err) {
                cc.log(err)
            } else {
                self.frag_glsl = txt;
                console.log("KKK" + self.frag_glsl);
            }
        });
        if (this.startOnLoad) {
            this.startShader();
        }
    }
    initUnformData() {
        this.uniformMap = {
            time: {
                type: "float",
                value: 0.0
            }
        }
    }
    startShader() {
        this.scheduleOnce(() => {
            this.initUniform();
        }, 0);
    }

    initUniform() {
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
    }

    updateUniform() {
        if (this._program) {
            this._program.use();
            if (cc.sys.isNative) {
                var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(this._program);
                for (var key in this.uniformMap) {
                    this.setUniform(glProgram_state, this.uniformMap[key].type, key, this.uniformMap[key].value);
                }
            }
        }
    }

    initCustomUniform(map) {
        for (var key in map) {
            this.uniformMap[key] = map[key];
        }
    }

    updateCustomUniform(map: any) {
        for (var key in map) {
            if (!this.uniformMap[key]) {
                console.log('updateCustomUniform error ==> ' + '"' + key + '"' + '这个自定义key没有被初始化');
                continue;
            }
            this.uniformMap[key] = map[key];
        }
    }

    setUniform(gps, t, k, v) {
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
    }

    setProgram(node, program) {
        if (cc.sys.isNative) {
            var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(program);
            node.setGLProgramState(glProgram_state);
        }
        var children = node.children;
        if (!children) return;
        for (var i = 0; i < children.length; i++) {
            this.setProgram(children[i], program);
        }
    }

    update(dt) {
        if (this._isStarted) {
            this.uniformMap.time.value += dt;
            this.updateUniform();
        }
    }
}

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
