class NavigationService {
    constructor() {
        this.visible = false;
        this.navigation = document.getElementById("navigation-content");
        this.hamburger = document.getElementById("hamburger");
        this.hamburger.addEventListener("click", this.toggle);

        this.elements = {
            ticket: {
                title: "Neues Gesuch",
                id: "new-ticket",
                protected: true,
                highlighted: true
            },
            profile: {
                title: "Profil",
                id: "show-profile",
                protected: true
            },
            tickets: {
                title: "Meine Gesuche",
                id: "show-tickets",
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
            },
            logout: {
                title: "Logout",
                id: "logout",
                protected: true
            }
        };

        this.draw();
    }

    draw() {
        this.clear();

        Object.keys(this.elements).map(key => {
            if(authenticationService.isAuthenticated() && this.elements[key].protected
            || !authenticationService.isAuthenticated() && !this.elements[key].protected) {
                const navEl = document.createElement("li");
                navEl.innerHTML = this.elements[key].title;
                navEl.setAttribute("id", this.elements[key].id);

                if(this.elements[key].highlighted) {
                    navEl.classList.add("highlight")
                }
                this.navigation.append(navEl);    
                
                if (this[key]) {
                    document.getElementById(this.elements[key].id).addEventListener('click', () => {
                        this.hideOnClick();
                        return this[key]();
                    })
                }    
            }

        });
    }

    clear() {
        this.navigation.innerHTML = "";
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
        userService.fetchProfile('api/users/362d931c-6bcb-11ea-94a1-067f51126ab8').then(user => {
            sidebarService.showProfile(user);
        });
    }

    ticket() {
        sidebarService.showCreateTicket();
    }

    tickets() {
    }

    registration() {
        sidebarService.showRegistration();
    }

    login() {
        sidebarService.showLogin();
    }

    logout() {
        authenticationService.logout();
    }
}