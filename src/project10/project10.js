const s = (sketch) => {

    let symmetry = 6;
    let width = 400;
    let height = 400;
    let mainCanvas;
    let amplitudeSlider;
    let mx, my, pmx, pmy;
    let drawMode = 1;

    sketch.keyPressed = () => {
        let k = event.key;
        if (k === " ") {
            sketch.background(0);
            return
        }
        let knum = parseInt(k);
        if (1 <= knum < 4){
            drawMode = knum;
            console.log(drawMode);
        }
        return;
    };

    function drawMode1(x, y, px, py) {
        sketch.stroke(255, 100);
        let angle = 360 / symmetry;
        for (let i = 0; i < symmetry; i++) {
            sketch.rotate(angle);
            sketch.push();
            sketch.scale(-1, 1);
            let d = sketch.dist(x, y, px, py);
            let sw = sketch.map(d, 0, 8, 8, 1);
            sketch.strokeWeight(sw);
            sketch.line(x, y, px, py);
            sketch.pop();
        }
    }

    function drawMode2(x, y, px, py){
        sketch.stroke(255, 100);
        let angle = 360 / symmetry;
        for (let i = 0; i < symmetry; i++) {
            sketch.rotate(angle);
            let d = sketch.dist(x, y, px, py);
            let sw = sketch.map(d, 0, 8, 8, 1);
            sketch.strokeWeight(sw);
            sketch.push();
            sketch.line(x, y, px, py);
            sketch.pop();
            sketch.push();
            sketch.scale(1, -1);
            sketch.line(x, y, px, py);
            sketch.pop();
        }
    }

    function drawMode3(x, y, px, py){
        sketch.stroke(255, 100);
        let angle = 360 / symmetry;
        for (let i = 0; i < symmetry; i++) {
            sketch.rotate(angle);
            let d = sketch.dist(x, y, px, py);
            let sw = sketch.map(d, 0, 8, 8, 1);
            sketch.strokeWeight(sw);
            sketch.push();
            sketch.line(x, y, px, py);
            sketch.pop();
            sketch.push();
            sketch.scale(1, -1);
            sketch.line(x, y, px, py);
            sketch.pop();
        }
    }

    sketch.setup = () => {
        sketch.angleMode(sketch.DEGREES);
        mainCanvas = sketch.createCanvas(width, height);
        mainCanvas.parent('canvas');
        sketch.background(0);
        amplitudeSlider = sketch.createSlider(0, 1, .3, .01);
        amplitudeSlider.parent('inputs')
    };

    sketch.draw = () => {
        sketch.translate(width/2, height/2);
        let mx = sketch.mouseX - width / 2;
        let my = sketch.mouseY - height / 2;
        let pmx = sketch.pmouseX - width / 2;
        let pmy = sketch.pmouseY - height / 2;
        if (sketch.mouseIsPressed) {
            switch (drawMode){
                case 1:
                    drawMode1(mx, my, pmx, pmy);
                    break;
                case 2:
                    drawMode2(mx, my, pmx, pmy);
                    break;
                case 3:
                    drawMode3(mx, my, pmx, pmy);
                    break;
                default:
                    break;
            }
            // pmx = mx;
            // pmy = my;
        }
    }
};

let p5_2 = new p5(s);
