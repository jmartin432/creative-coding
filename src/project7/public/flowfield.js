const s = (sketch) => {

    let socket;
    let host = '127.0.0.1';
    let port = '3001';
    let width =640;
    let height = 480;
    let mainCanvas;
    let systems = [];
    let totalSystems = 5;
    let velocityFactor = 10;
    let offset = 0;
    let increment = .1;
    let flowfield = [];
    let fieldScale = 20;
    let zoff = 0;
    let rows;
    let columns;
    let fullScreenButton;
    let testMessages = [
        ['/bark', 0.32900553941726685, 0.07359276711940765, 0.18524616956710815, 0.5177004337310791, 0.21738919615745544, 0.2545403838157654, 0.05231967568397522, 0, 0,0,0,0,0,0,0,0.006447233259677887, 0.018036864697933197, 0.03594883158802986, 0.5351402759552002, 0.24375838041305542, 0, 0, 0, 0.09293131530284882, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ['/bark', 0,0,0,0, 0, 0.006447233259677887, 0.018036864697933197, 0.03594883158802986, 0.5351402759552002, 0.24375838041305542, 0, 0, 0.09293131530284882, 0, 0, 0, 0, 0, 0, 0, 0, 0.32900553941726685, 0.07359276711940765, 0.18524616956710815, 0.5177004337310791, 0.21738919615745544, 0.2545403838157654, 0.05231967568397522, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ['/bark', 0,0, 0, 0, 0.006447233259677887, 0.018036864697933197, 0.03594883158802986, 0.5351402759552002, 0.24375838041305542, 0, 0, 0, 0.09293131530284882, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.32900553941726685, 0.07359276711940765, 0.18524616956710815, 0.5177004337310791, 0.21738919615745544, 0.2545403838157654, 0.05231967568397522, 0]
    ]

    function fullscreen(){
        let el = document.getElementById('canvas');
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
        fullScreenButton.addEventListener('click', function(){
        });
        sketch.colorMode(sketch.HSB);
        rows = height / fieldScale;
        columns = width / fieldScale;

    };

    sketch.keyPressed = () => {
        newSystem(testMessages[Math.floor(Math.random()*3)])
    }

    class System {
        constructor(particles) {
            this.pos = sketch.createVector(Math.floor(Math.random() * width), Math.floor(Math.random() * height));
            this.particles = particles;
            this.color = Math.floor(Math.random() * 360);
        }
    }

    class Particle {
        constructor(x, y, angle, velocity, color) {
            this.pos = sketch.createVector(x, y);
            this.vel = p5.Vector.fromAngle(angle, velocity);
            this.acc = sketch.createVector(0, 0);
            this.color = color;
        }

        update() {
            this.vel.add(this.acc);
            this.pos.add(this.vel);
        }

        follow(vectors) {
            let scaledX = this.pos.x / fieldScale;
            let scaledY = this.pos.y / fieldScale;
            let index = x + y * columns;
            let force = vectors[index];
            this.applyForce(force);
        }

        applyForce(force) {
            this.acc.add(force);
        }

        show() {
            for (let i = 0; i < system.particles.length; i++){
            if (system.particles[i] != null) {
                system.particles[i].update;
            }
        }
            sketch.ellipse(this.pos.x, this.pos.y, 5, 5);
        }
    }

    function newSystem(data){
        console.log('new message', data);
        if (data[0] === '/bark'){
            let systemX = Math.floor(Math.random() * width);
            let systemY = Math.floor(Math.random() * height);
            let systemColor = Math.floor(Math.random() * 360);
            let particles = [];
            for (let i = 1; i < data.length; i++){
                if (data[i] > 0) {
                    let particle = new Particle(systemX, systemY, 7.2 * i, data[i], systemColor);
                    particles.push(particle);
                } else {
                    particles.push(null);
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

    function updateFlowField() {
        let yoff = 0;
        for (let i = 0; i < rows; i++){
            let xoff = 0;
            for (let j = 0; j < columns; j++){
                let index = i + j * columns;
                let angle = sketch.noise(xoff, yoff, zoff) * sketch.TWO_PI;
                let v = p5.Vector.fromAngle(angle);
                flowfield[index] = v;
                xoff += increment;
                sketch.stroke(255);
                sketch.push();
                sketch.translate(i * fieldScale, j * fieldScale);
                sketch.rotate(v.heading());
                sketch.line(0, 0, fieldScale, 0);
                sketch.pop();
            }
            yoff += increment;
            zoff += .001;
        }
    }



    function drawSystem(system) {
        // console.log(JSON.stringify(system));
        sketch.fill(system.color, 100, 100);
        sketch.noStroke();
        for (let i = 0; i < system.particles.length; i++){
            if (system.particles[i] != null) {
                system.particles[i].update;
            }
        }
    }


    sketch.draw = () => {
        sketch.background(0);
        updateFlowField();
        for (let i = 0; i < systems.length; i++){
            systems[i].particles.show();
            systems[i].particles.update();
        }
    }
};

let p5_2 = new p5(s);
