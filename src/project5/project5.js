
const s = (sketch) => {

    sketch.keyPressed = (event) => {
        sketch.getAudioContext().resume();
        if (event.key === " ") {
            if (osc.started) {
                osc.stop();
            } else {
                osc.start();
            }

        }
        console.log(JSON.stringify("Osc On " + osc.started));
        console.log("audioOn: " + audioOn);
    };

    sketch.mouseDragged = () => {
        console.log(sketch.mouseX, sketch.mouseY);
        let x = sketch.mouseX;
        let y = sketch.mouseY;
        let pitch = (x / 400) * 1000;
        let amplitude = (y / 400);
        let data = {
            pitch: pitch,
            amplitude: amplitude
        };
    };

    sketch.setup = () => {
        osc = new p5.Oscillator();
        osc.setType('sine');
        osc.amp(.3);
        osc.freq(240);
        osc.start();
        sketch.createCanvas(400, 400);
        };

    sketch.draw = () => {
        sketch.background(51);
        sketch.fill('red');
        sketch.ellipse(sketch.mouseX, sketch.mouseY, 45, 45);
    }
};

let p5_2 = new p5(s);
