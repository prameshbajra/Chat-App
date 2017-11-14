const socket = io();

socket.on("connect", () => {
    console.log("Connected to server");
});

socket.on("disconnect", () => {
    console.log("Server disconnected");
});

socket.on("newEmail", (data) => {
    console.log("New Email Recieved");
    console.log(data);
});