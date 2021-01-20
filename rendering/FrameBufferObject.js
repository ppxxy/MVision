class FrameBufferObject{
    constructor(texture){
        this.frameBuffer = gl.createFramebuffer();
        this.width = texture.width;
        this.height = texture.height;
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
        this.attachTexture(texture);
    }

    attachTexture(texture){
        this.texture = texture;
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture.id, 0);
    }

    bind(){
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
        gl.viewport(0, 0, this.width, this.height);
    }

    unbind(){
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, canvas.width, canvas.height);
    }

    checkStatus(){
        var status;
        if((status = gl.checkFramebufferStatus(gl.FRAMEBUFFER)) == 0){
            throw new Error("FrameBuffer has faced an error:\n" +status);
        }
    }
}