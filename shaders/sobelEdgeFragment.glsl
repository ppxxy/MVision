precision highp float;

varying vec2 pass_textureCoordinates;

uniform sampler2D texture;
uniform vec2 imageSize;

const float oneThird = 1.0/3.0;
const vec2 upperLeftDelta = vec2(-1.0, 1.0);
const vec2 verticalCombined = vec2(-1.0, -oneThird);
const vec2 horizontalCombined = vec2(-oneThird, -1.0);

void main(){
    vec2 coord = vec2(gl_FragCoord);
    float upperLeft = texture2D(texture, (coord+upperLeftDelta)/imageSize).r;
    float lowerRight = texture2D(texture, (coord-upperLeftDelta)/imageSize).r;
    float xLeft = texture2D(texture, (coord+verticalCombined)/imageSize).r;
    float xRight = texture2D(texture, (coord-verticalCombined)/imageSize).r;

    float horizontalValue = upperLeft + 3.0 * xLeft - lowerRight - 3.0 * xRight;
    
    float yLeft = texture2D(texture, (coord+horizontalCombined)/imageSize).r;
    float yRight = texture2D(texture, (coord-horizontalCombined)/imageSize).r;

    float verticalValue = upperLeft + 3.0 * yRight - lowerRight - 3.0 * yLeft;
    
    float sobel = sqrt((horizontalValue * horizontalValue) + (verticalValue * verticalValue));
    if(sobel < 0.0018){
        discard;
    }
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}