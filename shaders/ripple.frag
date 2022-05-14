#version 300 es

precision mediump float;

in vec2 texcoord;

uniform float time;
uniform sampler2D image;

out vec4 FragColor;

void main() {


    vec2 scale_tex_coord = 2.0 * texcoord - 1.0;

    float radius = length(scale_tex_coord);

    vec2 tex_coor_offset = texcoord * (sin (radius * 30.0 - time * 5.0) + 0.5) / 60.0;

    FragColor = texture(image, texcoord + tex_coor_offset);
}
