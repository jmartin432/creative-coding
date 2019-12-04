const s = (sketch) => {

    let socket;
    let host = '127.0.0.1';
    let port = '3001';
    let width =640;
    let height = 480;
    let mainCanvas;
    let systems = [];
    let systemSize = 50;
    let totalSystems = 5;
    let velocityFactor = 10;
    let acceleration = -0.1;
    let offset = 0;
    let offsetIncrement = 1.44;
    let testMessages = [
        ['/bark', 0.32900553941726685, 0.07359276711940765, 0.18524616956710815, 0.5177004337310791, 0.21738919615745544, 0.2545403838157654, 0.05231967568397522, 0, 0,0,0,0,0,0,0,0.006447233259677887, 0.018036864697933197, 0.03594883158802986, 0.5351402759552002, 0.24375838041305542, 0, 0, 0, 0.09293131530284882, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ['/bark', 0,0,0,0, 0, 0.006447233259677887, 0.018036864697933197, 0.03594883158802986, 0.5351402759552002, 0.24375838041305542, 0, 0, 0.09293131530284882, 0, 0, 0, 0, 0, 0, 0, 0, 0.32900553941726685, 0.07359276711940765, 0.18524616956710815, 0.5177004337310791, 0.21738919615745544, 0.2545403838157654, 0.05231967568397522, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ['/bark', 0,0, 0, 0, 0.006447233259677887, 0.018036864697933197, 0.03594883158802986, 0.5351402759552002, 0.24375838041305542, 0, 0, 0, 0.09293131530284882, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.32900553941726685, 0.07359276711940765, 0.18524616956710815, 0.5177004337310791, 0.21738919615745544, 0.2545403838157654, 0.05231967568397522, 0]
    ]

    sketch.setup = () => {
        let url = `http://${host}:${port}`;
        socket = io.connect(url);
        socket.on('bark', newSystem);
        mainCanvas = sketch.createCanvas(width, height);
        mainCanvas.parent('canvas');
        sketch.colorMode(sketch.HSB)
    };

    sketch.keyPressed = () => {

        newSystem(testMessages[Math.floor(Math.random()*3)])
    }

    class System {
        constructor(particles, color, systemOffset) {
            this.particles = particles;
            this.color = color;
            this.systemOffset = systemOffset;
        }
    }

    class Particle {
        constructor(x, y, angle, velocity) {
            this.x = x;
            this.y = y;
            this.velocity = velocity;
            this.angle = angle;
        }
    }

    function newSystem(data){
        console.log('new message', data);
        if (data[0] === '/bark'){
            let particles = [];
            let systemX = Math.floor(Math.random() * 640);
            let systemY = Math.floor(Math.random() * 480);
            for (let i = 1; i < systemSize + 1; i++){
                if (data[i] > 0) {
                    let particle = new Particle(systemX, systemY, 7.2 * i, Math.round(data[i] * 100) / 100 * velocityFactor);
                    particles.push(particle);
                } else {
                    particles.push(null);
                }
            }
            let system = new System(particles, Math.random() * 360, offset);
            if (systems.length < 5){
                systems.push(system);
            } else {
                systems.shift();
                systems.push(system);
            }
            offset += offsetIncrement;
            if (offset >= 7.2){
                offset = 0;
            }
            // console.log('System'+JSON.stringify(system));
        }
        console.log(systems.length);
    }

    function drawSystem(system) {
        // console.log(JSON.stringify(system));
        sketch.fill(system.color, 100, 100);
        sketch.noStroke();
        for (let i = 0; i < systemSize; i++){
            if (system.particles[i] != null) {
                sketch.ellipse(system.particles[i].x, system.particles[i].y, 5, 5);
                // update particle
                system.particles[i].velocity += acceleration;
                system.particles[i].x += Math.cos(system.particles[i].angle) * system.particles[i].velocity;
                system.particles[i].y += Math.sin(system.particles[i].angle) * system.particles[i].velocity;
            }
        }
    }


    sketch.draw = () => {
        sketch.background(51);
        for (let i = 0; i < systems.length; i++){
            drawSystem(systems[i])
        }
    }
};

let p5_2 = new p5(s);
