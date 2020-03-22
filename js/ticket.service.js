class Ticket {
    id;
    title;
    acceptedBy;
    description;
    address;
    status;
    comments;
    creator;

    constructor(id, title, acceptedBy, address, status, comments, description, creator = null) {
        this.id = id;
        this.title = title;
        this.acceptedBy = acceptedBy;
        address.longitude = parseFloat(address.longitude).toFixed(4);
        address.latitude = parseFloat(address.latitude).toFixed(4);
        this.address = address;
        this.status = status;
        this.comments = comments;
        this.creator = User.of(creator);
        this.description = description;
    }

    static of(item) {
        return new Ticket(item.id, item.title, item.acceptedBy, item.address, item.status, item.comments, item.description, item.creator);
    }

    static toTickets(items) {
        return items.map(item => Ticket.of(item));
    }
}

class TicketService {
    tickets = [];
    constructor() {}

    fetchTickets(location) {
        return http({
            method: 'GET',
            url: `${config.backendUrl}/api/tickets?latitude=${location[1]}&longitude=${location[0]}`
        }).then(response => {
            this.tickets = Ticket.toTickets(response["hydra:member"]);
            return this.tickets;
        })
    }

    fetchTicket(id) {
        return http({
            method: 'GET',
            url: `${config.backendUrl}/api/tickets/${id}`
        }).then(response => Ticket.of(response));
    }

    createTicket() {
        const form = document.getElementById("create-ticket");
        const formData = formDataToJSON(form);

        locationService.addLocationFromAddress(formData).then(formData => {
            http({
                method: 'POST',
                url: `${config.backendUrl}/api/tickets`,
                body: formData
            }).then(response => {
                let ticket = Ticket.of(response);
                mapbox.center(ticket.address.longitude, ticket.address.latitude);
                sidebarService.showTicket(ticket);
                ticketService.fetchTickets(locationService.loc).then(tickets => {
                    mapbox.addMarker(tickets);
                });
            })    
        });

    }

    acceptTicket(ticket) {
        return http({
            method: 'GET',
            url: `${config.backendUrl}/api/tickets/${ticket.id}/accept`
        }).then(ticket => {
            ticket = Ticket.of(ticket);
            sidebarService.showTicket(ticket);
        });

    }

    closeTicket(ticket) {
        return http({
            method: 'GET',
            url: `${config.backendUrl}/api/tickets/${ticket.id}/close`
        }).then(ticket => {
            ticket = Ticket.of(ticket);
            sidebarService.showTicket(ticket);
        });

    }

    static of(item) {
        return new TicketService(item.id, item.location);
    }

    static toMarkers(items) {
        return items.map(item => TicketService.of(item));
    }

    addOnClick() {
        this.marker
            .getElement()
            .addEventListener("click", e => {
                sidebarService.show();
            })
    }

    static generateRandomTickets(center, radius, count) {
        let points = [];
        for (let i = 0; i < count; i++) {
            const location = TicketService.generateRandomTicket(center, radius);
            points.push(Ticket.of({ id: i, location: location }));

        }
        return points;
    }

    static generateRandomTicket(center, radius) {
        let x0 = center.lng;
        let y0 = center.lat;
        // Convert Radius from meters to degrees.
        let rd = radius / 111300;

        let u = Math.random();
        let v = Math.random();

        let w = rd * Math.sqrt(u);
        let t = 2 * Math.PI * v;
        let x = w * Math.cos(t);
        let y = w * Math.sin(t);

        let xp = x / Math.cos(y0);

        // Resulting point.
        return { 'lat': y + y0, 'lng': xp + x0 };
    }
}