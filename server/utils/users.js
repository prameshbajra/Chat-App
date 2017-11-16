class Users {
    constructor() {
        this.users = [];
    }

    addUser(id, name, roomName) {
        const user = { id, name, roomName };
        this.users.push(user);
        return user;
    }

    getUser(id) {
        return this.users.filter((user) => {
            return user.id === id;
        });
    }

    getUserList(room) {
        const users = this.users.filter((user) => {
            return user.room === room;
        });
        const namesArray = users.map((user) => {
            return user.name;
        });
        return namesArray;
    }

    removeUser(id) {
        const user = this.getUser(id);
        if (user) {
            this.users = this.users.filter((user) => {
                return user.id !== id;
            });
        }
        return user;
    }
}

module.exports = { Users }