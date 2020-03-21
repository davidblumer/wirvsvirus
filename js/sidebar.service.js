class SidebarService {
    constructor() {
        this.visible = false;
        this.id = 'sidebar';
        this.contentId = 'sidebar-content';
        this.element = document.getElementById(this.id);
        this.content = document.getElementById(this.contentId);

        this.hide();
        this.addCloseButton();

    }

    show() {
        this.visible = true;
        document.getElementById('sidebar').style.display = 'flex';
    }

    hide() {
        this.visible = false;

        document.getElementById('sidebar').style.display = 'none';
    }

    toggle() {
        this.visible = !this.visible;
        if (this.visible) {
            this.hide();
        } else {
            this.show();
        }
    }

    addCloseButton() {
        document.getElementById('close-sidebar').addEventListener("click", this.hide);
    }

    clear() {
        this.content.innerHTML = '';
    }

    append(element) {
        this.clear();
        this.content.append(element);
        this.show();
    }


    showRegistration() {
        const elements = [
            {
                type: "h1",
                innerHTML: "Registrierung"
            },
            {
                type: "input",
                attributes: [
                    ["type", "email"],
                    ["name", "email"],
                    ["placeholder", "E-Mail-Adresse"],
                    ["required", "true"]
                ]
            },

            {
                type: "input",
                attributes: [
                    ["type", "password"],
                    ["name", "password"],
                    ["placeholder", "Passwort"],
                    ["required", "true"]
                ]
            },
            {
                type: "input",
                attributes: [
                    ["type", "text"],
                    ["name", "address.street"],
                    ["placeholder", "Straße"],
                    ["required", "true"]
                ]
            },
            {
                type: "input",
                attributes: [
                    ["type", "text"],
                    ["name", "address.houseNumber"],
                    ["placeholder", "Hausnummer"],
                    ["required", "true"]
                ]
            },
            {
                type: "input",
                attributes: [
                    ["type", "text"],
                    ["name", "address.city"],
                    ["placeholder", "Stadt"],
                    ["required", "true"]
                ]
            },
            {
                type: "input",
                attributes: [
                    ["type", "text"],
                    ["name", "address.postalCode"],
                    ["placeholder", "Postleitzahl"],
                    ["required", "true"]
                ]
            },
            {
                type: "input",
                attributes: [
                    ["type", "text"],
                    ["name", "paypal"],
                    ["placeholder", "PayPal-Link"],
                    ["required", "true"]
                ]
            },
            {
                type: "button",
                attributes: [
                    ["type", "button"]
                ],
                classList: ["button", "button-accent"],
                innerHTML: "Registrieren",
                eventListener: authenticationService.registration
            }
        ];

        const form = SidebarService.formBuilder("registration", elements);
        this.append(form);
    }

    showLogin() {
        const elements = [
            {
                type: "h1",
                innerHTML: "Login"
            },
            {
                type: "input",
                attributes: [
                    ["type", "email"],
                    ["name", "email"],
                    ["placeholder", "E-Mail-Adresse"],
                    ["required", "true"]
                ]
            },
            {
                type: "input",
                attributes: [
                    ["type", "password"],
                    ["name", "password"],
                    ["placeholder", "Passwort"],
                    ["required", "true"]
                ]
            }, 
            {
                type: "button",
                attributes: [
                    ["type", "button"]
                ],
                classList: ["button", "button-accent"],
                innerHTML: "Login",
                eventListener: () => {authenticationService.login("api.wirvsvirus@spomsoree.dev", "test")}
            }
        ];

        const form = SidebarService.formBuilder("login", elements);
        this.append(form);
    }

    showCreateListing(listing) {
        const elements = [
            {
                type: "h1",
                innerHTML: "Gesuch erstellen"
            },
            {
                type: "input",
                attributes: [
                    ["type", "text"],
                    ["name", "title"],
                    ["placeholder", "Titel"],
                    ["required", "true"]
                ]
            },
            {
                type: "input",
                attributes: [
                    ["type", "text"],
                    ["name", "address.street"],
                    ["placeholder", "Straße"],
                    ["required", "true"]
                ]
            },
            {
                type: "input",
                attributes: [
                    ["type", "text"],
                    ["name", "address.houseNumber"],
                    ["placeholder", "Hausnummer"],
                    ["required", "true"]
                ]
            },
            {
                type: "input",
                attributes: [
                    ["type", "text"],
                    ["name", "address.city"],
                    ["placeholder", "Stadt"],
                    ["required", "true"]
                ]
            },
            {
                type: "input",
                attributes: [
                    ["type", "text"],
                    ["name", "address.postalCode"],
                    ["placeholder", "Postleitzahl"],
                    ["required", "true"]
                ]
            },
                        {
                type: "button",
                attributes: [
                    ["type", "button"]
                ],
                classList: ["button", "button-accent"],
                innerHTML: "Erstellen",
                eventListener: listingService.createListing
            }
        ];

        const form = SidebarService.formBuilder("create-listing", elements);
        this.append(form);

    }

    static formBuilder(id, elements) {
        const form = document.createElement("form");
        form.setAttribute('id', id)

        elements.map(element => {
            const el = document.createElement(element.type);

            if (element.attributes && element.attributes.length) {
                element.attributes.map(attribute => {
                    el.setAttribute(attribute[0], attribute[1]);
                })
            }

            if (element.innerHTML) {
                el.innerHTML = element.innerHTML;
            }

            if (element.classList) {
                element.classList.map(cl => {
                    el.classList.add(cl);
                })
            }

            if (element.eventListener) {
                el.addEventListener("click", element.eventListener);
            }

            return form.appendChild(el);
        })

        return form;
    }
}

