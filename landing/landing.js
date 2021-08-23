function cosineInterpolate(a, b, t){
    return a + (((-Math.cos(Math.PI*t))/2) + .5) * (b-a);
}


class Rectangle {
    constructor(w,h, color, context){
        this.size = new vec2(w, h);
        this.color = color;
        this.context = context;
        this.rotation = 0;
        this.position = new vec2(0,0);
        this.parent;
    }
    transform(){
        if(this.parent){
            this.context.translate(this.parent.position.x, this.parent.position.y);
            this.context.rotate(this.parent.rotation * (Math.PI/180));
        }
        this.context.translate(this.position.x, this.position.y)
        this.context.rotate(this.rotation * (Math.PI/180));

    }
    draw(){
        this.transform();
        this.context.fillStyle = this.color;
        this.context.fillRect(-this.size.x/2, -this.size.y/2, this.size.x, this.size.y);
        this.context.resetTransform();
    }
}

class vec2 {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    add(v){
        return new vec2(this.x + v.x, this.y + v.y);
    }
    sub(v){
        return new vec2(this.x - v.x, this.y - v.y);
    }
    set(x,y){
        this.x = x;
        this.y = y;
    }
}

window.onload = function(){
    var canvas = document.getElementById("landing_canvas");
    var context = canvas.getContext("2d")
    //
    setup: {
        context.canvas.width = window.innerWidth;
        context.canvas.height = window.innerHeight;

        
    }
    var ticker = 0;
    var prevTick = Date.now();
    var deltaTime = 0;
    var rot = 0
    var initialSize = new vec2(window.innerWidth, window.innerHeight);
    var whiteSquare = new Rectangle(initialSize.x + initialSize.y,initialSize.x + initialSize.y, "white", context);
    var redStripe = new Rectangle(0, 0, "red", context);
    redStripe.parent = whiteSquare;

    var squareOffset = new vec2(0,0);
    var screenCenter = new vec2(window.innerWidth/2, window.innerHeight/2);

    whiteSquare.position = screenCenter;

    var draw = function(){
        requestAnimationFrame(draw);
        context.canvas.width = window.innerWidth;
        context.canvas.height = window.innerHeight;

        screenCenter.set(window.innerWidth/2, window.innerHeight/2)

        let currentTick = Date.now()
        deltaTime = (currentTick - prevTick) / 1000;
        prevTick = currentTick;
        //let minimumDimension = Math.min(window.innerWidth, window.innerHeight);
        context.font = (window.innerWidth / 10) + 'px Roboto';
        let sqDiag = Math.sqrt(2 * (Math.pow(whiteSquare.size.x/2, 2)));
        if(ticker < 1){
            whiteSquare.position = screenCenter;
            whiteSquare.size.x = cosineInterpolate(initialSize.x + initialSize.y, window.innerWidth/10, ticker);
            whiteSquare.size.y = cosineInterpolate(initialSize.x + initialSize.y, window.innerWidth/10, ticker);
            whiteSquare.rotation += 720 * deltaTime;   
        }else if(ticker > 1 && ticker < 1.5) {
            squareOffset.x = cosineInterpolate(0, context.measureText("FradZGenius").width/2 + sqDiag * .125, (ticker - 1) / .5)
            whiteSquare.size.x = window.innerWidth/10;
            whiteSquare.size.y = window.innerWidth/10;
            whiteSquare.rotation = cosineInterpolate(0, -495, (ticker - 1) / .5);
            squareX = window.innerWidth/2 - (ticker - 1) * 500;
        }else if(ticker > 1.5 && ticker < 2){
            squareOffset.x = context.measureText("FradZGenius").width/2 + sqDiag * .125;
            context.fillStyle = 'rgba(255,255,255,' + cosineInterpolate(0, 1, (ticker-1.5)/.5) + ')';
            context.textAlign = "center"
            context.textBaseline = "middle"
            context.fillText("FradZGenius",  window.innerWidth/2 + sqDiag * 1.125 - cosineInterpolate(sqDiag, 0, (ticker-1.5)/.5), window.innerHeight/2);
            whiteSquare.rotation = -495;
            whiteSquare.size.x = window.innerWidth/10;
            whiteSquare.size.y = window.innerWidth/10;
            redStripe.size.x = whiteSquare.size.x / 3;
            redStripe.size.y = cosineInterpolate(0, whiteSquare.size.y, (ticker-1.5)/.5);
        } else if(ticker > 2 && ticker < 3){
            squareOffset.x = context.measureText("FradZGenius").width/2 + sqDiag * .125;
            context.fillStyle = "white";
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillText("FradZGenius", window.innerWidth/2 + sqDiag * 1.125, window.innerHeight/2);///0.625
            whiteSquare.size.x = window.innerWidth/10;
            whiteSquare.size.y = window.innerWidth/10;
            redStripe.size.x = whiteSquare.size.x / 3
            redStripe.size.y = whiteSquare.size.y;
        } else if(ticker > 3 && ticker < 3.5){
            context.fillStyle = "white";
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillStyle = 'rgba(255,255,255,' + cosineInterpolate(1, 0, (ticker-3)*2) + ')';
            context.fillText("FradZGenius", window.innerWidth/2 + sqDiag * 1.125 - cosineInterpolate(0, sqDiag, (ticker-3)/.5), window.innerHeight/2);
            redStripe.size.y = cosineInterpolate(whiteSquare.size.y, 0, (ticker-3)/.5)

            squareOffset.x = cosineInterpolate(context.measureText("FradZGenius").width/2 + sqDiag * .125, 0, (ticker-3)/.5);
            whiteSquare.rotation = cosineInterpolate(-495, 45, (ticker-3)/.5)
        } else if (ticker > 3.5 && ticker < 4){
            whiteSquare.size.x = cosineInterpolate(window.innerWidth/10, initialSize.x + initialSize.y, (ticker-3.5)/.5);
            whiteSquare.size.y = cosineInterpolate(window.innerWidth/10, initialSize.x + initialSize.y, (ticker-3.5)/.5);
            whiteSquare.rotation = cosineInterpolate(45, 200, (ticker - 3.5)/.5)
        }
        whiteSquare.position = screenCenter.sub(squareOffset);
        whiteSquare.draw();
        redStripe.draw();
        ticker += deltaTime;
    }

    var fillBg = function(color){
        context.fillStyle = color;
        context.fillRect(0, 0, window.innerWidth, window.innerHeight);
    }
    requestAnimationFrame(draw);
}