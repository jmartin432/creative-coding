const s = (sketch) => {

    let socket;

    sketch.mouseDragged = () => {
        console.log(sketch.mouseX, sketch.mouseY);
        let x = sketch.mouseX;
        let y = sketch.mouseY;
        let pitch = ((x - 200) / 200) * 1600;
        let amplitude = ((400 - y) / 400);
        let data = {
            pitch: pitch,
            amplitude: amplitude
        };
        socket.emit('mouse', data);
    };

    sketch.setup = () => {

        socket = io.connect('http://localhost:3001');
        sketch.createCanvas(400, 400);
        };

    sketch.draw = () => {
        sketch.background(51);
        sketch.fill('red');
        sketch.ellipse(sketch.mouseX, sketch.mouseY, 45, 45);
    }
};

let p5_2 = new p5(s);
