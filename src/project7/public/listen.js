const s = (sketch) => {

    let socket;
    let host = '127.0.0.1';
    let port = '3001';
    let width =640;
    let height = 480;
    let mainCanvas;
    let dots = [];

    sketch.setup = () => {
        let url = `http://${host}:${port}`;
        socket = io.connect(url);
        socket.on('fromPd', newDot);
        mainCanvas = sketch.createCanvas(width, height);
        mainCanvas.parent('canvas');
        sketch.colorMode(sketch.HSB)
    }

    function newDot(data){
        // console.log('new message', data);
        let dot;
        if (data[1] > 0){
            dot = {
            pitch: data[1],
            amp: data[2],
            // x: 320,
            // x: Math.random() * 640,
            // x: data[1],
            // y: ((data[1] - 200) / 1700) * 480,
            // y: ((data[2] - 69) / 10) * height,
            // alpha: 100
        };
        // console.log(dot);
        if (dots.length < 10) {
            dots.push(dot)
        } else {
            dots.shift();
            dots.push(dot);
        }
        }
    }

    function drawDot(item, i) {
        sketch.fill(180, 100, 100, i/100);
        sketch.noStroke();
        sketch.ellipse(320, 480 - ((item.pitch - 200) / 1700) * 480, item.amp, item.amp);
    }


    sketch.draw = () => {
        sketch.background(51);
        dots.forEach((item, index) => {drawDot(item, index)})
    }
};

let p5_2 = new p5(s);
