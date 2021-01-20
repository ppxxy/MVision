class SobelRenderer{
    constructor(){
        this.vao = createQuadVAO();
        this.transformationMatrix = new UniformMatrix("transformationMatrix");
        this.imageSize = new UniformVec2("imageSize");
        this.shader = new SobelShader(this.transformationMatrix, this.imageSize);
    }

    render(texture, width, height){
        this.shader.start();
        this.transformationMatrix.loadMatrix(identityMatrix4f);
        this.vao.bind(0);
        if(texture instanceof WebGLTexture){
            gl.bindTexture(gl.TEXTURE_2D, texture);
            this.imageSize.loadVec2({x: width, y: height});
        } else{
            texture.bind();
            this.imageSize.loadVec2({x: texture.width, y: texture.height});
        }
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        this.vao.unbind(0);
        this.shader.stop();
    }
}

var SOBEL_FRAGMENT_FILE = "../shaders/sobelEdgeFragment.glsl";

class SobelShader extends ShaderProgram {
    
    constructor(transformationMatrix, imageSize){
        super(INTERFACE_VERTEX_FILE, SOBEL_FRAGMENT_FILE, "position");
        super.storeUniformLocations(transformationMatrix, imageSize);
    }
}