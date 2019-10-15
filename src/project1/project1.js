const s = (sketch) => {

    let height = 400;
    let width = 800;
    let xRotation = 0;
    let yRotation = 0;
    let zRotation = 0;
    let xRotationD = .0;
    let yRotationD = .0;
    let zRotationD = .0;
    let boxX = 100;
    let boxY = 100;
    let boxZ = 100;
    let hue = Math.random() * 360;
    let font;

    sketch.keyPressed = (event) => {
        if (event.key === 'q' && xRotationD > -.25) {
            xRotationD -= .01;
        } else if (event.key === 'w' && xRotationD < .25) {
            xRotationD += .01;
        } else if (event.key === 'a' && yRotationD > - .25) {
            yRotationD -= .01;
        } else if (event.key === 's' && yRotationD < .25) {
            yRotationD += .01;
        } else if (event.key === 'z' && zRotationD > -.25) {
            zRotationD -= .01;
        } else if (event.key === 'x' && zRotationD < .25) {
            zRotationD += .01;
        } else if (event.key === 'e' && boxX > 25) {
            boxX -= 2;
        } else if (event.key === 'r' && boxX < 200) {
            boxX += 2;
        } else if (event.key === 'd' && boxY > 25) {
            boxY -= 2;
        } else if (event.key === 'f' && boxY < 200) {
            boxY += 2;
        } else if (event.key === 'c' && boxZ > 25) {
            boxZ -= 2;
        } else if (event.key === 'v' && boxZ > 200) {
            boxZ += 2;
        }
        xRotationD = Math.round(xRotationD * 100) / 100;
        yRotationD = Math.round(yRotationD * 100) / 100;
        zRotationD = Math.round(zRotationD * 100) / 100;
        console.log(`xRotationDelta: ${xRotationD}, yRotationDelta: ${yRotationD}, zRotationDelta: ${zRotationD}`);
        console.log(`Box x: ${boxX}, Box y: ${boxY}, Box z: ${boxZ}`);
    };

    // function updateText () {
    //     sketch.textFont(font);
    //     sketch.fill(255);
    //     sketch.text(`xRotationDelta: ${xRotationD}, yRotationDelta: ${yRotationD}, zRotationDelta: ${zRotationD}`, 10, 10);
    // };

    // sketch.preload = () => {
    //     font = sketch.loadFont('data/TTWPGOTT.otf', 25);
    // };

    sketch.setup = () => {
        sketch.colorMode(sketch.HSB);
        sketch.createCanvas(width, height, sketch.WEBGL);
    };

    sketch.draw = () => {
        sketch.background(0, 0, 0);

        sketch.stroke(255);
        sketch.fill(hue, 70, 30);
        sketch.push();
        sketch.translate(50, 50);
        sketch.rotateX(xRotation);
        sketch.rotateY(yRotation);
        sketch.rotateZ(zRotation);
        sketch.box(boxX, boxY, boxZ);
        sketch.pop();

        sketch.noFill();
        sketch.stroke(255);
        sketch.push();
        sketch.translate(500, height * 0.35, -200);
        sketch.sphere(300);
        sketch.pop();

        xRotation += xRotationD;
        yRotation += yRotationD;
        zRotation += zRotationD;
        hue += .1;
        hue = hue % 360;
        // updateText();
    }
};

let p5_1 = new p5(s);
