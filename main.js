
//
//
//
// Menu functions 
//
//
//
//

var Menu = function() {
  var body = document.getElementsByTagName("body")[0],
    hamburger = document.getElementsByClassName("hamburger")[0],
    nav = document.getElementById("site-nav"),
    masthead = document.getElementById("masthead");

  //console.log(masthead);

  body.className += "js";

  hamburger.addEventListener("click", function(){
    hamburger.classList.toggle("is-active");
    nav.classList.toggle("is-active");
    masthead.classList.toggle("is-active");
  });
};


//
//
//
// Random Color Generator
//
//
//

function getRandomColor() {
  var letters = '9ABC'.split('');
  var color = '#';        
  color += letters[Math.round(Math.random() * 5)];
  letters = '0123456789ABCDEF'.split('');
  for (var i = 0; i < 5; i++) {
      color += letters[Math.round(Math.random() * 15)];
  }
  return color;
}

//
//
//
// Slider Controller
//
//
//

var Slider = function() {


 var prev = document.getElementById("prev"),
     next = document.getElementById("next"),
     dots = document.getElementsByClassName('indicator-img'),
     indicatorElement = document.getElementsByClassName("indicator-element"),
     slides = document.getElementsByClassName("slider-element"),
     slidercontainer = document.getElementById("slideshow-container");
     sliderimg = document.getElementsByClassName("slider-image");
     sliderinfo = document.getElementsByClassName("slider-inside-info");

 console.log(sliderimg);

 var slideIndex=1;
 showSlides(slideIndex);
 
 //
 //
 //
 // Next/previous controls
 //
 //
 //

 function plusSlides(n) {
   showSlides(slideIndex += n);
  }

 //
 //
 //
 // Thumbnail image controls
 //
 //
 //
 
 
 function currentSlide(n) {
   showSlides(slideIndex = n);
  }

 //
 //
 //
 // Event Listeners
 //
 //
 //
 
  for (let i = 0; i < slides.length; i++) {
   let dot = dots[i];
   dot.addEventListener('click', function() {
     currentSlide(n=i+1);
   });
  }
 
 next.addEventListener("click", function() {
   plusSlides(1);
  });
 
 prev.addEventListener("click", function() {
   plusSlides(-1);
  });
  
 //
 //
 //
 // Slider Main Function
 //
 //
 //

  function showSlides(n) {
   var i,
       slides = document.getElementsByClassName("slider-element"),
       dots = document.getElementsByClassName("indicator-img");

   if (n > slides.length) {slideIndex = 1} 
   if (n < 1) {slideIndex = slides.length}
   for (i = 0; i < slides.length; i++) {
       slides[i].style.display = "none"; 
   }
   for (i = 0; i < dots.length; i++) {
     dots[i].className = dots[i].className.replace("opacity-off", "");
   }
   for (i=0; i<sliderimg.length; i++){
     sliderimg[i].className = sliderimg[i].className.replace(" animated fadeInRight delay-05s", "");
   }
   for (i=0; i<sliderinfo.length; i++){
    sliderinfo[i].className = sliderinfo[i].className.replace(" animated fadeIn delay-1s", "");
  }
   
   slides[slideIndex-1].style.display = "block";
   dots[slideIndex-1].className += "opacity-off";
   sliderimg[slideIndex-1].className += " animated fadeInRight delay-05s";
   sliderinfo[slideIndex-1].className += " animated fadeIn delay-1s";
   //let randColor = getRandomColor();
   //slidercontainer.style.backgroundColor = randColor;
  
  }
};

//
//
//
// Run function on load
//
//
//

window.onload = function() {
  Menu();
  Slider();
}