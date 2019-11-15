
const s = (sketch) => {

    let socket;

    sketch.mouseDragged = () => {
        console.log(sketch.mouseX, sketch.mouseY);
        let x = sketch.mouseX;
        let y = sketch.mouseY;
        let pitch = (x / 400) * 127;
        let amplitude = (y / 400) * 127;
        let data = {
            pitch: pitch,
            amplitude: amplitude
        };
        socket.emit('mouse', data);
    }

    sketch.setup = () => {
        socket = io.connect('http://localhost:3000');
        sketch.createCanvas(400, 400);
        };

    sketch.draw = () => {
        sketch.background(51);
        sketch.fill('red');
        sketch.ellipse(sketch.mouseX, sketch.mouseY, 45, 45);
        // const msg = input.value();
        // input.value('');
        // // send the OSC message to server.
        // //(osc.js will convert it to binary packet)
        // oscWebSocket.send({
        //     address: "/p5js/sayhi",
        //     args: [{
        //         type: "s",
        //         value: msg
        //     }]
        // });
    }
};

let p5_2 = new p5(s);
