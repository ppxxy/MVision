attribute vec2 position;

varying vec2 pass_textureCoordinates;

uniform mat4 transformationMatrix;

void main(){

    gl_Position = transformationMatrix * vec4(position, 0.0, 1.0);
    pass_textureCoordinates = vec2((position.x+1.0)/2.0, (position.y+1.0)/2.0);
}