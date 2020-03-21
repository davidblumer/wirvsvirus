let ipinfo;
const mapbox = new Mapbox();

function getLocation() {
    let request = new XMLHttpRequest();
    request.open('GET', 'https://ipinfo.io/json?token=' + config.tokens.ipinfo, true);

    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            ipinfo = JSON.parse(this.response);
            ipinfo.loc = ipinfo.loc.split(",").reverse();
            mapbox.center(ipinfo.loc[0], ipinfo.loc[1]);

            Marker.generateRandom({ 'lat': parseFloat(ipinfo.loc[1]), 'lng': parseFloat(ipinfo.loc[0]) }, 15000, 20)
                .map(marker => mapbox.addMarker(marker.lng, marker.lat));
        } else {
        }
    };

    request.onerror = function () {
        showAdBlockModal();
    };

    request.send();
}



getLocation();

function showAdBlockModal() {
    document.getElementsByClassName('modal-container')[0].style.display = 'flex';
    document.getElementById('ab-warning').style.display = 'block';
}

function hideLoadingOverlay() {
    document.getElementById('loading').style.display = 'none';
}
