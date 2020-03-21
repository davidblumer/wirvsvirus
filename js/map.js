class Mapbox {
    constructor() {
        mapboxgl.accessToken = config.tokens.mapbox;
        let map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/davidblumer/ck80oilro089t1ip59roy183k',
            center: [10.482652, 51.085998],
            zoom: 6
        });
        this.map = map;

        this.map.on('load', () => {
            hideLoadingOverlay();

            // this.map.addSource('points', {
            //     'type': 'geojson',
            //     'data': {
            //         'data': {
            //             'type': 'FeatureCollection',
            //             'features': [
            //                 {
            //                     'type': 'Feature',
            //                     'properties': {},
            //                     'geometry': {
            //                         'type': 'Point',
            //                         'coordinates': [
            //                             -91.395263671875,
            //                             -0.9145729757782163
            //                         ]
            //                     }
            //                 }]
            //         }
            //     }
            // });

            // this.map.addLayer({
            //     'id': 'symbols',
            //     'type': 'symbol',
            //     'source': 'points',
            //     'layout': {
            //         'icon-image': 'rocket-15'
            //     }
            // });

        })
    }

    center(lng, lat) {
        this.map.flyTo({
            center: [lng, lat],
            zoom: 11
        })
    }

    addMarker(lng, lat) {
        lng = lng.toFixed(4);
        lat = lat.toFixed(4);

        return new mapboxgl.Marker()
            .setLngLat([lng, lat])
            .addTo(this.map);
    }
}