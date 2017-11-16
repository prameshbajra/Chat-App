const path = require("path");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const public_path = path.join(__dirname + "/../public");
const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketio(server);

const { generateMsg } = require("./utils/message");
const { generateLocationMsg } = require("./utils/message");
const { isRealString } = require("./utils/validation");

app.use(express.static(public_path));
server.listen(port, () => {
    console.log(`Server Running on port ${port}`);
});

io.on("connection", (socket) => {
    console.log(`Socket ${socket.id} connected`);
    socket.on("join", (params, callback) => {
        console.log(params);
        if (!isRealString(params.name) || !isRealString(params.roomName)) {
            callback("Name and the roomname both are required !!");
        }
        callback();
    });

    socket.emit("newMessage", generateMsg("Admin", "Welcome to the chat app"));

    socket.broadcast.emit("newMessage", generateMsg("Admin", `${socket.id} joined. Welcome!`));

    socket.on("createMessage", (message, callback) => {
        io.emit("newMessage", generateMsg(message.from, message.text));
        callback("Fail vayo muji !!!");
    });

    socket.on("createLocationMessage", (messageCoords) => {
        io.emit("newLocationMessage", generateLocationMsg("Apple cha", messageCoords.latitude, messageCoords.longitude));
    });

    socket.on("disconnect", () => {
        console.log(`Socket ${socket.id} disconnected`);
        socket.broadcast.emit("newMessage", generateMsg("Admin", `${socket.id} disconnected !`));
    });
});







