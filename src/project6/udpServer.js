const express = require('express');
let app = express();
const server = require('http').createServer(app);
const socket = require('socket.io')(server);
const dgram = require('dgram');

const host = '127.0.0.1';
const port = '3001';
const udpPort = 3002;

app.use(express.static('./public'));
app.use(express.static('./node_modules'));

server.listen(port);

let client = dgram.createSocket('udp4');

let io = socket;
io.set('origins', 'http://127.0.0.1:3001/project6*.html');
io.sockets.on('connection', newConnection);

function sendMessage(message){
    client.send(message, 0, message.length, udpPort, host, function(err, bytes) {
        console.log(message.length);
        if (err) throw err;
        console.log(`UDP message sent to ${host}:${udpPort}`);
        // client.close();
    });
}

function newConnection(socket) {
    console.log(`new connection, ID: ${socket.id}`);
    socket.on('mouseBall', mouseBallMsg);
    socket.on('drumPad', drumPadMsg);
    socket.on('webCam', webCamMsg);

    function mouseBallMsg(data){
        console.log(data);
        let message = `1 ${data.pitch} ${data.amplitude}`;
        sendMessage(message)
    }

    function drumPadMsg(data){
        console.log(data);
        let message = `2 ${data.number} ${data.amplitude}`;
        sendMessage(message)
    }

    function webCamMsg(data){
        console.log(data);
        let message = `3 ${data.pitch} ${data.amplitude}`;
        sendMessage(message)
    }
}

console.log(`Server listening on ${host}:${port}`);

