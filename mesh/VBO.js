/*global gl*/

class VBO {

    constructor(id, type) {
        this.id = id; //in WebGL id's type is WebGLBuffer object
        this.type = type;
    }

    bind(){
        gl.bindBuffer(this.type, this.id);
    }

    unbind(){
        gl.bindBuffer(this.type, null);
    }

    storeData(data){
        if(data instanceof DataView || ArrayBuffer.isView(data) || data instanceof ArrayBuffer){
            gl.bufferData(this.type, data, gl.STATIC_DRAW);
        } else if(data instanceof Array){
            var buffer = new ArrayBuffer(4*data.length);
            var array = new Float32Array(buffer);
            array.set(data, 0);
            gl.bufferData(this.type, array, gl.STATIC_DRAW);
        } else {
            console.log("Received undefined data on VBO.");
        }
    }
}

function createVBO(type){
    return new VBO(generateVBOID(), type);
}

function generateVBOID() {
    return gl.createBuffer();
}