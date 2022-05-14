#version 300 es

precision mediump float;

in vec2 texcoord;

uniform sampler2D image;

out vec4 FragColor;

void main() {

    vec4 color = texture(image, texcoord); 

    float red = round(color.r * 4.0); 
    float red_rounded = red/4.0; 

    float blue = round(color.b * 4.0); 
    float blue_rounded = blue/4.0;

    float green = round(color.g * 4.0); 
    float green_rounded = green/4.0;

    FragColor = vec4(red_rounded, green_rounded,blue_rounded, 1.0);   

    //FragColor = texture(image, texcoord);
}
