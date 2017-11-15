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

const locationButton = $("#send-location");
locationButton.on("click", () => {
    if (!navigator.geolocation) {
        return alert("You are not in 1990's so please do use a good/new browser!");
    }
    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit("createLocationMessage", {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, (error) => {
        alert(`You know you didn't select the correct option. Dumbass !!<br>${error}`);
    })
});



