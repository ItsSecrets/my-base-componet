#ifdef GL_ES
precision mediump float;
#endif
varying vec4 v_fragmentColor;
varying vec2 v_texCoord;

void main()
{   
    float edge = 0.04;
    float dis = 0.0;
    vec2 texCoord = v_texCoord; 
    if ( texCoord.x < edge )
    {
        if ( texCoord.y < edge )
        {
            dis = distance( texCoord, vec2(edge, edge) );
        }
        if ( texCoord.y > (1.0 - edge) )
        {
            dis = distance( texCoord, vec2(edge, (1.0 - edge)) );
        }
    }
    else if ( texCoord.x > (1.0 - edge) )
    {
        if ( texCoord.y < edge )
        {
            dis = distance( texCoord, vec2((1.0 - edge), edge ) );
        }
        if ( texCoord.y > (1.0 - edge) )
        {
            dis = distance( texCoord, vec2((1.0 - edge), (1.0 - edge) ) );
        }
    }

    if(dis > 0.001)
    {
        vec4 color = texture2D( CC_Texture0,texCoord);
        float gap = edge * 0.1;
        if(dis <= edge - gap)
        {
            gl_FragColor = color;
        }
        else if(dis <= edge)
        {
            // vec4 c = color * (gap - (dis - edge + gap))/gap;
            // gl_FragColor = vec4(c.x, c.y, c.z, 0);

            // 平滑过渡
            float t = smoothstep(0.,gap,edge-dis);
            vec4 color = texture2D( CC_Texture0,texCoord);
            gl_FragColor = vec4(color.rgb,0);
        }
    }
    else
    {   
        gl_FragColor = texture2D( CC_Texture0,texCoord);
    }
}


