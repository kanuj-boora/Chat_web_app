const express = require('express');
const socketio = require('socket.io');
const http = require('http');
var cors = require('cors');

const { addUser, removeUser, getUsers, getUsersInRoom } = require('./users');
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

        const {error, user} = addUser({id: socket.id, name: name, room: room});

        if (error) {
            return callback(error);
        } else {
            console.log('user joined the room');
        }

        // message to user
        socket.emit('message', {user: 'admin', text: user.name + ' , Welcome to the room'});

        // message to everyone except user
        socket.broadcast.to(user.room).emit('message', {user: 'admin', text: '${user.name} has joined the room'});

        socket.join(user.room);

        callback();
    });

    // front-end to back-end
    socket.on('userMessage', ({ message }, callback) => {
        const user = getUsers(socket.id);
        // console.log(user.name, user.room, message);
        io.to(user.name).emit('message', ({user: user.name, text: message}));
        
        // important for front-end to do something after completion
        callback();
    })
    
    socket.on('disconnect', () => {
        console.log('user disconnected');
    })
})

server.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
})