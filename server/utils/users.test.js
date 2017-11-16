const expect = require("expect");

const { Users } = require("./users");

describe("Users", () => {
    let users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: "1",
            name: "Pramesh",
            roomName: "Bajracharya"
        },
        {
            id: "2",
            name: "Suzal",
            roomName: "Bajracharya"
        },
        {
            id: "1",
            name: "Apple",
            roomName: "Maicha"
        }];
    });

    it("Should add a new user", () => {
        const users = new Users();
        const user = {
            id: 1,
            name: "Pramesh",
            roomName: "Bajracharya"
        };
        const responseUser = users.addUser(user.id, user.name, user.roomName);
        expect(users.users).toEqual([user]);
    });

    it("Should return names for roomName", () => {
        const userList = users.getUserList("Bajracharya");
        expect(userList).toEqual(["Pramesh", "Suzal"]);
    });
});