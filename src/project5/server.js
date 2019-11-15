const express = require('express');
const directory = require('serve-index');
let app = express();
app.use(express.static('./public'));
app.use(express.static('./node_modules'));

// app.use('/static', express.static('./node_modules'));
// app.use(directory(__dirname + 'node_modules'));
// app.use('/scripts', express.static(__dirname + 'node_modules'));
// console.log(app);
const server = require('http').createServer(app);
server.listen(3000);

const socket = require('socket.io')(server);

let io = socket;
io.set('origins', 'http://localhost:3000/project5.html');
io.sockets.on('connection', newConnection);

function newConnection(socket) {
    console.log('new connection, ID: ' + socket.id);
    socket.on('mouse', mouseMsg);

    function mouseMsg(data){
        console.log(data);
    }
}
