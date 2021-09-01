window.onload = () => {
    const FADE_DURATION = 1;
    var origin = new vec2(0, innerHeight / 2);
    var fadeTicker = 0;
    var fade = 0;
    var canvas = document.getElementById('background-canvas');
    var context = canvas.getContext('2d');

    var createTicker = 0;

    var creationInterval = 2;
    var expandSpeed = 100;
    var prevTick = Date.now();

    var testCircle = new Circle(1000, COLOR_RED, context);

    var circles = [];

    var colors = [COLOR_RED, COLOR_WHITE, COLOR_BLACK];

    var colorInd = 0;

    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight;

    var pageDiag = Math.sqrt(
        Math.pow(canvas.height / 2, 2) + Math.pow(canvas.width, 2)
    );

    var initCircles = () => {
        //expandSpeed = increase in radius per second
        //creationInterval = amount of seconds in between each new circle
        origin.y = innerHeight / 2;
        colorInd = 0;
        pageDiag = Math.sqrt(
            Math.pow(innerHeight / 2, 2) + Math.pow(innerWidth * 0.8, 2)
        );
        prevTick = Date.now();
        createTicker = 0;
        circles = [];
        let circlesRequired = pageDiag / (creationInterval * expandSpeed);
        for (let i = 0; i < circlesRequired; i++) {
            let circ = new Circle(
                (circlesRequired - i) * expandSpeed * creationInterval,
                colors[colorInd],
                context
            );
            colorInd = (colorInd + 1) % colors.length;
            circ.position = origin;
            circles.push(circ);
        }
    };

    initCircles();

    var draw = () => {
        requestAnimationFrame(draw);

        canvas.width = window.innerWidth * 0.8;
        canvas.height = window.innerHeight;

        let now = Date.now();
        let dt = (now - prevTick) / 1000;
        prevTick = now;

        createTicker += dt;

        if (fadeTicker < 1) {
            fade = cosineInterpolate(0, 1, fadeTicker);
            fadeTicker += dt;
        } else {
            fade = 1;
        }

        if (createTicker > creationInterval) {
            createTicker = 0;
            let cl = colors[colorInd];

            colorInd = (colorInd + 1) % colors.length;

            let circle = new Circle(0, cl, context);
            circle.position = origin;

            circles.push(circle);
        }

        let newCircles = [];

        for (let i = 0; i < circles.length; i++) {
            let item = circles[i];
            item.radius += dt * expandSpeed;
            let itemBefore = item;
            if (i != circles.length - 1) itemBefore = circles[i + 1];
            if (itemBefore.radius < pageDiag) {
                newCircles.push(item);
            }
            item.color.a = fade;
            item.draw();
        }

        circles = newCircles;
    };

    window.onfocus = () => {
        initCircles();
    };

    window.onresize = () => {
        initCircles();
    };

    requestAnimationFrame(draw);
};
