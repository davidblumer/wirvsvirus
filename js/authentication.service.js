class AuthenticationService {
    _token = null;
    _id = null;

    constructor() {
        this._token = localStorage.getItem('token');
        this._id = localStorage.getItem('id');
    }

    set id(id) {
        this._id = id;
        localStorage.setItem('id', id);
    }

    get id() {
        return this._id;
    }

    set token(token) {
        this._token = token;
        localStorage.setItem('token', token);
    }

    get token() {
        return this._token;
    }

    login(email = null, password = null) {

        let formData;
        if(!email && !password) {
            const form = document.getElementById("login");
            formData = formDataToJSON(form);
        } else {
            formData = {
                email: email,
                password: password
            }
            formData = JSON.stringify(formData)
        }

        http({
            method: 'POST',
            url: `${config.backendUrl}/api/login`,
            body: formData
        }).then(response => {
            authenticationService.token = response.token;
            authenticationService.id = response.id;
            navigationService.draw();
            sidebarService.hide();

            ticketService.fetchTickets(locationService.loc).then(tickets => {
                mapbox.addMarker(tickets);
            });
        })

    }

    registration() {
        const form = document.getElementById("registration");
        let formData = formDataToJSON(form);
        locationService.addLocationFromAddress(formData).then(formData => {
            http({
                method: 'POST',
                url: `${config.backendUrl}/api/users`,
                body: formData
            }).then(response => {
                // this.token = response.token;
                let x = JSON.parse(formData);
                authenticationService.login(x.email, x.password);
                //navigationService.draw();
            }).catch(error => {
                console.log(error);
            })
        });


    }

    logout() {
        this.token = null;
        localStorage.removeItem('token');
        navigationService.draw();
    }

    isAuthenticated() {
        return this.token;
    }
}