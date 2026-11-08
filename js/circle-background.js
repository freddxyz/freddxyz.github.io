(() => {
    const background = document.querySelector('.circle-background');
    if (!background) return;

    const updateOrigin = () => {
        // Match the canvas's initial outer radius without a drawing loop.
        const radius = Math.hypot(background.clientWidth, innerHeight / 2);
        background.style.setProperty('--ring-origin', `${radius}px`);
    };

    updateOrigin();
    window.addEventListener('resize', updateOrigin);
})();
