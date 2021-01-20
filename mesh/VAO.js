/*global gl*/

class VAO {

    constructor() {
        this.vbos = {};
    }

    createIndexBuffer(indices) {
        this.indexVBO = createVBO(gl.ELEMENT_ARRAY_BUFFER);
        this.indexVBO.bind();
        var buffer = new ArrayBuffer(4 * indices.length);
        var array = new Int32Array(buffer);
        array.set(indices, 0);
        this.indexVBO.storeData(array);
        this.indexVBO.unbind();
        this.indexCount = indices.length;
    }
    /**
     * Type specifies the type of data contained in AttributeVBO it's one of:
     * gl.BYTE
     * gl.SHORT
     * gl.UNSIGNED_BYTE
     * gl.UNSIGNED_SHORT
     * gl.FLOAT
     */

    createAttribute(attribute, data, attrSize, type) {
        var vbo = new AttributeVBO(gl.ARRAY_BUFFER, attrSize, type);
        vbo.bind();
        vbo.storeData(data);
        vbo.unbind();
        this.vbos[attribute] = vbo;
    }

    bind(...attributes) {
        if (this.indexVBO != null) {
            this.indexVBO.bind();
        }
        for (var attribute in attributes) {
            var vbo = this.vbos[attribute];
            vbo.bind();
            gl.enableVertexAttribArray(attribute);
            vbo.setPointer(attribute);
        }
    }

    bindWithPointer(attributes, targets) {
        if (this.indexVBO != null) {
            this.indexVBO.bind();
        }
        for (var i = 0, n = attributes.length; i < n; ++i) {
            var attribute = attributes[i];
            var vbo = this.vbos[attribute];
            vbo.bind();
            gl.enableVertexAttribArray(attribute);
            vbo.setPointer(targets[i]);
        }
    }

    unbind(...attributes){
        if(this.indexVBO != null){
            this.indexVBO.unbind();
        }
        for(var attribute in attributes){
            this.vbos[attribute].unbind();
            gl.disableVertexAttribArray(attribute);
        }
    }
}




