const s = (sketch) => {

    let pi = sketch.PI;
    let leftAngle = 5.8;
    let rightAngle = 5.8;
    let leftAngleSlider;
    let rightAngleSlider;
    let branchesSlider;
    let height = 500;
    let width = 600;
    let lengthFactor = .8;
    let branches = 5;
    let colorPicker = 0xA366FF;
    let branchColor;
    let mainCanvas;
    let strokeWght;

    function inputChange() {
        sketch.redraw();
    }

    function branch(length, branches, strokeWght) {
        branches--;
        sketch.strokeWeight(strokeWght);
        sketch.line(0, 0, 0, -length);
        sketch.translate(0, -length);
        if (branches > 0) {
            strokeWght = strokeWght - 1;
            sketch.push();
            sketch.rotate(rightAngle);
            branch (length * lengthFactor, branches, strokeWght);
            sketch.pop();
            sketch.push();
            sketch.rotate(-leftAngle);
            branch(length * lengthFactor, branches, strokeWght);
            sketch.pop();
        }
    }
    sketch.setup = () => {
        sketch.noLoop();
        mainCanvas = sketch.createCanvas(width, height);
        mainCanvas.parent("canvas");
        leftAngleSlider = document.getElementById("leftAngleSlider");
        leftAngleSlider.oninput = function(){inputChange()};
        rightAngleSlider = document.getElementById("rightAngleSlider");
        rightAngleSlider.oninput = function(){inputChange()};
        branchesSlider = document.getElementById("branches");
        branchesSlider.oninput = function(){inputChange()};
        colorPicker = document.getElementById("colorPicker");
        colorPicker.oninput = function(){inputChange()};
    };

    sketch.draw = () => {
        sketch.background(51);
        sketch.stroke(colorPicker.value);
        sketch.translate(width / 2, height);
        leftAngle = leftAngleSlider.value;
        rightAngle = rightAngleSlider.value;
        branches = Math.ceil(branchesSlider.value);
        strokeWght = branchesSlider.value;
        branch(100, branches, strokeWght);
    }
};

let p5_2 = new p5(s);
