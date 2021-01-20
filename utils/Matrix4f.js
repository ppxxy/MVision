class Matrix4f{
    constructor(data){
        if(data != null){
            if(data instanceof Matrix4f){
                this.m00 = data.m00;
                this.m01 = data.m01;
                this.m02 = data.m02;
                this.m03 = data.m03;
                this.m10 = data.m10;
                this.m11 = data.m11;
                this.m12 = data.m12;
                this.m13 = data.m13;
                this.m20 = data.m20;
                this.m21 = data.m21;
                this.m22 = data.m22;
                this.m23 = data.m23;
                this.m30 = data.m30;
                this.m31 = data.m31;
                this.m32 = data.m32;
                this.m33 = data.m33;
            }
        } else {
            this.m00 = 1, this.m01 = 0, this.m02 = 0, this.m03 = 0;
            this.m10 = 0, this.m11 = 1, this.m12 = 0, this.m13 = 0;
            this.m20 = 0, this.m21 = 0, this.m22 = 1, this.m23 = 0;
            this.m30 = 0, this.m31 = 0, this.m32 = 0, this.m33 = 1;
        }
    }

    translate(x, y, z){
        if(y == null){
            this.m30 += this.m00 * x.x + this.m10 * x.y + this.m20 * x.z;
            this.m31 += this.m01 * x.x + this.m11 * x.y + this.m21 * x.z;
            this.m32 += this.m02 * x.x + this.m12 * x.y + this.m22 * x.z;
            this.m33 += this.m03 * x.x + this.m13 * x.y + this.m23 * x.z;
        }
        else if(z != null){
            this.m30 += this.m00 * x + this.m10 * y + this.m20 * z;
            this.m31 += this.m01 * x + this.m11 * y + this.m21 * z;
            this.m32 += this.m02 * x + this.m12 * y + this.m22 * z;
            this.m33 += this.m03 * x + this.m13 * y + this.m23 * z;
        } else{
            this.m30 += this.m00 * x + this.m10 * y;
            this.m31 += this.m01 * x + this.m11 * y;
            this.m32 += this.m02 * x + this.m12 * y;
            this.m33 += this.m03 * x + this.m13 * y;
        }
    }

    rotate(angle, x, y, z){
        var cos = Math.cos(angle);
    var sin = Math.sin(angle);
    var oneminusc = 1.0-cos;
    
    var xy;
    var yz;
    var xz;
    var xs;
    var ys;
    var zs;
    
    var f00;
    var f01;
    var f02;
    
    var f10;
    var f11;
    var f12;
    
    var f20;
    var f21;
    var f22;
    if(y == null){
        xy = x.x*x.y;
        yz = x.y*x.z;
        xz = x.x*x.z;
        xs = x.x*sin;
        ys = x.y*sin;
        zs = x.z*sin;
        
        f00 = x.x*x.x*oneminusc+cos;
        f01 = xy*oneminusc+zs;
        f02 = xz*oneminusc-ys;
        
        f10 = xy*oneminusc-zs;
        f11 = x.y*x.y*oneminusc+cos;
        f12 = yz*oneminusc+xs;
        
        f20 = xz*oneminusc+ys;
        f21 = yz*oneminusc-xs;
        f22 = x.z*x.z*oneminusc+cos;
    } else{
        xy = x*y*oneminusc;
        yz = y*z*oneminusc;
        xz = x*z*oneminusc;
        xs = x*sin;
        ys = y*sin;
        zs = z*sin;
        
        f00 = x*x*oneminusc+cos;
        f01 = xy+zs;
        f02 = xz-ys;
        
        f10 = xy-zs;
        f11 = y*y*oneminusc+cos;
        f12 = yz+xs;
        
        f20 = xz+ys;
        f21 = yz-xs;
        f22 = z*z*oneminusc+cos;
    }
        
    var t00 = this.m00 * f00 + this.m10 * f01 + this.m20 * f02;
    var t01 = this.m01 * f00 + this.m11 * f01 + this.m21 * f02;
    var t02 = this.m02 * f00 + this.m12 * f01 + this.m22 * f02;
    var t03 = this.m03 * f00 + this.m13 * f01 + this.m23 * f02;
    var t10 = this.m00 * f10 + this.m10 * f11 + this.m20 * f12;
    var t11 = this.m01 * f10 + this.m11 * f11 + this.m21 * f12;
    var t12 = this.m02 * f10 + this.m12 * f11 + this.m22 * f12;
    var t13 = this.m03 * f10 + this.m13 * f11 + this.m23 * f12;
    
    this.m20 = this.m00 * f20 + this.m10 * f21 + this.m20 * f22;
    this.m21 = this.m01 * f20 + this.m11 * f21 + this.m21 * f22;
    this.m22 = this.m02 * f20 + this.m12 * f21 + this.m22 * f22;
    this.m23 = this.m03 * f20 + this.m13 * f21 + this.m23 * f22;
    this.m00 = t00;
    this.m01 = t01;
    this.m02 = t02;
    this.m03 = t03;
    this.m10 = t10;
    this.m11 = t11;
    this.m12 = t12;
    this.m13 = t13;
    }

    scale(x, y, z){
        this.m00 *= x;
        this.m01 *= x;
        this.m02 *= x;
        this.m03 *= x;
        this.m10 *= y;
        this.m11 *= y;
        this.m12 *= y;
        this.m13 *= y;
        if(z != null){
            this.m20 *= z;
            this.m21 *= z;
            this.m22 *= z;
            this.m23 *= z;
        }
    }

    getValuesAsArray(){
        return [this.m00, this.m01, this.m02, this.m03,
            this.m10, this.m11, this.m12, this.m13,
            this.m20, this.m21, this.m22, this.m23,
            this.m30, this.m31, this.m32, this.m33];
    }
}

var identityMatrix4f = new Matrix4f();