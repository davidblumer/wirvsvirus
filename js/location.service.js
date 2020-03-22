class LocationService {
    ip;
    hostname;
    city;
    region;
    country;
    loc;
    org;
    postal;
    timezone;

    constructor() {

    }

    fetchLocation() {
        return http({ method: 'GET', url: 'https://ipinfo.io/json?token=' + config.tokens.ipinfo }).then(response => {
            this.ip = response.ip;
            this.hostname = response.hostname;
            this.city = response.city;
            this.region = response.region;
            this.country = response.country;
            this.loc = this.parseLocation(response.loc);
            this.org = response.org;
            this.postal = response.postal;
            this.timezone = response.timezone;

            return this.loc;
        });
    }

    getLocationFromAdress(formData) {
        formData = JSON.parse(formData)

        formData.address = {
            street: formData['address.street'],
            houseNumber: formData['address.houseNumber'],
            postalCode: formData['address.postalCode'],
            city: formData['address.city'],
        };
        delete formData['address.street'];
        delete formData['address.houseNumber'];
        delete formData['address.postalCode'];
        delete formData['address.city'];

        return http({ noAuth: true, method: 'GET', url: `https://api.opencagedata.com/geocode/v1/json?q=${this.prepareAddress(formData)}&key=${config.tokens.opencagedata}` }).then(response => {
            formData.address.latitude = response.results[0].geometry.lat.toString();
            formData.address.longitude = response.results[0].geometry.lng.toString();

            return JSON.stringify(formData);
        });
    }

    prepareAddress(formData) {
        return [formData.address.street, formData.address.houseNumber, formData.address.postalCode, formData.address.city].join(" ");
    }

    parseLocation(location) {
        return location.split(",").reverse();
    }
}