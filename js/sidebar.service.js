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
                    ["required", "true"],
                    ["value", "test@david.dev"]
                ]
            },

            {
                type: "input",
                attributes: [
                    ["type", "password"],
                    ["name", "password"],
                    ["placeholder", "Passwort"],
                    ["required", "true"],
                    ["value", "test"]
                ]
            },
            {
                type: "input",
                attributes: [
                    ["type", "text"],
                    ["name", "firstName"],
                    ["placeholder", "Vorname"],
                    ["required", "true"],
                    ["value", "David"]
                ]
            },
            {
                type: "input",
                attributes: [
                    ["type", "text"],
                    ["name", "lastName"],
                    ["placeholder", "Nachname"],
                    ["required", "true"],
                    ["value", "Blumer"]
                ]
            },
            {
                type: "input",
                attributes: [
                    ["type", "text"],
                    ["name", "address.street"],
                    ["placeholder", "Straße"],
                    ["required", "true"],
                    ["value", "Sonnhalde"]
                ]
            },
            {
                type: "input",
                attributes: [
                    ["type", "text"],
                    ["name", "address.houseNumber"],
                    ["placeholder", "Hausnummer"],
                    ["required", "true"],
                    ["value", "2"]
                ]
            },
            {
                type: "input",
                attributes: [
                    ["type", "text"],
                    ["name", "address.postalCode"],
                    ["placeholder", "Postleitzahl"],
                    ["required", "true"],
                    ["value", "88709"]
                ]
            },
            {
                type: "input",
                attributes: [
                    ["type", "text"],
                    ["name", "address.city"],
                    ["placeholder", "Stadt"],
                    ["required", "true"],
                    ["value", "Meersburg"]
                ]
            },
            {
                type: "input",
                attributes: [
                    ["type", "text"],
                    ["name", "paypal"],
                    ["placeholder", "PayPal-Link"],
                    ["required", "true"],
                    ["value", "test"]
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
                    ["required", "true"],
                    ["value", "api1.wirvsvirus@spomsoree.dev"]
                ]
            },
            {
                type: "input",
                attributes: [
                    ["type", "password"],
                    ["name", "password"],
                    ["placeholder", "Passwort"],
                    ["required", "true"],
                    ["value", "test"]
                ]
            },
            {
                type: "button",
                attributes: [
                    //["type", "button"]
                ],
                classList: ["button", "button-accent"],
                innerHTML: "Login",
                eventListener: (e) => { e.preventDefault(); return authenticationService.login() }
            }
        ];

        const form = SidebarService.formBuilder("login", elements);
        this.append(form);
    }

    showTicket(ticket) {
        const elements = [
            {
                type: "h1",
                innerHTML: `${ticket.title}`
            },
            {
                type: "span",
                innerHTML: `${ticket.status}`,
                classList: ["status"]
            },
            {
                type: "span",
                innerHTML: `${ticket.creator.firstName}`,
                classList: ["creator"]
            },
            {
                type: "button",
                attributes: [
                    ["type", "button"]
                ],
                classList: ["button", "button-accent"],
                innerHTML: "Annehmen",
                //eventListener: 
            }
        ];

        const form = SidebarService.formBuilder("ticket", elements);
        this.append(form);

    }

    showProfile(user) {
        const elements = [
            {
                type: "h1",
                innerHTML: `${user.email}`
            }, 
            user.tickets.map(ticket => {
                return {
                    type: "div",
                    innerHTML: `${ticket}`
                }
            })
        ];

        const form = SidebarService.formBuilder("profile", elements);
        this.append(form);
    }

    showCreateTicket(ticket) {
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
                    ["name", "address.postalCode"],
                    ["placeholder", "Postleitzahl"],
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
                type: "button",
                attributes: [
                    ["type", "button"]
                ],
                classList: ["button", "button-accent"],
                innerHTML: "Erstellen",
                eventListener: ticketService.createTicket

            }
        ];

        const form = SidebarService.formBuilder("create-ticket", elements);
        this.append(form);

    }

    showLoading() {
        const elements = [
            {
                type: "div",
                classList: ["loading", "sidebar"]
            }
        ];

        const form = SidebarService.formBuilder("form-loading", elements);
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

