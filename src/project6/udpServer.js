const express = require('express');
let app = express();
const server = require('http').createServer(app);
const socket = require('socket.io')(server);
// const dgram = require('dgram');
const nodeOsc = require('node-osc');

// const host = '127.0.0.1';
const host = '192.168.1.35';

const port = '3001';
const udpPort = 3002;

app.use(express.static('./public'));
app.use(express.static('./node_modules'));

server.listen(port);

let client = new nodeOsc.Client('localhost', udpPort);
console.log(client);

let io = socket;
io.set('origins', 'http://127.0.0.1:3001/project6*.html');
// io.set('origins', 'http://*/*');
io.sockets.on('connection', newConnection);

function sendMessage(path, m1, m2){
    let message = new nodeOsc.Message(path);
    message.append(m1);
    message.append(m2);
    client.send(message, (err) => {
        if (err) console.error(err);
    });
}

function newConnection(socket) {
    console.log(`new connection, ID: ${socket.id}`);
    socket.on('mouseBall', mouseBallMsg);
    socket.on('drumPad', drumPadMsg);
    socket.on('webCam', webCamMsg);

    function mouseBallMsg(data){
        console.log(data);
        sendMessage('/path1', data.pitch, data.amplitude)
    }

    function drumPadMsg(data){
        console.log(data);
        sendMessage('/path2', data.number, data.amplitude)
    }

    function webCamMsg(data){
        console.log(data);
        let message = `/path3 ${data.pitch} ${data.amplitude};`;
        sendMessage(message)
    }
}

console.log(`Server listening on ${host}:${port}`);

