//
//
//
// Slider Controller
//
//
//



class Slider {
  constructor() {
     this.prev = document.getElementsByClassName("slider__prev")[0];
     this.next = document.getElementsByClassName("slider__next")[0];
     this.dots = document.getElementsByClassName("indicator__img");
     this.indicatorElement = document.getElementsByClassName("indicator__element");
     this.slides = document.getElementsByClassName("slider__element");
     this.slidercontainer = document.getElementsByClassName("slider__container")[0];
     this.sliderimg = document.getElementsByClassName("slider__image");
     this.sliderinfo = document.getElementsByClassName("slider__text-container");
     this.slideIndex = 1;
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
    this.currentSlide(i+1);
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
  }
}

export default Slider;
