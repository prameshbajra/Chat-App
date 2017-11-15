const path = require("path");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const public_path = path.join(__dirname + "/../public");
const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(public_path));
server.listen(port, () => {
    console.log(`Server Running on port ${port}`);
});

io.on("connection", (socket) => {
    console.log(`Socket ${socket.id} connected`);
    socket.emit("newMessage", {
        from: "Admin",
        text: "Welcome to the chat app",
        createdAt: new Date().getTime()
    });
    socket.broadcast.emit("newMessage", {
        from: "Admin",
        text: "New User Joined",
        createdAt: new Date().getTime()
    });

    socket.on("createMessage", (message, callback) => {
        io.emit("newMessage", {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
        callback("Fail vayo muji !!!");
    });

    socket.on("disconnect", () => {
        console.log(`Socket ${socket.id} disconnected`);
    });
});







