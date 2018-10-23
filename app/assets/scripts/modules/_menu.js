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
    this.nav = document.getElementById("site-nav");
    this.masthead = document.getElementById("masthead");
    this.init();
  }

  init() {

    //console.log(this.masthead);

    this.body.className += "js";
    
    this.hamburger.addEventListener("click", function(){
      this.hamburger.classList.toggle("is-active");
      this.nav.classList.toggle("is-active");
      this.masthead.classList.toggle("is-active");

    }.bind(this));

  }


}

export default Menu;
