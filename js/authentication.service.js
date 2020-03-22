class AuthenticationService {
    _token = null;

    constructor() {
        this._token = localStorage.getItem('token');
    }

    set token(token) {
        this._token = token;
        localStorage.setItem('token', token);
    }

    get token() {
        return this._token;
    }

    login() {
        const form = document.getElementById("login");
        const formData = formDataToJSON(form);

        http({
            method: 'POST',
            url: `${config.backendUrl}/api/login`,
            body: formData
        }).then(response => {
            authenticationService.token = response.token;
            navigationService.draw();
            sidebarService.hide();
        })

    }

    registration() {
        const form = document.getElementById("registration");
        let formData = formDataToJSON(form);

        http({
            method: 'POST',
            url: `${config.backendUrl}/api/users`,
            body: formData
        }).then(response => {
            this.token = response.token;
            navigationService.draw();
        })
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