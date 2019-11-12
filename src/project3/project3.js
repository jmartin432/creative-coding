const s = (sketch) => {

    let capture;
    let width = 640;
    let height = 480;
    let radius = 25;
    let radiusColor = sketch.color("#A366FF");
    let pixelValue = 'red';
    let strokeWght = 1;
    let radiusSlider;
    let radiusColorPicker;
    let mainCanvas;
    let colorSelect;
    let radiusSliderLabel;
    let colorSelectLabel;
    let radiusColorPickerLabel;

    sketch.keyPressed = (event) => {
        // console.log('1:'+radiusColor);
        // console.log('2:'+radiusColorPicker.value);
        console.log('3:'+radiusSlider.value);
        console.log(radiusSlider);
    };

    function updateValues(event){
        console.log(event)
    }


    sketch.preload = () => {};


    sketch.setup = () => {
        sketch.frameRate(30);
        sketch.ellipseMode(sketch.CENTER);
        sketch.pixelDensity(1);
        mainCanvas = sketch.createCanvas(width, height);
        mainCanvas.parent("canvas");
        capture = sketch.createCapture(sketch.VIDEO);
        capture.hide();
        // Make Radius Slider
        radiusSliderLabel = sketch.createDiv('Radius');
        radiusSliderLabel.parent("inputs");
        radiusSlider = sketch.createSlider(5, 15, 8, 1);
        radiusSlider.parent(radiusSliderLabel);
        // Make Pixel Color Selector
        colorSelectLabel = sketch.createDiv('Pixel Color');
        colorSelectLabel.parent("inputs");
        colorSelect = sketch.createSelect();
        colorSelect.parent(colorSelectLabel);
        colorSelect.option('red');
        colorSelect.option('blue');
        colorSelect.option('green');
        colorSelect.option('brightness');
        colorSelect.option('random');
        // Make Radius Color Selector
        radiusColorPickerLabel = sketch.createDiv('Radius Color Picker');
        radiusColorPickerLabel.parent('inputs');
        radiusColorPicker = sketch.createColorPicker("#A366FF");
        radiusColorPicker.parent(radiusColorPickerLabel);
    };

    sketch.draw = () => {
        let choice;
        sketch.background(255);
        radiusColor = radiusColorPicker.value();
        radius = radiusSlider.value();
        capture.loadPixels();
        for (let x = radius; x < width; x += radius){
            for (let y = radius; y < height; y += radius){
                let i = width * y + x;
                let redValue = capture.pixels[i * 4];
                let greenValue = capture.pixels[i * 4 + 1];
                let blueValue = capture.pixels[i * 4 + 2];
                let brightnessValue = (redValue + greenValue + blueValue) / 3;
                if (colorSelect.value() === 'random') {
                    choice = sketch.random(['red', 'green','blue', 'brightness', 'random'])
                } else {
                    choice = colorSelect.value();
                }
                switch (choice) {
                    case 'red':
                        sketch.fill(redValue, 0, 0);
                        break;
                    case 'green':
                        sketch.fill(0, greenValue, 0);
                        break;
                    case 'blue':
                        sketch.fill(0, 0, blueValue);
                        break;
                    case 'brightness':
                        sketch.fill(brightnessValue, brightnessValue, brightnessValue);
                        break;
                }
                sketch.stroke(radiusColor);
                sketch.strokeWeight(strokeWght);
                sketch.ellipse(x, y, radius, radius);
            }
        }
        // sketch.filter(sketch.INVERT, 0);
    }
};

let p5_2 = new p5(s);
