class UniformBoolean extends Uniform {

    constructor(name){
        super(name);
    }

    loadBoolean(boolean){
        gl.uniform1i(this.location, boolean ? 1 : 0);
    }
}