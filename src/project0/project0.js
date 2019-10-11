const s = (sketch) => {

    let bg;
    let flower;
    let location = '';
    let transformation;
    let transformType = "NONE";
    let origin = '';
    let originX = 245;
    let originY = 184;
    let scaleX = 1;
    let scaleY = 1;
    let textX = 10;
    let textY = 10;
    let transformLength = 0;
    let transformCounter = 0;
    let rotation = 0;
    let transforming = false;
    let targetScaleX = -1;
    let targetScaleY = -1;
    let flipStepX = -.1;
    let flipStepY = -.1;

    function decideTransformation(x, y) {
        if ((originX - 45) < x && x < (originX + 45) && (originY - 45) < y && y < (originY + 45)) {
            transformType = "MOVE";
        } else if (
            ((originX - 135) < x && x < (originX - 45) && (originY - 135) < y && y < (originY - 45)) ||
            ((originX + 45) < x && x < (originX + 135) && (originY - 135) < y && y < (originY - 45)) ||
            ((originX + 45) < x && x < (originX + 135) && (originY + 45) < y && y < (originY + 135)) ||
            ((originX - 135) < x && x < (originX - 45) && (originY + 45) < y && y < (originY + 135))
        ) {
            transformType = "ROTATE";
        } else if (
            ((originX - 45) < x && x < (originX + 45) && (originY - 135) < y && y < (originY - 45)) ||
            ((originX - 45) < x && x < (originX + 45) && (originY + 45) < y && y < (originY + 135))
        ) {
            transformType = "VERTICAL";
        } else if (
            ((originX - 135) < x && x < (originX - 45) && (originY - 45) < y && y < (originY + 45)) ||
            ((originX + 45) < x && x < (originX + 135) && (originY - 45) < y && y < (originY + 45))
        ) {
            transformType = "HORIZONTAL";
        } else {
            transformType = "NONE";
        }
        if (transformType !== "NONE") {
            transforming = true;
        }
    }

    function updateText () {
        location = "mouseX: " + (sketch.mouseX - originX) + ", mouseY: " + (sketch.mouseY - originY);
        origin = "originX: " + (originX) + ", originY: " + (originY);
        transformation = "Transformation: " + transformType;
        sketch.fill(0);
        sketch.text(location, textX, textY);
        sketch.text(origin, textX, textY+30);
        sketch.text(transformation, textX, textY + 50);
        sketch.text(transformLength, textX, textY + 70);
        sketch.text(transformCounter, textX, textY + 90);
        sketch.text(rotation, textX, textY + 110);
    }

    sketch.mousePressed = () => {
        if (transforming === false) {
            decideTransformation(sketch.mouseX, sketch.mouseY);
        }
    }

    sketch.mouseReleased = () => {
        if (transformType === "MOVE") {
            transformType = "NONE";
            transforming = false;
        }
    }

    sketch.mouseDragged = () => {
        if (transformType === "MOVE") {
            originX = sketch.mouseX;
            originY = sketch.mouseY;
        }
    }

    sketch.preload = () => {
        bg = sketch.loadImage('data/swirly.jpg');
        flower = sketch.loadImage('data/sunflower.png');
    }

    sketch.setup = () => {
        sketch.createCanvas(491, 368);
        flower.resize(270, 270);
    };

    sketch.draw = () => {
        sketch.imageMode(sketch.CORNER);
        sketch.background(bg);
        updateText();
        if (sketch.mouseIsPressed){
            if (transformType == "ROTATE"){
                transformLength += 2;
                transforming = true;
            }
        }
        sketch.translate(originX, originY);
        sketch.imageMode(sketch.CENTER);
        if (transformType === "HORIZONTAL"){
            scaleX += flipStepX;
            if (Math.floor(scaleX) === targetScaleX){
                scaleX = targetScaleX;
                transformType = "NONE";
                transforming = false;
                targetScaleX *= -1;
                flipStepX *= -1;
            }
        } else if (transformType === "VERTICAL"){
            scaleY += flipStepY;
            if (Math.floor(scaleY) === targetScaleY){
                scaleY = targetScaleY;
                transformType = "NONE";
                transforming = false;
                targetScaleY *= -1;
                flipStepY *= -1;
            }
        } else if (transformType === "ROTATE"){
            rotation += 10;
            rotation = rotation % 360;
            transformCounter += .2;
            if (Math.floor(transformCounter) === transformLength){
                transforming = false;
                transformType = "NONE";
                transformLength = 0;
                transformCounter = 0;
            }
        }
        sketch.scale(scaleX, scaleY);
        sketch.rotate(sketch.radians(rotation));
        sketch.image(flower, 0, 0);
    };
};

let myp5 = new p5(s);
