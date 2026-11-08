(function () {
    var intro = document.getElementById('intro');
    var wrapper = document.querySelector('.wrapper');
    var name = intro.querySelector('.intro-name');
    var square = intro.querySelector('.intro-square');

    function updateGeometry() {
        intro.style.setProperty('--intro-name-half', name.getBoundingClientRect().width / 2 + 'px');
        intro.style.setProperty('--intro-cover-scale', (window.innerWidth + window.innerHeight) / (window.innerWidth / 10));
    }

    function finishIntro(event) {
        if (event.target !== square || event.animationName !== 'intro-rotation') return;
        window.removeEventListener('resize', updateGeometry);
        intro.remove();
        wrapper.inert = false;
        document.body.classList.remove('intro-playing', 'intro-revealing');
    }

    function revealPage(event) {
        if (event.target !== intro || event.animationName !== 'intro-backdrop') return;
        document.body.classList.add('intro-revealing');
    }

    // JavaScript only measures layout and handles the handoff; CSS owns the timeline.
    intro.hidden = false;
    updateGeometry();
    wrapper.inert = true;
    intro.addEventListener('animationstart', revealPage);
    square.addEventListener('animationend', finishIntro);
    window.addEventListener('resize', updateGeometry);
    document.fonts.ready.then(updateGeometry);
    document.body.classList.add('intro-playing');
})();
