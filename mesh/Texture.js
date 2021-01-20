/*global gl, Image*/

var allTextures= {};
var staticTextureIndex = 0;

class Texture{
    constructor(id, type){
        this.id = id;
        this.index = staticTextureIndex++;
        allTextures[this.index] = this;
        if(type){
            this.type = type;
        } else {
            this.type = gl.TEXTURE_2D;
        }
    }

    bindToUnit(unit){
        gl.activeTexture(gl.TEXTURE0 + unit);
        gl.bindTexture(this.type, this.id);
    }

    bind(){
        gl.bindTexture(this.type, this.id);
    }

    unbind(){
        gl.bindTexture(this.type, null);
    }
}

function createTexture(path){
    var textureImage = new Image();
    var texture = new Texture(gl.createTexture());
    textureImage.onload = function(){
        texture.bind();
        gl.texImage2D(texture.type, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureImage);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

        this.ready = true;
    };
    textureImage.src = (path);
    texture.width = textureImage.width;
    texture.height = textureImage.height;
    return texture;
}