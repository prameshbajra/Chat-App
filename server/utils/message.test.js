const expect = require("expect");
const assert = require("chai").assert;
const { generateMsg, generateLocationMsg } = require("./message");

describe("generateMsg", () => {
    it("Should generate correct message object", () => {
        const from = "suzal";
        const text = "some msg";
        const message = generateMsg(from, text);

        assert.typeOf(message.createdAt, "number");
    })
});

describe("generateLocationMsg", () => {
    it("Should generate correct location object", () => {
        const from = "Pramesh Dai";
        const longitude = 10;
        const latitude = 15;
        const url = "https://www.google.com/maps?q=15,10";
        const message = generateLocationMsg(from, latitude, longitude);

        assert.typeOf(message.createdAt, "number");
    });
});