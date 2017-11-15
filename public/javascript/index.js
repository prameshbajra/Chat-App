const socket = io();
socket.on("connect", () => {
    console.log("Connected to server");
});
socket.on("disconnect", () => {
    console.log("Server disconnected");
});

socket.on("newMessage", (message) => {
    const timeFormat = moment(message.createdAt).format("h:mm a");
    const li = $("<li></li>");
    li.text(`${message.from} ${timeFormat}: ${message.text}`);
    $("#messages").append(li);
});

socket.on("newLocationMessage", (message) => {
    const timeFormat = moment(message.createdAt).format("h:mm a");
    const li = $("<li></li>");
    const a = $("<a target = '_black'>My current Location</a>");
    li.text(`${message.from} ${timeFormat}: `);
    a.attr("href", message.url);
    li.append(a);
    $("#messages").append(li);
});

$("#message-form").on("submit", (e) => {
    e.preventDefault();
    const messageBox = $("#message");
    socket.emit("createMessage", {
        from: "Maicha",
        text: messageBox.val()
    }, (dataError) => {
        messageBox.val("");
    });
});

const locationButton = $("#send-location");
locationButton.on("click", () => {
    if (!navigator.geolocation) {
        return alert("You are not in 1990's so please do use a good/new browser!");
    }
    locationButton.attr("disabled", "disabled").text("Sending Location ...");
    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit("createLocationMessage", {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
        locationButton.removeAttr("disabled").text("Send Location");
    }, (error) => {
        locationButton.removeAttr("disabled").text("Send Location");;
        alert(`You know you didn't select the correct option. Dumbass !!<br>${error}`);
    })
});



