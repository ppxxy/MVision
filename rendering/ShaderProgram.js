class ShaderProgram {
    constructor(vertexFile, fragmentFile, ...inVariables){
        var vertexShaderID = loadShader(vertexFile, gl.VERTEX_SHADER);
        var fragmentShaderID = loadShader(fragmentFile, gl.FRAGMENT_SHADER);

        this.programID = gl.createProgram();
        if(this.programID == 0){
            throw new Error("Couldn't get valid shader program id.");
        }
        gl.attachShader(this.programID, vertexShaderID);
        gl.attachShader(this.programID, fragmentShaderID);

        this.bindAttributes(...inVariables);

        gl.linkProgram(this.programID);

        if(!gl.getProgramParameter(this.programID, gl.LINK_STATUS)){
            var info = gl.getProgramInfoLog(this.programID);
            throw new Error("Could not compile WebGL program. \n\n" + info);
        }
    }

    bindAttributes(...inVariables){
        for(var i = 0; i < inVariables.length; ++i){
            gl.bindAttribLocation(this.programID, i, inVariables[i]);
        }
    }

    start(){
        gl.useProgram(this.programID);
    }

    stop(){
        gl.useProgram(null);
    }

    storeUniformLocations(...uniforms){
        for(var i = 0; i < uniforms.length; ++i){
            uniforms[i].storeUniformLocation(this.programID);
        }
        gl.validateProgram(this.programID);
    }
}

function loadShader(shaderFile, shaderType){
    var shaderSource = $.ajax({
        type: "GET",
        url: shaderFile,
        async: false
    }).responseText;

    var shaderID = gl.createShader(shaderType);
    if(shaderID != 0){
        gl.shaderSource(shaderID, shaderSource);
        gl.compileShader(shaderID);
    } else {
        throw new Error("Couldn't get valid shader ID.");
    }

    var error = gl.getShaderInfoLog(shaderID);
    if(error.length > 0){
        throw error;
    }
    return shaderID;
}