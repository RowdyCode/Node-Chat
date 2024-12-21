const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

const usersFile = 'users.txt';
const chatHistoryFile = 'chatHistory.txt';

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    let username = '';

    // Handle username and password (authentication)
    socket.on('setUsername', (data) => {
        const { username: user, password } = data;

        // Authenticate user (handle logic here...)

        // After successful authentication
        username = user;
        socket.emit('message', `Welcome, ${username}!`);
        socket.broadcast.emit('message', `${username} has joined the chat`);
    });

    // Handle normal chat messages
    socket.on('chatMessage', (msg) => {
        const message = `${username}: ${msg}`;
        io.emit('message', { user: username, text: msg });
        
        const logMessage = `${message}\n`;
        fs.appendFile(chatHistoryFile, logMessage, (err) => {
            if (err) {
                console.error('Error writing to file:', err);
            }
        });
    });

    // Handle file attachment
    socket.on('sendFile', (data) => {
        const { username, fileData, fileName } = data;
        const message = `${username} sent a file: ${fileName}`;

        // Broadcast the message and file data to all clients
        io.emit('message', { user: username, text: message, fileData, fileName });
    });

    // Broadcast when a user disconnects
    socket.on('disconnect', () => {
        io.emit('message', `${username} has left the chat`);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
