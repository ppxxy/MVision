initEventListeners();

class Mouse{
    constructor(){
        this.pressed = false;
        this.inverseColor = false;
        this.mode = 0; //0 for addition, 1 for subtraction
        this.x = 0.0;
        this.y = 0.0;
        this.scale = 1.0;
    }

    setCoordinates(coordinates){
        this.x = coordinates.x;
        this.y = coordinates.y;
    }

}

var mouse = new Mouse();

function initEventListeners(){
    window.addEventListener("touchstart", handleStart, false);
    window.addEventListener("touchend", handleEnd, false);
    window.addEventListener("touchcancel", handleEnd, false);
    window.addEventListener("touchmove", handleMove, false);
    window.addEventListener("mousedown", handleStart, false);
    window.addEventListener("mouseup", handleEnd, false);
    window.addEventListener("mousemove", handleMove, false);
    window.addEventListener("wheel", handleScale, false);
    window.addEventListener("keypress", handleKey, false);
}

function handleStart(event){
    event.preventDefault();
    mouse.setCoordinates(getCoordinates(event));
    mouse.pressed = true;
}

function handleEnd(event){
    event.preventDefault();
    mouse.pressed = false;
}

function handleMove(event){
    event.preventDefault();
    mouse.setCoordinates(getCoordinates(event));
}

function getCoordinates(event){
    if(window.TouchEvent && event instanceof TouchEvent){
        return {x: event.touches[0].clientX, y: event.touches[0].clientY};
    } else {
        return {x: event.clientX, y: event.clientY};
    }
}

function handleScale(event){
    event.preventDefault();
    if(event.deltaY > 0){
        if(mouse.scale > 0.1){
            mouse.scale -= 0.1;
        }
    } else if(mouse.scale < 4.0){
        mouse.scale += 0.1;
    }
}

function handleKey(event){
    console.log("Received key event " +event.code);
    if(event.key == 'e'){
        console.log("Pressed E");
        mouse.inverseColor = !mouse.inverseColor;
    }
}