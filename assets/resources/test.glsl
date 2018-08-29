#ifdef GL_ES
precision mediump float;
#endif
varying vec2 v_texCoord;
varying vec4 v_fragmentColor;

uniform float time;
uniform vec2  pos;
void main(){
    vec4 c = v_fragmentColor * texture2D(CC_Texture0, 1.0-v_texCoord);
    // gl_FragColor.a = pos.x;

    // if((v_texCoord.x > pos.x-0.1) && (v_texCoord.x < pos.x+0.1)){
    //     gl_FragColor.a = 0.2;
    //     gl_FragColor.rgb = vec3(0.0 , 0.0 , 0.0);
        
    // }else{
    //     gl_FragColor.a = 1.0;
    //     gl_FragColor = c;
        
    // }
  
    if(distance(v_texCoord, pos) < 0.1){
        gl_FragColor.a = 0.2;
        gl_FragColor.rgb = vec3(0.0 , 0.0 , 0.0);
        
    }else{
        gl_FragColor.a = 1.0;
        gl_FragColor = c;
        
    }
}

