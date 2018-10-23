//
//
//
// Slider Controller
//
//
//

import RandomCOLOR from './_common-functions';


class Slider {

constructor() {
   this.prev = document.getElementById("prev");
   this.next = document.getElementById("next");
   this.dots = document.getElementsByClassName('indicator-img');
   this.indicatorElement = document.getElementsByClassName("indicator-element");
   this.slides = document.getElementsByClassName("slider-element");
   this.slidercontainer = document.getElementById("slideshow-container");
   this.sliderimg = document.getElementsByClassName("slider-image");
   this.sliderinfo = document.getElementsByClassName("slider-inside-info");
   this.slideIndex=1;
   this.init();
   
}
  
  init () {

  this.showSlides(this.slideIndex);

  
  //
  //
  //
  // Event Listeners
  //
  //
  //
  
  for (let i = 0; i < this.slides.length; i++) {
  let dot = this.dots[i];
  dot.addEventListener('click', function() {
    this.currentSlide(n=i+1);
  }.bind(this));
  }
  
  this.next.addEventListener("click", function() {
    this.plusSlides(1);
  }.bind(this));
  
  this.prev.addEventListener("click", function() {
    this.plusSlides(-1);
  }.bind(this));

  }
  
   

  //
  //
  //
  // Next/previous controls
  //
  //
  //
   
  plusSlides(n) {
    this.showSlides(this.slideIndex+= n);
  }
    
  //
  //
  //
  // Thumbnail image controls
  //
  //
  //
    
    
  currentSlide(n) {
    this.showSlides(this.slideIndex = n);
  }
   
  
   //
   //
   //
   // Slider Main Function
   //
   //
   //

  showSlides(n) {
    var i;
  
    if (n > this.slides.length) {this.slideIndex = 1}
    if (n < 1) {this.slideIndex = this.slides.length}
    for (i = 0; i < this.slides.length; i++) {
        this.slides[i].style.display = "none"; 
    }
    for (i = 0; i < this.dots.length; i++) {
      this.dots[i].className = this.dots[i].className.replace("opacity-off", "");
    }
    for (i=0; i< this.sliderimg.length; i++){
      this.sliderimg[i].className = this.sliderimg[i].className.replace(" animated fadeInRight delay-05s", "");
    }
    for (i=0; i< this.sliderinfo.length; i++){
      this.sliderinfo[i].className = this.sliderinfo[i].className.replace(" animated fadeIn delay-1s", "");
    }
    
    this.slides[this.slideIndex-1].style.display = "block";
    this.dots[this.slideIndex-1].className += "opacity-off";
    this.sliderimg[this.slideIndex-1].className += " animated fadeInRight delay-05s";
    this.sliderinfo[this.slideIndex-1].className += " animated fadeIn delay-1s";
    //let randColor = randomcolor1;
    //this.slidercontainer.style.backgroundColor = randColor;
    
  }

}

export default Slider;
