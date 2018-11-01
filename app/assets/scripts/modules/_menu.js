//
//
//
// Menu functions
//
//
//
//


class Menu {

    constructor() {

        this.body = document.getElementsByTagName("body")[0];
        this.hamburger = document.getElementsByClassName("hamburger")[0];
        this.nav = document.getElementsByClassName("navbar_menu-container")[0];
        this.navbar = document.getElementsByClassName("navbar")[0];
        this.init();
    }
    init() {

        //console.log(this.navbar);
        this.body.className += " js";
        this.hamburger.addEventListener("click", function() {
            this.hamburger.classList.toggle("is-active");
            this.nav.classList.toggle("is-active");
            this.navbar.classList.toggle("is-active");
        }.bind(this));

    }

}

export default Menu;
