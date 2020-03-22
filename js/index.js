const mapbox = new Mapbox();
const authenticationService = new AuthenticationService();
const sidebarService = new SidebarService();
const navigationService = new NavigationService();
const ticketService = new TicketService();
const locationService = new LocationService();
const userService = new UserService();

locationService.fetchLocation().then(location => {
    mapbox.center(location[0], location[1]);

    // const markers = TicketService.generateRandomTickets({ 'lat': parseFloat(ipinfo.loc[1]), 'lng': parseFloat(ipinfo.loc[0]) }, 15000, 20)

    // .map(marker => mapbox.addMarker(marker.lng, marker.lat));
    mapbox.map.on('load', function () {
        ticketService.fetchTickets(locationService.loc).then(tickets => {
            mapbox.addMarker(tickets);
        
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
