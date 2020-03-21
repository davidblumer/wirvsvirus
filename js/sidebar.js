class Sidebar {
    constructor() {
        this.visible = false;
        this.id = 'sidebar';

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
        if(this.visible) {
            this.hide();
        } else {
            this.show();
        }
    }

    addCloseButton() {
        document.getElementById('close-sidebar').addEventListener("click", this.hide);
    }
}