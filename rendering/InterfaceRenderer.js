

class InterfaceRenderer{
    constructor(){
        this.vao = createQuadVAO();
        this.transformationMatrix = new UniformMatrix("transformationMatrix");
        this.inverseColor = new UniformBoolean("inverseColor");
        this.shader = new InterfaceShader(this.transformationMatrix, this.inverseColor);
    }

    render(texture){
        this.shader.start();
        this.transformationMatrix.loadMatrix(identityMatrix4f);
        this.vao.bind(0);
        if(texture instanceof WebGLTexture){
            gl.bindTexture(gl.TEXTURE_2D, texture);
        } else {
            texture.bind();
        }
        this.inverseColor.loadBoolean(false);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        this.vao.unbind(0);
        this.shader.stop();
    }

    renderTransformation(texture, transformationMatrix, inverse){
        this.shader.start();
        this.transformationMatrix.loadMatrix(transformationMatrix);
        this.vao.bind(0);
        if(texture instanceof WebGLTexture){
            gl.bindTexture(gl.TEXTURE_2D, texture);
        } else {
            texture.bind();
        }
        this.inverseColor.loadBoolean(inverse);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        this.vao.unbind(0);
        this.shader.stop();
    }
}

var INTERFACE_VERTEX_FILE = "../shaders/interfaceVertex.glsl";
var INTERFACE_FRAGMENT_FILE = "../shaders/interfaceFragment.glsl";

class InterfaceShader extends ShaderProgram {
    
    constructor(transformationMatrix, inverseColor){
        super(INTERFACE_VERTEX_FILE, INTERFACE_FRAGMENT_FILE, "position");
        super.storeUniformLocations(transformationMatrix, inverseColor);
    }
}

function createQuadVAO(){
    var vao = new VAO();
    vao.bind();
    vao.createAttribute(0, [-1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, -1.0], 2, gl.FLOAT);
    vao.unbind();
    return vao;
}