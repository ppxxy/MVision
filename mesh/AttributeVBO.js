/*global VBO, gl*/
class AttributeVBO extends VBO{

    constructor(type, attrSize, dataType) {
        super(generateVBOID(), type);
        this.attrSize = attrSize;
        this.dataType = dataType;
    }

    setPointer(attribute){
        gl.vertexAttribPointer(attribute, this.attrSize, this.dataType, false, 0, 0);
    }
}