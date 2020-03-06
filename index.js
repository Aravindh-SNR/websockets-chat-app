const express = require('express');
const socket = require('socket.io');

const app = express();

// Static resources are to be served from the public folder
app.use(express.static('public'));

const server = app.listen(process.env.PORT || 3000);

const io = socket(server);

io.on('connection', socket => {

    // Whenever a chat event is received by the socket in connection, it is emitted to all the connected sockets
    socket.on('chat', data => {
        io.emit('chat', data);
    });

    // Whenever a typing event is received by the socket in connection, it is broadcasted, i.e.
    // it is emitted to all the connected sockets except the one that emitted the event in the first place
    socket.on('typing', data => {
        socket.broadcast.emit('typing', data);
    });
});