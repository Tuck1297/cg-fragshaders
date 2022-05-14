#version 300 es

precision mediump float;

in vec2 texcoord;

uniform sampler2D image;

out vec4 FragColor;


void main() {
    
    vec2 scale_tex_coord = 2.0 * texcoord - 1.0; 
    
    float theta = atan(scale_tex_coord.y, scale_tex_coord.x);

    float magnitude = length(scale_tex_coord);

    float radius = pow(magnitude, 1.5);

    vec2 textureCalc = vec2(radius * cos(theta), radius*sin(theta));

    vec2 final_tex = 0.5 * (textureCalc+1.0);

    FragColor = texture(image,final_tex);
    
    //FragColor = texture(image, texcoord);
}
