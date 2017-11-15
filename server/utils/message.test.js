const expect = require("expect");
const { generateMsg, generateLocationMsg } = require("./message");

describe("generateMsg", () => {
    it("Should generate correct message object", () => {
        const from = "suzal";
        const text = "some msg";
        const message = generateMsg(from, text);

        expect(message.createdAt).toBeA("number");
        expect(message).toInclude({ from, text });
    })
});

describe("generateLocationMsg", () => {
    it("Should generate correct location object", () => {
        const from = "Pramesh Dai";
        const longitude = 10;
        const latitude = 15;
        const url = "https://www.google.com/maps?q=15,10";
        const message = generateLocationMsg(from, latitude, longitude);

        expect(message.createdAt).toBeA("number");
        expect(message).toInclude({ from, url });
    });
});