const socket = io();

socket.on("connect", () => {
    console.log("Connected to server");
});

socket.on("disconnect", () => {
    console.log("Server disconnected");
});

socket.on("newMessage", (message) => {
    console.log("New message Recieved");
    console.log(message);
});

socket.emit("createMessage", {
    from: "Pramesh Bazra",
    text: "Trying call backs"
}, (errorData) => {
    console.log(`${errorData}`);
});

$("#message-form").on("submit", (e) => {
    e.preventDefault();
    socket.emit("createMessage", {
        from: "HackersINC",
        text: $("#message").val()
    }, (dataError) => {
        console.log(`There is a ${dataError} bitch`);
    });
});



