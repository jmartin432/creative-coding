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
io.set('origins', 'http://*:3001/project6.html');
io.sockets.on('connection', newConnection);

function sendMessage(data){
    let message = `1 ${data.pitch} ${data.amplitude}`;
    client.send(message, 0, message.length, udpPort, host, function(err, bytes) {
        console.log(message.length);
        if (err) throw err;
        console.log(`UDP message sent to ${host}:${udpPort}`);
        // client.close();
    });
}

function newConnection(socket) {
    console.log(`new connection, ID: ${socket.id}`);
    socket.on('mouse', browserMsg);

    function browserMsg(data){
        console.log(data);
        sendMessage(data)
    }
}

