const s = (sketch) => {

    let socket;
    let host = '127.0.0.1';
    let port = '3001';
    let width = 300;
    let height = 300;
    let mainCanvas;
    let amplitudeSlider;

    sketch.mouseClicked = () => {
        let x = Math.ceil( sketch.mouseX / 100);
        let y = Math.ceil( sketch.mouseY / 100);
        let number = (y - 1) * 3 + x;
        let amplitude = amplitudeSlider.value();
        let data = {
            number: number,
            amplitude: amplitude
        };
        socket.emit('drumPad', data);
    };

    sketch.setup = () => {
        let url = `http://${host}:${port}`;
        socket = io.connect(url);
        mainCanvas = sketch.createCanvas(width, height);
        mainCanvas.parent('canvas');
        amplitudeSlider = sketch.createSlider(0, 1, .3, .01);
        amplitudeSlider.parent('inputs')
        };

    sketch.draw = () => {
        sketch.background(51);
        sketch.stroke('#a5f7d3');
        sketch.strokeWeight(2);
        sketch.line(100, 0, 100, 300);
        sketch.line(200, 0, 200, 300);
        sketch.line(0, 100, 300, 100);
        sketch.line(0, 200, 300, 200);
        // sketch.fill('red');
        // sketch.ellipse(sketch.mouseX, sketch.mouseY, 45, 45);
    }
};

let p5_2 = new p5(s);
