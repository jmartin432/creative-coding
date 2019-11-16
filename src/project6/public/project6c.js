const s = (sketch) => {

    let socket;
    let host = '127.0.0.1';
    let port = '3001';
    let mainCanvas;
    let width = 400;
    let height = 400;

    sketch.mouseDragged = () => {
        let x = sketch.mouseX;
        let y = sketch.mouseY;
        let pitch = ((x - (width / 2)) / (width / 2)) * 1600;
        let amplitude = ((height - y) / height);
        let data = {
            pitch: pitch,
            amplitude: amplitude
        };
        socket.emit('webCam', data);
    };

    sketch.setup = () => {
        let url = `http://${host}:${port}`;
        socket = io.connect(url);
        mainCanvas = sketch.createCanvas(width, height);
        mainCanvas.parent('canvas')
        };

    sketch.draw = () => {
        sketch.background(51);
        sketch.fill('red');
        sketch.ellipse(sketch.mouseX, sketch.mouseY, 45, 45);
    }
};

let p5_2 = new p5(s);
