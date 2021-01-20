class UniformMatrix extends Uniform {
    constructor(name){
        super(name);
    }

    loadMatrix(matrix){
        gl.uniformMatrix4fv(this.location, false, matrix.getValuesAsArray());
    }
}