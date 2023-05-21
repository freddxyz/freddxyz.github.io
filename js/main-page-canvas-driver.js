window.onload = () => {
    const FADE_DURATION = 1;

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    var fade = 0;

    var x = 0;
    var y = 0;
    var prevTick = Date.now();

    var lines = [];

    var ticker = 0;

    var lastColor = 'white';

    var trailingLine;

    var ROOT_2 = Math.sqrt(2);

    var lineWidth = 200;

    var lineSpeed = 200;

    var frameRate = 40;

    let a = window.innerHeight;
    let c = ROOT_2 * a;
    let b = Math.sqrt(Math.pow(c, 2) - Math.pow(a, 2));
    let sqDiag = 2 * Math.cos(degToRad(45)) * lineWidth;//lineWidth * (ROOT_2/2);
    //2cos(45 deg) / width
    var initLines = () => {
        a = window.innerHeight;
        c = ROOT_2 * a;
        b = Math.sqrt(Math.pow(c, 2) - Math.pow(a, 2));
        let linesRequired =
            Math.ceil(window.innerWidth/sqDiag)+1//Math.ceil((window.innerWidth + b + sqDiag) / sqDiag) + 1;
        linesRequired =
            linesRequired % 2 == 0 ? linesRequired : linesRequired + 1;

        lines = [];
        lastColor = 'white';
        for (let i = linesRequired; i > 0; i--) {
            let rect = new Rectangle(lineWidth, 100000, COLOR_WHITE, context);
            rect.rotation = 45;
            rect.position = new vec2(i * sqDiag,0) //- sqDiag, 0);
            if (lastColor == 'red') {
                rect.color = COLOR_WHITE;
                lastColor = 'white';
            } else {
                rect.color = COLOR_RED;
                lastColor = 'red';
            }
            lines.push(rect);
            trailingLine = rect;
        }
        if (lastColor == 'red') {
            lastColor = 'white';
        } else {
            lastColor = 'red';
        }

        prevTick = Date.now();
        ticker = 0;
    };

    initLines();

    var fadeTicker = 0;

    var draw = (tick) => {
        let now = Date.now();
        let dt = 1/frameRate;
        prevTick = now;

        if (fadeTicker < 1) {
            fadeTicker += dt;
            fade = cosineInterpolate(0, 1, fadeTicker);
        }

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight + 50;
        if (trailingLine.position.x > 0){//ticker >= (sqDiag) / lineSpeed) {
            console.log(trailingLine.color)
            ticker = 0;
            let rect = new Rectangle(lineWidth, 100000, COLOR_WHITE, context);
            rect.rotation = 45;
            if (trailingLine.color == COLOR_RED) {
                rect.color = COLOR_WHITE;
                lastColor = 'white';
            } else {
                rect.color = COLOR_RED;
                lastColor = 'red';
            }
            rect.position = new vec2(trailingLine.position.x - sqDiag, 0);
            lines.push(rect);
            trailingLine = rect;
        }
        let newLines = [];
        lines.forEach((item) => {
            item.color.a = fade;
            item.draw();
            item.position = item.position.add(new vec2(lineSpeed * dt, 0));
            if (item.position.x - b - sqDiag < window.innerWidth) {
                newLines.push(item);
            }
        });
        lines = newLines;
        ticker += dt;
        setTimeout(()=>{requestAnimationFrame(draw);}, (1/FRAME_RATE) * 1000);
    };

    window.onfocus = () => {
        initLines();
    };

    window.onresize = () => {
        initLines();
    };

    requestAnimationFrame(draw);
};
