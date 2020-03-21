class Listing {
    id;
    title;
    acceptedBy;
    address;
    status;
    comments;

    constructor(id, title, acceptedBy, address, status, comments) {
        this.id = id;
        this.title = title;
        this.acceptedBy = acceptedBy;
        address.longitude = parseFloat(address.longitude).toFixed(4);
        address.latitude = parseFloat(address.latitude).toFixed(4);
        this.address = address;
        this.status = status;
        this.comments = comments;
    }

    static of(item) {
        return new Listing(item.id, item.title, item.acceptedBy, item.address, item.status, item.comments);
    }

    static toListings(items) {
        return items.map(item => Listing.of(item));
    }
}

class ListingService {
    listings = [];
    constructor() {
    }

    fetchListings(location) {
        return http({
            method: 'GET',
            url: `${config.backendUrl}/api/tickets?latitude=${location[1]}&longitude=${location[0]}`
        }).then(response => {
            this.listings = Listing.toListings(response["hydra:member"]);
            return this.listings;
        })
    }

    createListing() {
        const form = document.getElementById("create-listing");
        let formData = new FormData(form);
        formData = formDataToJSON(formData);

        http({
            method: 'POST',
            url: `${config.backendUrl}/api/tickets`,
            body: JSON.stringify(obj)
        }).then(response => {
            navigationService.draw();
        })

    }

    static of(item) {
        return new ListingService(item.id, item.location);
    }

    static toMarkers(items) {
        return items.map(item => ListingService.of(item));
    }

    addOnClick() {
        this.marker
            .getElement()
            .addEventListener("click", e => {
                sidebarService.show();
            })
    }

    static generateRandomListings(center, radius, count) {
        let points = [];
        for (let i = 0; i < count; i++) {
            const location = ListingService.generateRandomListings(center, radius);
            points.push(Listing.of({ id: i, location: location }));

        }
        return points;
    }

    static generateRandomListings(center, radius) {
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