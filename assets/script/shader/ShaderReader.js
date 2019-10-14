
var _default_vert = `
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
var _default_vert_no_mvp = `
    attribute vec4 a_position;
    attribute vec2 a_texCoord;
    attribute vec4 a_color;
    varying vec2 v_texCoord;
    varying vec4 v_fragmentColor;
    void main()
    {
        gl_Position = CC_PMatrix  * a_position;
        v_fragmentColor = a_color;
        v_texCoord = a_texCoord;
    }
`;

var _default_frag_color = `
    varying vec2 v_texCoord;
    varying vec4 v_fragmentColor;
    void main(){
        vec4 c = v_fragmentColor * texture2D(CC_Texture0, v_texCoord);
        gl_FragColor.xyz = vec3(0.2126*c.r + 0.7152*c.g + 0.0722*c.b);
        gl_FragColor.w = c.w;
    }
`;

var RenderMode = cc.Enum({
    NORMAL : 0,
    FBO : 1,
});

cc.Class({
    extends: cc.Component,

    properties: {
        enable:true,
        flagShader:"",
        startOnLoad: false,
        frag_glsl:{
            default:"",
            visible:false,
        },
        _isStarted: false,

        mode:{
            default : RenderMode.NORMAL,
            type : cc.Enum(RenderMode)

        }
    },

    handleFob: function(){
        this.renderTexture = cc.RenderTexture.create(cc.director.getWinSize().width,cc.director.getWinSize().height);
        this.nodeFbo = new cc.Node();
        this.nodeFbo.parent = this.node.parent;
        this.nodeFbo.x = cc.director.getWinSize().width/2;
        this.nodeFbo.y = cc.director.getWinSize().height/2;
        this.nodeFbo._sgNode.addChild(this.renderTexture);
    },

    onLoad: function () {

        if(!this.enable) return;

        if(this.mode == 1){
            this.handleFob();
        }

        this.initUnformData();
        cc.loader.loadRes(this.flagShader, (err, txt) => {
            if (err) {
                cc.log(err)
            } else {
                this.frag_glsl = txt;
                // console.log("KKK" + this.frag_glsl);
            }
        });
        if(this.startOnLoad){
            this.startShader();
        }
    },

    initUnformData:function(){
        this.uniformMap = {
            time:{
                type: "float",
                value: 0.0
            }
        }

    },

    startShader: function(){
        this.scheduleOnce(()=>{
            this.initUniform();
        },0);
    },

    pauseShader:function () {
        this._isStarted = false;
    },

    resumeShader:function () {
        this._isStarted = true;
    },

    
    initUniform: function(){
        if(this._isStarted){
            console.log("startShader warning ==> 重复启动");
            return;
        }
        if (cc.sys.isNative) {
            console.log("use native GLProgram");
            this._program = new cc.GLProgram();
            this._program.initWithString(_default_vert_no_mvp, this.frag_glsl);
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
        this.setProgram( (this.mode == 0 ? this.node : this.nodeFbo)._sgNode ,this._program );
        this._isStarted = true;
    },

    updateUniform: function (data) {
        if(this._program){
            this._program.use();
            if(cc.sys.isNative){
                var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(this._program);
                for (var key in this.uniformMap) {
                    this.setUniform(glProgram_state, this.uniformMap[key].type, key, this.uniformMap[key].value);
                }
            }
        }
    },

    initCustomUniform: function(map){
        for(var key in map){
            this.uniformMap[key] = map[key];
        }
    },

    updateCustomUniform: function(map){
        for(var key in map){
            if(!this.uniformMap[key]){
                console.log('updateCustomUniform error ==> '+'"'+key+'"'+'这个自定义key没有被初始化');
                continue;
            }
            this.uniformMap[key] = map[key];
        }
    },

    setUniform: function(gps, t, k, v){
        switch(t){
            case "float":
                gps.setUniformFloat(k,v);
                break;
            case "int":
                gps.setUniformInt(k, v);
                break;
            case "vec2":
                gps.setUniformVec2(k,v);
                break;
            case "vec3":
                gps.setUniformVec3(k,v);
                break;
            case "vec4":
                gps.setUniformVec4(k,v);
                break;
            case "texture":
                gps.setUniformTexture(k,v);
                break;
            default:
                console.log('shader error ==> uniform无"'+t+'"类型');
        }
    },

    setProgram:function (node, program) {
        if (cc.sys.isNative) {
            var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(program);
            node.setGLProgramState(glProgram_state);
        }
        var children = node.children;
        if (!children) return;
        for (var i = 0; i < children.length; i++){
            this.setProgram(children[i], program);
        } 
    },

    update: function(dt){
        if(this._isStarted){
            this.uniformMap.time.value += dt;
            this.updateUniform();

            if(this.mode == 1){
                this.renderTexture.begin();
                this.node._sgNode.visit();
                this.renderTexture.end();
            }
        }
    }

});

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






