/*global gl, InterfaceRenderer*/

class MasterRenderer {
    constructor() {
        this.background = createTexture("../test_image.jpg");
        this.brush = createTexture("../brush1.png");
        //internal format gl.R8, format gl.RED, type gl.UNSIGNED_BYTE
        this.color_map = new Texture(gl.createTexture(), gl.TEXTURE_2D);
        this.color_map.width = canvas.width;
        this.color_map.height = canvas.height;
        this.color_map.bind();
        console.log(canvas.width +", " + canvas.height);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.R8, canvas.width, canvas.height, 0, gl.RED, gl.UNSIGNED_BYTE, null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

        this.colorBuffer = new FrameBufferObject(this.color_map);
        this.colorBuffer.checkStatus();
        this.colorBuffer.unbind();

        this.interfaceRenderer = new InterfaceRenderer();
        this.sobelRenderer = new SobelRenderer();
    }
    
    render() {

        if(mouse.pressed){
            this.colorBuffer.bind();

            var mouseTransformation = new Matrix4f();
            mouseTransformation.translate(2*mouse.x/canvas.width-1, -2*mouse.y/canvas.height+1);
            mouseTransformation.scale(this.brush.width/this.color_map.width*mouse.scale, this.brush.height/this.color_map.height*mouse.scale);

            this.interfaceRenderer.renderTransformation(this.brush, mouseTransformation, mouse.inverseColor);

            this.colorBuffer.unbind();
        }

        prepareForRendering();

        this.interfaceRenderer.render(this.background);
        this.sobelRenderer.render(this.color_map);

    }
}


function prepareForRendering(){
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}

function startRendering(masterRenderer){
    masterRenderer.render();
    if(!gl.error){
        window.requestAnimationFrame(function(){
            startRendering(masterRenderer);
        });
    }
}