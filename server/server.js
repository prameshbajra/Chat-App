const path = require("path");
const express = require("express");

const public_path = path.join(__dirname + "/../public");
const app = express();

console.log(public_path);

app.use(express.static(public_path));
app.listen(3000, () => {
    console.log("Server Running on port 3000");
});




