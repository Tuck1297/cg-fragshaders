#version 300 es

precision mediump float;

in vec2 texcoord;

uniform sampler2D image;

out vec4 FragColor;

void main() {

    vec4 val = texture(image, texcoord); 

    float red = 0.299 * val.r;
    float blue = 0.114*val.b;
    float green = 0.587*val.g; 

    float luminance = red+blue+green; 

    FragColor = vec4(luminance, luminance, luminance, 1.0);

    //FragColor = texture(image, texcoord);
}
