class Uniform {
    constructor(name){
        this.name = name;
    }

    storeUniformLocation(programID){
        this.location = gl.getUniformLocation(programID, this.name);
    }
}