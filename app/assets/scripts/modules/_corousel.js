class Corousel {

  constructor() {

    this.prev = document.getElementsByClassName("corousel__prev")[0];
    this.next = document.getElementsByClassName("corousel__next")[0];
    this.corousels = document.getElementsByClassName("corousel__element");
    this.corouselcontainer = document.getElementsByClassName("corousel__container")[0];
    this.corouselIndex = 1;
    this.corouselsNo=4;
    this.init();    
  }

  init () {

    console.log(this.corouselcontainer);

    console.log(this.corousels);

    this.showCorousel(this.corouselIndex);  



    this.next.addEventListener("click", function() {
        this.plusCorousel(1);
      }.bind(this)); 
      this.prev.addEventListener("click", function() {
        this.plusCorousel(-1);
      }.bind(this));
   }

   plusCorousel(n) {
    this.showCorousel(this.coruselIndex+= n);
   }
   
   currentCorousel(n) {
    this.showCorousel(this.coruselIndex = n);
   }   
  
  showCorousel(n) {
    var i;
    var x; 
    if (n > this.corousels.length) {this.corouselIndex = 1}
    if (n < 1) {this.corouselIndex = this.corousels.length}
    for (i = 4; i < this.corousels.length; i++) {
        this.corousels[i].style.display = "none"; 
    }

    this.corousels[this.corouselIndex-1].style.transform = "translate(x)";
    this.corousels[this.corouselIndex-2].style.transform = "translate(x)";
    this.corousels[this.corouselIndex-3].style.transform = "translate(x)";
    this.corousels[this.corouselIndex-4].style.transform = "translate(x)";
  }

}
  
export default Corousel;