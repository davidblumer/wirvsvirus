class User {
    id;
    email;
    address;
    paypal;
    tickets;
    acceptedTickets;
    comments;

    constructor(id, email, address, paypal, tickets = [], acceptedTickets, comments) {
        this.id = id;
        this.email = email;
        this.address = address;
        this.paypal = paypal;
        this.tickets = tickets;
        this.acceptedTickets = acceptedTickets;
        this.comments = comments;
    }

    static of(user) {
        try {
            return new User(user['@id'], user.email, user.address, user.paypal, user.tickets, user.acceptedTickets, user.comments);
        } catch(err) {
            return User.ofNull();
        }
    }

    static ofNull() {
        return new User("null", "null", "null", "null", "null", "null", "null");
    }

    static toUsers(users) {
        return users.map(user => User.of(user));
    }
}

class UserService {
    constructor() { }

    fetchProfile(id) {
        return http({
            method: 'GET',
            url: `${config.backendUrl}/${id}`
        }).then(response => User.of(response));
    }

    fetchTickets() {
        return http({
            method: 'GET',
            url: `${config.backendUrl}/api/users/${authenticationService.id}/tickets`
        }).then(response => {
            return Ticket.toTickets(response['hydra:member'])
        });
    }
}
