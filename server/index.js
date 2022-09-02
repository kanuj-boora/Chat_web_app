const express = require('express');
const socketio = require('socket.io');
const http = require('http');
var cors = require('cors');

const router = require('./router');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());

app.use(router);

io.on('connection', (socket) => {
    console.log('new user connected');

    socket.on('join', ({name, room}, callback) => {
        console.log(name, room);

        // const error = true;

        // if(error) {
        //     callback(error);
        // }
    })
    
    socket.on('disconnect', () => {
        console.log('user disconnected');
    })
})

server.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
})