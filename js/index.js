let ipinfo;
const mapbox = new Mapbox();
const authentication = new Authentication();
const sidebar = new Sidebar();
const navigation = new Navigation();


function getLocation() {
    return http({method: 'GET', url:'https://ipinfo.io/json?token=' + config.tokens.ipinfo});
}



getLocation().then(response => {
    response.loc = response.loc.split(",").reverse();
    ipinfo = response;
    mapbox.center(ipinfo.loc[0], ipinfo.loc[1]);

    const markers = Marker.generateRandom({ 'lat': parseFloat(ipinfo.loc[1]), 'lng': parseFloat(ipinfo.loc[0]) }, 15000, 20)
    // .map(marker => mapbox.addMarker(marker.lng, marker.lat));

    mapbox.map.on('load', function () {
        mapbox.map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });

        mapbox.map.addSource('points', {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': markers.map(marker => {
                    return {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [marker.location.lng, marker.location.lat]
                        }
                    }
                })
            }
        });
        mapbox.map.addLayer({
            'id': 'points',
            'type': 'symbol',
            'source': 'points',
            'layout': {
                'icon-image': 'pulsing-dot'
            }
        });
    });


}, rejected => {
    showAdBlockModal();
});

function showAdBlockModal() {
    document.getElementsByClassName('modal-container')[0].style.display = 'flex';
    document.getElementById('ab-warning').style.display = 'block';
}

function hideLoadingOverlay() {
    document.getElementById('loading').style.display = 'none';
}

let size = 350;


let pulsingDot = {
    width: size,
    height: size,
    data: new Uint8Array(size * size * 4),

    // get rendering context for the map canvas when layer is added to the map
    onAdd: function () {
        let canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        this.context = canvas.getContext('2d');
    },

    // called once before every frame where the icon will be used
    render: function () {
        let duration = 1500;
        let t = (performance.now() % duration) / duration;

        let radius = (size / 2) * 0.3;
        let outerRadius = (size / 2) * 0.3 * t + radius;
        let context = this.context;

        // // draw outer circle
        // context.clearRect(0, 0, this.width, this.height);
        // context.beginPath();
        // context.arc(
        //     this.width / 2,
        //     this.height / 2,
        //     outerRadius,
        //     0,
        //     Math.PI * 2
        // );
        // context.fillStyle = 'rgba(255, 200, 200,' + (1 - t) + ')';
        // context.fill();

        // draw inner circle
        context.beginPath();
        context.arc(
            this.width / 2,
            this.height / 2,
            radius,
            0,
            Math.PI * 2
        );

        context.fillStyle = 'rgba(34,31,96, .8)';
        context.strokeStyle = 'white';
        context.lineWidth = 4 * (1 - t);
        context.fill();
        context.stroke();

        // update this image's data with data from the canvas
        this.data = context.getImageData(
            0,
            0,
            this.width,
            this.height
        ).data;

        // continuously repaint the map, resulting in the smooth animation of the dot
        //mapbox.map.triggerRepaint();

        // return `true` to let the map know that the image was updated
        return true;
    }
}