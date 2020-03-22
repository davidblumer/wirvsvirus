class User {
    id;
    email;
    address;
    paypal;
    tickets;

    constructor(id, email, address, paypal, tickets) {
        this.id = id;
        this.email = email;
        this.address = address;
        this.paypal = paypal;
        this.tickets = tickets;
    }

    static of(user) {
        return new User(user.id, user.email, user.address, user.paypal, user.tickets)
    }

    static toUsers(users) {
        return users.map(user => User.of(user));
    }
}

class UserService {
    constructor() {}

    fetchProfile(id) {
        return http({
            method: 'GET',
            url: `${config.backendUrl}/api/users/${id}`
        }).then(response => User.of(response));
    }

}
