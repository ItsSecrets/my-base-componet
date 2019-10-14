varying vec2 v_texCoord;
varying vec4 v_fragmentColor;
uniform float time;
uniform float gray;
void main(){
	vec4 c = v_fragmentColor * texture2D(CC_Texture0, v_texCoord);
	if(gray == 1.0){
		gl_FragColor.xyzw = c;
	}else{
		gl_FragColor.xyz = vec3(0.2126*c.r + 0.7152*c.g + 0.0722*c.b);
		gl_FragColor.w = c.w;
	}
}