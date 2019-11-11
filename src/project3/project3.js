const s = (sketch) => {

    let capture;
    let image1;
    let image2;
    let image3;
    let image4;

    // sketch.keyPressed = (event) => {
    //     sketch.getAudioContext().resume();
    //     if (event.key === " ") {
    //         if (osc.started) {
    //             osc.stop();
    //         } else {
    //             osc.start();
    //         }
    //
    //     }
    //     console.log(JSON.stringify("Osc On " + osc.started));
    //     console.log("audioOn: " + audioOn);
    // };

    sketch.setup = () => {
        sketch.createCanvas(640, 480);
        capture = sketch.createCapture(sketch.VIDEO);
        capture.hide()
    };

    sketch.draw = () => {
        sketch.background(255);
        let image1 = sketch.image(capture, 0, 0, 640, 480);
        let image2 = sketch.image(capture, 0, 0, 640, 480);
        image1.sketch.loadPixels();
        sketch.filter(sketch.INVERT, 0);
    }
};

let p5_2 = new p5(s);
