function init() {
    window.canvas = document.getElementById('main-canvas');
    window.ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.particles = {};
    window.offset = {
        x : 0,
        y : 0,
        shakePath : [],
        shake : (len) => {
            for(let i = 0; i < len - window.offset.shakePath.length; i++) {
                window.offset.shakePath.push( (Math.random() * 3) - 1);
            }
        },
        apply : () => {
            if(window.offset.shakePath.length >= 2) {
                window.offset.x = window.offset.shakePath.pop();
                window.offset.y = window.offset.shakePath.pop();
            } else {
                window.offset.x = 0;
                window.offset.y = 0;
            }
        }
    };
    window.mouse = {
        x: 0,
        y: 0
    };

    window.addEventListener('mousemove', (e) => {
        let rect = window.canvas.getBoundingClientRect();
        window.mouse.x = e.x + rect.left;
        window.mouse.y = e.y + rect.top;
    });

    window.player = new Player(300, 300);
}

function drawLoop() {
    // call loop next time we can draw
    requestAnimationFrame(drawLoop);
    clearScreen(window.palette.autumn.brownSugar);
    window.offset.apply();
    window.player.draw();
    playParticles();
}

function playParticles() {
    for(let p of Object.values(window.particles)) {
        p.update();
        p.draw();
    }
}

function clearScreen(bgColor) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = bgColor;
    ctx.fillRect(10, 10, canvas.width - 20, canvas.height - 20);
}

// runs when DOM finishes loading
window.addEventListener('load', () => {

    init();
    drawLoop();

});