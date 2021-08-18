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
    var draw = function(){
        requestAnimationFrame(draw);
        context.canvas.width = window.innerWidth;
        context.canvas.height = window.innerHeight;
        let currentTick = Date.now()
        deltaTime = (currentTick - prevTick) / 1000;
        prevTick = currentTick;

        if(ticker < 2.125){
            rot += 360 * deltaTime;
        }
        context.translate(window.innerWidth/2, window.innerHeight/2)
        context.rotate(rot * (Math.PI/180))
        rect(100, 100, "white");
        rect(33, 100, "red");
        ticker += deltaTime;
    }

    var fillBg = function(color){
        context.fillStyle = color;
        context.fillRect(0, 0, window.innerWidth, window.innerHeight);
    }

    var rect = function(w, h, color){
        context.fillStyle = color;
        context.fillRect(-w/2, -h/2, w, h);
    }
    requestAnimationFrame(draw);
}