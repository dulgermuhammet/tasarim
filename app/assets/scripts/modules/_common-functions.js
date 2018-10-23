//
//
//
// Random Color Generator
//
//
//
class RandomCOLOR {

  constructor() {
    this.letters = '9ABC'.split('');
    this.color = '#';   
    this.init();
  }

  init() {
     
    this.color += this.letters[Math.round(Math.random() * 5)];
    this.letters = '0123456789ABCDEF'.split('');
    for (var i = 0; i < 5; i++) {
        this.color += this.letters[Math.round(Math.random() * 15)];
    }
    return this.color;

  }

}

export default RandomCOLOR;
