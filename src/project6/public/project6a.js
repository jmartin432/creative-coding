const s = (sketch) => {

    let socket;
    let host = '192.168.1.35';
    let port = '3001';
    let width = 400;
    let height = 400;
    let mainCanvas;

    function createMessage() {
        let x = sketch.mouseX;
        let y = sketch.mouseY;
        let pitch = ((x - (width / 2)) / (width / 2)) * 1600;
        let amplitude = ((height - y) / height);
        return {
            pitch: pitch,
            amplitude: amplitude
        };
    }

    sketch.mouseDragged = () => {
        socket.emit('mouseBall', createMessage());
    };

    sketch.mouseClicked = () => {
        socket.emit('mouseBall', createMessage());
    };

    sketch.setup = () => {
        let url = `http://${host}:${port}`;
        socket = io.connect(url);
        mainCanvas = sketch.createCanvas(width, height);
        mainCanvas.parent('canvas');
        };

    sketch.draw = () => {
        sketch.background(51);
        sketch.fill('red');
        sketch.ellipse(sketch.mouseX, sketch.mouseY, 45, 45);
    }
};

let p5_2 = new p5(s);
