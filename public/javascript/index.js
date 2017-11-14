const socket = io();

socket.on("connect", () => {
    console.log("Connected to server");
    socket.emit("createMessage", {
        from: "suzal",
        text: "This is from client",
        date: new Date()
    });
});

socket.on("disconnect", () => {
    console.log("Server disconnected");
});

socket.on("newMessage", (message) => {
    console.log("New message Recieved");
    console.log(message);
});


