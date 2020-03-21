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

    parseLocation(location) {
        return location.split(",").reverse();
    }
}