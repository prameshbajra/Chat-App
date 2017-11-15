const expect = require("expect");
const { generateMsg } = require("./message");

describe("generateMsg", () => {
    it("Should generate correct message object", () => {
        const from = "suzal";
        const text = "some msg";
        const message = generateMsg(from, text);

        expect(message.createdAt).toBeA("number");
        expect(message).toInclude({ from, text });
    })
});