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
const { Users } = require("./utils/users");

const users = new Users();

app.use(express.static(public_path));
server.listen(port, () => {
    console.log(`Server Running on port ${port}`);
});

io.on("connection", (socket) => {
    socket.on("join", (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.roomName)) {
            return callback("Name and the roomname both are required !!");
        }
        socket.join(params.roomName);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.roomName);

        io.to(params.roomName).emit("updateUserList", users.getUserList(params.roomName));
        socket.emit("newMessage", generateMsg("Admin", "Welcome to the chat app"));
        socket.broadcast.to(params.roomName).emit("newMessage", generateMsg("Admin", `${params.name} joined.`));
        callback();
    });

    socket.on("createMessage", (message, callback) => {
        const user = users.getUser(socket.id);
        if (user && isRealString(message.text)) {
            io.to(user[0].roomName).emit("newMessage", generateMsg(user[0].name, message.text));
        }
        callback("Working here ...");
    });

    socket.on("createLocationMessage", (messageCoords) => {
        const user = users.getUser(socket.id);
        if (user) {
            io.to(user[0].roomName).emit("newLocationMessage", generateLocationMsg(user[0].name, messageCoords.latitude, messageCoords.longitude));
        }
    });

    socket.on("disconnect", () => {
        let user = users.removeUser(socket.id);
        if (user) {
            io.to(user[0].roomName).emit("updateUserList", users.getUserList(user[0].roomName));
            io.to(user[0].roomName).emit("newMessage", generateMsg("Admin", `${user[0].name} has left. That was a stupid move :P.`));
        }
    });
});







