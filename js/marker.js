class Marker {
    constructor(id, location) {
        this.id = id;
        this.location = location;
        //this.marker = mapbox.addMarker(location.lng, location.lat);
        //this.addOnClick();
    }

    static of(item) {
        return new Marker(item.id, item.location);
    }

    static toMarkers(items) {
        return items.map(item => Marker.of(item));
    }

    addOnClick() {
        this.marker
            .getElement()
            .addEventListener("click", e => {
                sidebar.show();
            })
    }

    static generateRandom(center, radius, count) {
        let points = [];
        for (let i = 0; i < count; i++) {
            const location = Marker.generateRandomPoint(center, radius);
            points.push(Marker.of({ id: i, location: location }));

        }
        return points;
    }

    static generateRandomPoint(center, radius) {
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