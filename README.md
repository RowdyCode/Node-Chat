# Chat App

This is a real-time chat application built with **Node.js**, **Socket.io**, and **Express.js**. It allows users to log in with a username and password, chat with others, and send attachments (such as images, documents, etc.). The app stores user credentials in a `users.txt` file and chat history in a `chatHistory.txt` file.

## Developer
**RowdyCode**

## Technologies Used

- **Node.js**: JavaScript runtime environment for server-side development.
- **Express.js**: Web framework for Node.js used to serve static files and handle HTTP requests.
- **Socket.io**: Enables real-time, bidirectional communication between the client and server.
- **HTML5 & CSS3**: For the front-end structure and styling of the chat interface.
- **JavaScript**: For client-side interactivity and communication with the server.
- **File System (fs)**: To read and write chat history and user credentials from files.

## Features

- User authentication with username and password.
- Real-time chat messaging.
- Ability to send text messages and attachments (images, PDF, text files, etc.).
- Chat history is saved to a `chatHistory.txt` file.
- User credentials are stored in a `users.txt` file.

## Node Packages

- **express**: Web framework for handling HTTP requests.
- **socket.io**: A library for enabling real-time communication between the server and client.
- **fs**: Node.js's file system module for reading and writing files (used for storing user credentials and chat history).

## Installation and Setup

1. Clone this repository to your local machine:
   ```bash
   git clone <repository-url>
