#ifdef GL_ES
precision mediump float;
#endif
varying vec2 v_texCoord;
varying vec4 v_fragmentColor;

uniform float time;
uniform float  dt;
uniform vec2  pos;
void main(){
    float x = v_texCoord.x + dt;
    if(x > 1.0){
       x = x - 1.0; 
    }
    gl_FragColor = texture2D(CC_Texture0, vec2(x, v_texCoord.y));
}

