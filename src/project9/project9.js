const s = (sketch) => {

    let input;
    let canvas;
    let trail;
    let width = 640;
    let height = 480;
    let lastX = 0;
    let lastY = 0;
    let host = '127.0.0.1';
    let port = '3001';
    let socket;

    function createMessage() {
        console.log('here');
        let x = input.targetPosition[0];
        let y = input.targetPosition[1];
        let pitch = ((x - (width / 2)) / (width / 2)) * 1600;
        let amplitude = ((height - y) / height);
        let message = {
            pitch: pitch,
            amplitude: amplitude
        };
        socket.emit('mouseBall', message)
    }

    sketch.setup = () => {
        let url = `http://${host}:${port}`;
        socket = io.connect(url);

        canvas = sketch.createCanvas(width, height);
        canvas.parent('canvas');

        // Create a pose input element
        input = document.createElement('acc-pose-input');
        input.initialize();

        // Set the input dimensions to match the canvas'
        input.contentElement = canvas.elt;

        // Set body part to track
        input.part = 'nose';

        // trail = new LightPainter();

    }

    sketch.draw = () => {
        if (input.isReady) {
            canvas.elt.getContext('2d').drawImage(input.canvas, 0, 0, input.canvas.width, input.canvas.height);

            // Darken the video
            sketch.fill(0, 140);
            sketch.noStroke();
            sketch.rect(0, 0, width, height);

            let pointerX = input.targetPosition[0];
            let pointerY = input.targetPosition[1];

            sketch.noStroke();
            sketch.fill(0, 0, 255);
            sketch.ellipse(input.targetPosition[0], input.targetPosition[1], 60, 60);

            let d = sketch.dist(lastX, lastY, pointerX, pointerY);
            console.log(d);

            if (d > 20) {
                createMessage();
            }
            
            lastX = pointerX;
            lastY = pointerY


            // Discard the initial position at (0,0)
            // if (pointerX > 0) {
                // trail.addPoint(pointerX, pointerY);
                // trail.display();
            // }
        }
    }

    sketch.mousePressed = () => {
        // Reset centerpoint
        // This can be useful to make the entire screen accessible for users
        // whose resting position is not at the center of the screen.
        // Use in combination with the amplification factor.
        input.setCenterToCurrentPosition();
    }
}

let p5_2 = new p5(s);
