const socket = io();

socket.on("connect", () => {
    console.log("Connected to server");
});

socket.on("disconnect", () => {
    console.log("Server disconnected");
});

socket.on("newMessage", (message) => {
    const li = $("<li></li>");
    li.text(`${message.from} : ${message.text}`);
    $("#messages").append(li);
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



