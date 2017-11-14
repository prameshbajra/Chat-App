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
        from: "pe.messh@gmail.com",
        text: "This is a demo text from Pramesh",
        createdAt: new Date()
    });

    socket.on("createMessage", (message) => {
        console.log("Create message");
        console.log(message);
    });

    socket.on("disconnect", () => {
        console.log(`Socket ${socket.id} disconnected`);
    });
});







