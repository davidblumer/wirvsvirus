class Authentication {
    constructor() {
        this.backendUrl = 'http://wirvsvirus.eu-central-1.elasticbeanstalk.com'
        this.token;

        // this.registrationSubmit = document.getElementById('registration-submit');
        // this.registrationSubmit.addEventListener('click', this.registration)
    }

    login(username, password) {
    }

    registration() {
        const form = document.getElementById("registration");
        const formData = new FormData(form);

          
        http({
            method: 'POST',
            url: 'http://wirvsvirus.eu-central-1.elasticbeanstalk.com/api/users'
        })
    }
}