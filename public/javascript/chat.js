const socket = io();

const scrollToButton = () => {
    // for selectors ...
    const messages = $("#messages");
    const newMessage = messages.children("li:last-child");
    //for heights ...
    const clientHeight = messages.prop("clientHeight");
    const scrollTop = messages.prop("scrollTop");
    const scrollHeight = messages.prop("scrollHeight");
    const newMessageHeight = newMessage.innerHeight();
    const lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on("connect", () => {
    console.log("Connected to server");
});

socket.on("disconnect", () => {
    console.log("Server disconnected");
});

socket.on("newMessage", (message) => {
    const timeFormat = moment(message.createdAt).format("h:mm a");
    const template = $("#message-template").html();
    const html = Mustache.render(template, {
        from: message.from,
        text: message.text,
        createdAt: timeFormat
    });
    $("#messages").append(html);
    scrollToButton();
});

socket.on("newLocationMessage", (message) => {
    const timeFormat = moment(message.createdAt).format("h:mm a");
    const template = $("#location-message-template").html();
    const html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: timeFormat
    });
    $("#messages").append(html);
    scrollToButton();
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



