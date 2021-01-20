precision highp float;

varying vec2 pass_textureCoordinates;

uniform bool inverseColor;
uniform sampler2D sampler;

void main() {
    vec4 color = texture2D(sampler, pass_textureCoordinates);
    if(color.a <= 0.0){
        discard;
    }
    gl_FragColor = inverseColor ? vec4(1.0) - color : color;
}