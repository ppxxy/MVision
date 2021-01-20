class UniformVec2 extends Uniform {

    constructor(name){
        super(name);
    }

    loadVec2(vector){
        if(vector instanceof Array){
            gl.uniform2fv(this.location, vector);
        } else {
            gl.uniform2f(this.location, vector.x, vector.y);
        }
    }
}