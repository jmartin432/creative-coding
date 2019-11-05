const s = (sketch) => {

    let width = 240;
    let height = 140;
    let size = 20;
    let x = 0;
    let y = 0;
    let c;
    let osc;
    let amplitude;
    let note;
    let freq;
    let audioOn = false;

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

    sketch.setup = () => {
        sketch.colorMode(sketch.HSB);
        c = sketch.color(0, 100, 100);
        sketch.createCanvas(width, height);

        osc = new p5.Oscillator();
        osc.setType('sine');
        osc.amp(.3);
        osc.freq(240);
        osc.start();

        if (navigator.requestMIDIAccess) {
            console.log('This browser supports WebMIDI!');
        } else {
            console.log('WebMIDI is not supported in this browser.');
        }
        navigator.requestMIDIAccess()
            .then(onMIDISuccess, onMIDIFailure);

        function onMIDIFailure() {
            console.log('Could not access your MIDI devices.');
        }
        function onMIDISuccess(midiAccess) {
            for (var input of midiAccess.inputs.values())
                input.onmidimessage = getMIDIMessage;
        }

        function getMIDIMessage(message) {
            console.log('Data: ' + message.data);
            let command = message.data[0];
            let velocity = (message.data.length > 2) ? message.data[2] : 0; // a velocity value might not be included with a noteOff command

            switch (message.data[1]) {
                case 1:
                    x = Math.floor((velocity / 127) * 11);
                    break;
                case 2:
                    y = Math.floor((velocity / 127) * 6);
                    break;
                case 3:
                    osc.amp(velocity / 127);
                    break;
                case 36:
                    c = sketch.color(0, 100, 100);
                    osc.setType('sine');
                    break;
                case 37:
                    c = sketch.color(90, 100, 100);
                    osc.setType('triangle');
                    break;
                case 38:
                    c = sketch.color(180, 100, 100);
                    osc.setType('sawtooth');
                    break;
                case 39:
                    c = sketch.color(270, 100, 100);
                    osc.setType('square');
                    break;
            };
            note = y * 12 + x + 24;
            osc.freq(sketch.midiToFreq(note));
            console.log(note, sketch.midiToFreq(note));
            if (sketch.getAudioContext().state !== 'running') {
                console.log('Starting Audio Context');
                sketch.getAudioContext().resume();
                console.log(JSON.stringify(osc));
                osc.start()
            }
        }
    };

    sketch.draw = () => {
        sketch.background(51);
        sketch.fill(c);
        sketch.rect(x * size, y * size, size, size);
    }
};

let p5_2 = new p5(s);
