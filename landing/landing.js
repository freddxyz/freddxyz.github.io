class Rectangle {
    constructor(w,h, color, context){
        this.w = w;
        this.h = h;
        this.color = color;
        this.context = context;
    }
    draw(){
        this.context.fillStyle = this.color;
        this.context.fillRect(-this.w/2, -this.h/2, this.w, this.h);
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
    var whiteSquare = new Rectangle(4000,4000, "white", context);
    var redStripe = new Rectangle(33, 100, "red", context);
    var squareX = window.innerWidth/2;
    var squareY = window.innerHeight/2;
    var draw = function(){
        requestAnimationFrame(draw);
        context.canvas.width = window.innerWidth;
        context.canvas.height = window.innerHeight;
        let currentTick = Date.now()
        deltaTime = (currentTick - prevTick) / 1000;
        prevTick = currentTick;

        if(ticker < 1){
            squareX = window.innerWidth/2;
            squareY = window.innerHeight/2;
            whiteSquare.w -= deltaTime * 3900;
            whiteSquare.h -= deltaTime * 3900;
            rot += 765 * deltaTime;   
        }else if(ticker > 1 && ticker < 1.5) {
            rot -= 720 * (deltaTime * 1.5);
            squareX = window.innerWidth/2 - (ticker - 1) * 500;
            //TODO:
            //scaling with window maybe
            //uhhh finish animation
        }

        context.translate(squareX, squareY)
        context.rotate(rot * (Math.PI/180))
        whiteSquare.draw();
        //redStripe.draw();
        ticker += deltaTime;
    }

    var fillBg = function(color){
        context.fillStyle = color;
        context.fillRect(0, 0, window.innerWidth, window.innerHeight);
    }
    requestAnimationFrame(draw);
}