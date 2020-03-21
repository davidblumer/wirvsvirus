class Navigation {
    constructor() {
        this.visible = false;
        this.navigation = document.getElementById("navigation-content");
        console.log(this.navigation)
        this.hamburger = document.getElementById("hamburger");
        this.hamburger.addEventListener("click", this.toggle);
    }

    toggle() {
        this.visible = !this.visible;

        if(this.visible) {
            document.getElementById("navigation-content").style.display = 'flex';
        } else {
            document.getElementById("navigation-content").style.display = 'none';
        }
    }
}