var canvas = document.getElementById('glCanvas');
var gl;

var supportsOpengl = initOpenGL();

initEventListeners();

function initEventListeners(){
    window.addEventListener('resize', resizeCanvas, false);
    resizeCanvas();
}

function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
}

function initOpenGL(){
    gl = canvas.getContext('webgl2');
    if(!gl){
        alert("Browser does not support OpenGL");
        return false;
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    return true;
}