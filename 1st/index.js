const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const PORT = 5000;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    const id = socket.id;
    let username = '';

    console.log(`Пользователь ${id} подключился`);

    socket.on('username', (name) => {
        console.log(`Пользователь ${id} назвался ${name}`);
        username = name;
        io.emit('message', username, 'присоединился к беседе');
    });

    socket.on('message', (msg) => {
        io.emit('message', username, msg);
    });

    socket.on('disconnect', () => {
        console.log(`Пользователь ${`${id} ${username ? `(${username}) ` : ''}`}отключился`);
    });
});

server.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});