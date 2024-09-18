const FRAME_RATE = 24;

function degToRad(deg) {
    return deg * (Math.PI / 180);
}

function randint(min, max) {
    return Math.floor(Math.random() * max) + min;
}

function cosineInterpolate(a, b, t) {
    return a + (-Math.cos(Math.PI * t) / 2 + 0.5) * (b - a);
}

class Color {
    constructor(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    setContextColor(context) {
        context.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    }
    static random() {
        return new Color(
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255),
            1
        );
    }
}

var COLOR_RED = new Color(255, 0, 0, 1);
var COLOR_WHITE = new Color(255, 255, 255, 1);
var COLOR_BLACK = new Color(0, 0, 0, 1);

class Object {
    constructor(w, h, color, context) {
        this.size = new vec2(w, h);
        this.color = color;
        this.context = context;
        this.position = new vec2(0, 0);
        this.rotation = 0;
        this.parent;
    }
    transform() {
        if (this.parent) {
            this.context.translate(
                this.parent.position.x,
                this.parent.position.y
            );
            this.context.rotate(this.parent.rotation * (Math.PI / 180));
        }
        this.context.translate(this.position.x, this.position.y);
        this.context.rotate(this.rotation * (Math.PI / 180));
    }
    draw() {
        this.transform();
        this.color.setContextColor(this.context);
    }
}

class Rectangle extends Object {
    constructor(w, h, color, context) {
        super(w, h, color, context);
    }
    draw() {
        super.draw();
        this.context.fillRect(
            -this.size.x / 2,
            -this.size.y / 2,
            this.size.x,
            this.size.y
        );
        this.context.resetTransform();
    }
}

class Circle extends Object {
    constructor(radius, color, context) {
        super(radius, radius, color, context);
        this.radius = radius;
    }
    draw() {
        super.draw();
        this.context.beginPath();
        this.context.arc(0, 0, this.radius, 0, 2 * Math.PI);
        this.context.fill();
        this.context.resetTransform();
    }
}

class vec2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(v) {
        return new vec2(this.x + v.x, this.y + v.y);
    }
    sub(v) {
        return new vec2(this.x - v.x, this.y - v.y);
    }
    set(x, y) {
        this.x = x;
        this.y = y;
    }
}

const logo = document.getElementById('logo');
window.onscroll = function () {
    logo.style.transform = `rotate(${(window.pageYOffset / window.innerHeight) * 135}deg)`;
};
