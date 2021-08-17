window.onload = function(){
    var canvas = document.getElementById("landing_canvas");
    var context = canvas.getContext("2d")
    var FRAME_RATE = 1000 / 60; //ms - 1 second / 60 frames = 60 fps
    //
    setup: {
        context.canvas.width = window.innerWidth;
        context.canvas.height = window.innerHeight;

        
    }
    var ticker = 0;
    var draw = function(){
        context.canvas.width = window.innerWidth;
        context.canvas.height = window.innerHeight;
        fillBg("black");
        context.translate(window.innerWidth/2, window.innerHeight/2)
        context.rotate(ticker * (180/Math.PI))
        rect(100, 100, "white");
        ticker+=FRAME_RATE/2;
    }

    var fillBg = function(color){
        context.fillStyle = color;
        context.fillRect(0, 0, window.innerWidth, window.innerHeight);
    }

    var rect = function(w, h, color){
        context.fillStyle = color;
        context.fillRect(-w/2, -h/2, w, h);
    }

    setInterval(draw, FRAME_RATE);
}