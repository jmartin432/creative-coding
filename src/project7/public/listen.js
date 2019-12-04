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
    let velocityFactor = 1000;
    let acceleration = .1;
    let offset = 0;
    let offsetIncrement = 1.44;

    sketch.setup = () => {
        let url = `http://${host}:${port}`;
        socket = io.connect(url);
        socket.on('bark', newSystem);
        mainCanvas = sketch.createCanvas(width, height);
        mainCanvas.parent('canvas');
        sketch.colorMode(sketch.HSB)
    };

    class System {
        constructor(particles, color, systemOffset) {
            this.particles = particles;
            this.color = color;
            this.systemOffset = systemOffset;
        }
    }

    class Particle {
        constructor(height, width, angle, velocity) {
            this.height = height;
            this.width = width;
            this.velocity = velocity;
            this.angle = angle;
        }
    }

    function newSystem(data){
        console.log('new message', data);
        if (data[0] === '/bark'){
            let particles = [];
            for (let i = 1; i < systemSize + 1; i++){
                if (data[i] > 0) {
                    let particle = new Particle(240, 320, 7.2 * i, data[i] * velocityFactor);
                    particles.push(particle);
                } else {
                    particles.push(null);
                }
            }
            let system = new System(particles, Math.random() * 360, offset);
            if (systems.length < 5){
                systems.push(system);
            } else {
                systems.splice(1).push(system);
            }
            offset +=
            console.log('System'+JSON.stringify(system));
        }
    }

    function drawSystem(system) {
        sketch.fill(system.color, 100, 100);
        sketch.noStroke();
        for (let i = 0; i < systemSize; i++){
            sketch.ellipse(system.particles[i].x, system.particles[i].y, 10, 10);
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
