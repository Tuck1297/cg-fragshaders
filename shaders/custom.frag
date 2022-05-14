#version 300 es

precision mediump float;

in vec2 texcoord;

uniform float width;
uniform float height;
uniform sampler2D image;
uniform float time; 
uniform float weights[20];

float offset[5] = float[](0.0, 1.0, 2.0, 3.0, 4.0);
float weight[5] = float[](0.2270270270, 0.1945945946, 0.1216216216,
                                  0.0540540541, 0.0162162162);

////float kernal[25] = float[](
//    0.0,0.03,0.03,0.03,0.0,
//    0.03,0.06,0.12,0.06,0.03,
//    0.03,0.12,0.22,0.12,0.03,
//    0.03,0.06,0.12,0.06,0.03,
//    0.0,0.03,0.03,0.03,0.0);

//float kernal[25] = float[](
//0.0369,	0.0392,	0.0400,	0.0392,	0.0369,
//0.0392,	0.0416,	0.0424,	0.0416,	0.0392,
//0.0400,	0.0424,	0.0433,	0.0424,	0.0400,
//0.0392,	0.0416,	0.0424,	0.0416,	0.0392,
//0.0369,	0.0392,	0.0400,	0.0392,	0.0369);
//
//// will always be relative to the size of the kernal table 
//// helps position the offset in each for loop 
//float kernal_offset_position[5] = float[](-1.0,-2.0,0.0,2.0,1.0); 
//
//int kernalSizeInt = 5;  // will always be relative to size of kernal table
//float kernalSizeFl = 5.0;  // will always be relative to size of kernal table

float kernal[121] = float[](
0.0071,	0.0074,	0.0077,	0.0079,	0.0080,	0.0080,	0.0080,	0.0079,	0.0077,	0.0074,	0.0071,
0.0074,	0.0078,	0.0080,	0.0082,	0.0084,	0.0084,	0.0084,	0.0082,	0.0080,	0.0078,	0.0074,
0.0077,	0.0080,	0.0083,	0.0085,	0.0087,	0.0087,	0.0087,	0.0085,	0.0083,	0.0080,	0.0077,
0.0079,	0.0082,	0.0085,	0.0088,	0.0089,	0.0089,	0.0089,	0.0088,	0.0085,	0.0082,	0.0079,
0.0080,	0.0084,	0.0087,	0.0089,	0.0090,	0.0091,	0.0090,	0.0089,	0.0087,	0.0084,	0.0080,
0.0080,	0.0084,	0.0087,	0.0089,	0.0091,	0.0091,	0.0091,	0.0089,	0.0087,	0.0084,	0.0080,
0.0080,	0.0084,	0.0087,	0.0089,	0.0090,	0.0091,	0.0090,	0.0089,	0.0087,	0.0084,	0.0080,
0.0079,	0.0082,	0.0085,	0.0088,	0.0089,	0.0089,	0.0089,	0.0088,	0.0085,	0.0082,	0.0079,
0.0077,	0.0080,	0.0083,	0.0085,	0.0087,	0.0087,	0.0087,	0.0085,	0.0083,	0.0080,	0.0077,
0.0074,	0.0078,	0.0080,	0.0082,	0.0084,	0.0084,	0.0084,	0.0082,	0.0080,	0.0078,	0.0074,
0.0071,	0.0074,	0.0077,	0.0079,	0.0080,	0.0080,	0.0080,	0.0079,	0.0077,	0.0074,	0.0071
);

float kernal_offset_position[11] = float[](-1.0,-2.0,-4.0,-8.0,-16.0,0.0,16.0,8.0,4.0,2.0,1.0);

int kernalSizeInt = 11; 
float kernalSizeFl = 11.0; 


out vec4 FragColor;

void main() {
    // Kernal calculator website: http://demofox.org/gauss.html
    // Blur Shader

    vec2 resolution = vec2(width, height); 
    vec4 color = vec4(0.0);
    int index = 0; 
    float xVal = 0.0; 
    float yVal = 0.0; 
    vec2 offset = vec2(kernalSizeFl/resolution.x, kernalSizeFl/resolution.y);
    // for every y row
    for (int i = 0; i < kernalSizeInt; i++) {
        // for every x column
        for (int j = 0; j < kernalSizeInt; j++) {
            if (kernal_offset_position[j] == 0.0) {
                xVal = 0.0; 
            } else {
                xVal = offset.x / kernal_offset_position[j];
            }

            if (kernal_offset_position[i] == 0.0) {
                yVal = 0.0; 
            } else {
                yVal = offset.y / kernal_offset_position[i];
            }
            color += texture(image, texcoord + vec2(xVal, yVal)) * kernal[index];
            index = index + 1; 
        }
    }
    
     //color +=  texture(image, texcoord + vec2(-offset.x, -offset.y))*kernal[0];
     //color +=  texture(image, texcoord + vec2(-offset.x/2.0, -offset.y))*kernal[1];
     //color +=  texture(image, texcoord + vec2(0.0, -offset.y))*kernal[2];
     //color +=  texture(image, texcoord + vec2(offset.x/2.0, -offset.y))*kernal[3];
     //color +=  texture(image, texcoord + vec2(offset.x, -offset.y))*kernal[4];
     //
     //color +=  texture(image, texcoord + vec2(-offset.x, -offset.y/2.0))*kernal[5];
     //color +=  texture(image, texcoord + vec2(-offset.x/2.0, -offset.y/2.0))*kernal[6];
     //color +=  texture(image, texcoord + vec2(0.0, -offset.y/2.0))*kernal[7];
     //color +=  texture(image, texcoord + vec2(-offset.x/2.0, -offset.y/2.0))*kernal[8];
     //color += texture(image, texcoord + vec2(-offset.x, -offset.y/2.0))*kernal[9];
     //
     //color += texture(image, texcoord + vec2(-offset.x, 0.0))*kernal[10];
     //color += texture(image, texcoord + vec2(-offset.x/2.0, 0.0))*kernal[11];
     //color += texture(image, texcoord + vec2(0.0, 0.0))*kernal[12];
     //color += texture(image, texcoord + vec2(offset.x/2.0, 0.0))*kernal[13];
     //color += texture(image, texcoord + vec2(offset.x, 0.0))*kernal[14];
     //
     //color += texture(image, texcoord + vec2(-offset.x, offset.y/2.0))*kernal[15];
     //color += texture(image, texcoord + vec2(-offset.x/2.0, offset.y/2.0))*kernal[16];
     //color += texture(image, texcoord + vec2(0.0, offset.y/2.0))*kernal[17];
     //color += texture(image, texcoord + vec2(offset.x/2.0, offset.y/2.0))*kernal[18];
     //color += texture(image, texcoord + vec2(-offset.x, offset.y/2.0))*kernal[19];
     //
     //color += texture(image, texcoord + vec2(-offset.x, offset.y))*kernal[20];
     //color += texture(image, texcoord + vec2(-offset.x/2.0, offset.y))*kernal[21];
     //color += texture(image, texcoord + vec2(0.0, offset.y))*kernal[22];
     //color += texture(image, texcoord + vec2(offset.x/2.0, offset.y))*kernal[23];
     //color += texture(image, texcoord + vec2(offset.x, offset.y))*kernal[24];
//
    FragColor = color; 

/*
    // Inverted Color Shader
    vec4 texture = texture(image, texcoord); 

    float red = texture.r; 
    float blue = texture.b; 
    float green = texture.g; 

    vec4 calculation = vec4(blue, red, green, 1.0);

    FragColor = calculation;
    */
    /*
    // Color burst and grainy filter
    vec2 pos = vec2(texcoord.x, texcoord.y);
    vec2 onePixel = vec2(1,1); 
    vec4 color = vec4(0);

    mat3 edgeDetectionKernel = mat3(-1,-1,-1,-1,8,-1,-1,-1,-1);
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            vec2 sampelPos = pos + vec2(i-1, j-1) * onePixel; 
            vec4 sampleColor = texture(image, sampelPos);
            sampleColor *= edgeDetectionKernel[i][j]; 
            color += sampleColor; 
        }
    }
    color.a = 1.0; 
    FragColor = color;
    */
    /*
    // Practice - color invert and water ripple filter
   vec2 scale_tex_coord = 2.0 * texcoord - 1.0;

    float radius = length(scale_tex_coord);

    vec2 tex_coor_offset = texcoord * (sin (radius * 90.0 - time+20.0))/ 60.0;

    vec4 texture = texture(image, texcoord+tex_coor_offset); 

    float red = texture.r; 
    float blue = texture.b; 
    float green = texture.g; 

    vec4 calculation = vec4(blue, red, green, 1.0);

    FragColor = calculation;
    */

}
