class Navigation {
    constructor() {
        this.visible = false;
        this.navigation = document.getElementById("navigation-content");
        this.hamburger = document.getElementById("hamburger");
        this.hamburger.addEventListener("click", this.toggle);

        this.elements = {
            listing: {
                title: "Neues Gesuch",
                id: "new-listing",
                protected: true
            },
            profile: {
                title: "Profil",
                id: "show-profile",
                protected: true
            },
            listings: {
                title: "Meine Gesuche",
                id: "show-listings",
                protected: true
            },
            registration: {
                title: "Registrierung",
                id: "show-registration",
                protected: false
            },
            login: {
                title: "Login",
                id: "show-login",
                protected: false
            }
        };

        Object.keys(this.elements).map(key => {
            if (this[key]) {
                document.getElementById(this.elements[key].id).addEventListener('click', () => {
                    this.hideOnClick();
                    return this[key]();
                })
            }
        });
    }

    show() {
        this.visible = true;
        this.navigation.style.display = 'flex';
    }
    hide() {
        this.visible = false;
        this.navigation.style.display = 'none';
    }

    toggle() {
        this.visible = !this.visible;
        this.navigation = document.getElementById("navigation-content");

        if (this.visible) {
            this.navigation.style.display = 'flex';
        } else {
            this.navigation.display = 'none';
        }
    }

    hideOnClick() {
        if (window.innerWidth < 1000) {
            this.hide();
        }
    }

    profile() {
        console.log("asdf")
    }

    listings() {
        console.log("asdf")
    }

    registration() {
        sidebar.showRegistration();
    }

    login() {
        sidebar.showLogin();
    }
}