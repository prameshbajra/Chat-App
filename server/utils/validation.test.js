const expect = require("expect");

const { isRealString } = require("./validation");

describe("isRealString()", () => {
    it("Should reject non string value", () => {
        const response = isRealString(84);
        expect(response).toBe(false);
    });

    it("Should reject spaces", () => {
        const response = isRealString("           ");
        expect(response).toBe(false);
    });

    it("Should allow string value with spaces", () => {
        const response = isRealString("Pramesh is writing text cases ...");
        expect(response).toBe(true);
    });
});