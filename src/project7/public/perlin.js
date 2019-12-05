const s = (sketch) => {

    let socket;
    let host = '127.0.0.1';
    let port = '3001';
    let width = 1440;
    let height = 900;
    let mainCanvas;
    let systems = [];
    let xOffsetInc = .01;
    let totalSystems = 5;
    let magnitudeFactor = 15;
    let increment = .1;
    let maxSteps = 100;
    let accelerationMagnitude = -.07;
    let lod = 100;
    let falloff = .1;
    let fullScreenButton;
    let testMessages = [
        ['/bark', 0.32900553941726685, 0.07359276711940765, 0.18524616956710815, 0.5177004337310791, 0.21738919615745544, 0.2545403838157654, 0.05231967568397522, 0, 0,0,0,0,0,0,0,0.006447233259677887, 0.018036864697933197, 0.03594883158802986, 0.5351402759552002, 0.24375838041305542, 0, 0, 0, 0.09293131530284882, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ['/bark', 0,0,0,0, 0, 0.006447233259677887, 0.018036864697933197, 0.03594883158802986, 0.5351402759552002, 0.24375838041305542, 0, 0, 0.09293131530284882, 0, 0, 0, 0, 0, 0, 0, 0, 0.32900553941726685, 0.07359276711940765, 0.18524616956710815, 0.5177004337310791, 0.21738919615745544, 0.2545403838157654, 0.05231967568397522, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ['/bark', 0,0, 0, 0, 0.006447233259677887, 0.018036864697933197, 0.03594883158802986, 0.5351402759552002, 0.24375838041305542, 0, 0, 0, 0.09293131530284882, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.32900553941726685, 0.07359276711940765, 0.18524616956710815, 0.5177004337310791, 0.21738919615745544, 0.2545403838157654, 0.05231967568397522, 0]
    ]

    function fullscreen(){
        let el = document.getElementById('canvas');
        el.width = 2000;
        el.height = 1000;
        width = 2000;
        height = 1000;
        if(el.webkitRequestFullScreen) {
            el.webkitRequestFullScreen();
        } else {
            el.mozRequestFullScreen();
        }
    }

    sketch.setup = () => {
        let url = `http://${host}:${port}`;
        socket = io.connect(url);
        socket.on('bark', newSystem);
        mainCanvas = sketch.createCanvas(width, height);
        mainCanvas.parent('canvas');
        fullScreenButton = document.getElementById('fullScreenButton');
        fullScreenButton.addEventListener('click', fullscreen);
        sketch.colorMode(sketch.HSB);
        sketch.noiseDetail(lod, falloff);
        sketch.background(0);

    };

    sketch.keyPressed = () => {
        newSystem(testMessages[Math.floor(Math.random()*3)])
    }

    class Particle {
        constructor(x, y, angle, magnitude, color) {
            this.pos = sketch.createVector(x, y);
            this.magnitude = magnitude * magnitudeFactor;
            this.xOffset = (Math.random() * 10000);
            this.vel = p5.Vector.fromAngle(sketch.noise(this.xOffset) * 4 * sketch.PI, magnitude);
            this.color = color;
            this.step = 0;
            this.size = 10;
        }

        update() {
            this.step++;
            this.xOffset += xOffsetInc;
            if (this.step < maxSteps) {
                this.size -= .1;
                this.vel = p5.Vector.fromAngle(sketch.noise(this.xOffset) * 4 * sketch.PI, this.magnitude);
                this.pos.add(this.vel);
            }
        }

        show() {
            sketch.fill(this.color, 100, 100);
            sketch.ellipse(this.pos.x, this.pos.y, this.size, this.size);
        }
    }

    function newSystem(data){
        if (data[0] === '/bark'){
            let systemX = Math.floor(Math.random() * width);
            let systemY = Math.floor(Math.random() * height);
            let systemColor = Math.floor(Math.random() * 360);
            let particles = [];
            let rotation = Math.floor(Math.random() * 1);
            let angleIncrement = 12.5 / data.length - 1;
            for (let i = 1; i < data.length; i++){
                if (data[i] > 0) {
                    let particle = new Particle(systemX, systemY, i, data[i], systemColor);
                    particles.push(particle);
                }
            }
            if (systems.length < 5){
                systems.push(particles);
            } else {
                systems.shift();
                systems.push(particles);
            }
        }
        console.log(systems.length);
    }

    function drawSystem(particles) {
        // console.log(JSON.stringify(particles));
        sketch.noStroke();
        for (let i = 0; i < particles.length; i++) {
            if (particles[i] != null) {
                particles[i].show();
                particles[i].update();
            }
        }
    }

    sketch.draw = () => {
        if (sketch.keyIsDown(32)){
            systems = [];
            sketch.background(0);
        }
        for (let i = 0; i < systems.length; i++) {
            drawSystem(systems[i])
        }
    }
};

let p5_2 = new p5(s);
