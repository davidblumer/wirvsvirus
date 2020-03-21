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

    login(email, password) {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        http({
            method: 'POST',
            url: `${config.backendUrl}/api/login`,
            formData: formData
        }).then(response => {
            authenticationService.token = response;
            navigationService.draw();
            sidebarService.hide();    
        })

    }

    registration() {
        const form = document.getElementById("registration");
        let formData = new FormData(form);
        formData = formDataToJSON(formData);

        http({
            method: 'POST',
            url: `${config.backendUrl}/api/users`,
            body: JSON.stringify(obj)
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