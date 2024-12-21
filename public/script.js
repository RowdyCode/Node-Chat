const socket = io();

// DOM elements
const usernameContainer = document.getElementById('username-container');
const chatContainer = document.getElementById('chat-container');
const chatBox = document.getElementById('chat-box');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const fileInput = document.getElementById('file-input');
const sendFileButton = document.getElementById('send-file-button');
const usernameForm = document.getElementById('username-form');

// Store the username
let username = '';

// Append messages to the chat box
function appendMessage(msg, isSystem = false) {
    const div = document.createElement('div');
    div.className = isSystem ? 'system-message' : 'chat-message';
    div.textContent = msg;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Listen for messages from the server
socket.on('message', (data) => {
    if (typeof data === 'string') {
        appendMessage(data, true); // System messages (join/leave notifications)
    } else {
        appendMessage(`${data.user}: ${data.text}`); // User messages
    }
});

// Handle file input click
sendFileButton.addEventListener('click', () => {
    const file = fileInput.files[0];
    
    if (file) {
        const reader = new FileReader();
        
        // Read the file as a data URL (for images and small files)
        reader.onload = function(e) {
            // Emit the file as base64 string to the server
            socket.emit('sendFile', { username, fileData: e.target.result, fileName: file.name });
        };
        
        reader.readAsDataURL(file);
    } else {
        alert('Please select a file.');
    }
});




// Handle chat form submission (text messages)
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = chatInput.value;

    // Emit message to the server
    socket.emit('chatMessage', msg);

    // Clear the input field and keep the focus
    chatInput.value = '';
    chatInput.focus();
});
