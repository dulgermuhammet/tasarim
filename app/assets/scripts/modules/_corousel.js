class Corousel {

    constructor() {
        this.corousel = document.querySelectorAll('.corousel');
        this.init();

    }

    init() {

        var self = this;


        [].forEach.call(this.corousel, function(el) {


            this.corousel = el;
            this.wrapper = el.querySelectorAll('.corousel__container')[0];
            this.slider = el.querySelectorAll('ul')[0];
            this.items = el.querySelectorAll('.corousel__element');
            this.single = this.items[0];
            this.singleWidth = this.single.offsetWidth;
            this.visible = Math.ceil(((this.wrapper.offsetWidth) / this.singleWidth)); // note: doesn't include padding or border
            this.currentPage = 1;
            this.pages = Math.ceil(this.items.length / this.visible);
            this.sduration = 1200;
            this.auto = true;



            this.wrapper.insertAdjacentHTML('afterend', '<a class="corousel__prev">&#10094;</a><a class="corousel__next">&#10095;</a>');
            this.prev = el.querySelectorAll('.corousel__prev')[0];
            this.next = el.querySelectorAll('.corousel__next')[0];

            // 1. Pad so that 'visible' number will always be seen, otherwise create empty items

            if ((this.items.length % this.visible) != 0) {
                var x = this.repeat('<div class="corousel__element blank"></div>', (this.visible - (this.items.length % this.visible)));
                this.slider.insertAdjacentHTML('beforeend', x);
                this.items = el.querySelectorAll('.corousel__element');
            }

            // 2. Top and tail the list with 'visible' number of items, top has the last section, and tail has the first

            (function() {

                let a = [].slice.call(self.items).slice(-self.visible);

                for (var i = 0; i < a.length; i++) {
                    var aa = `<div class="corousel__element">${a[i].innerHTML}</div>`;
                    self.items[0].insertAdjacentHTML('beforebegin', aa);

                }
            })();

            (function() {

                let a = [].slice.call(self.items).slice(0, self.visible).reverse();

                for (var i = 0; i < a.length; i++) {
                    var aa = `<div class="corousel__element">${a[i].innerHTML}</div>`;
                    self.items[self.items.length - 1].insertAdjacentHTML('afterend', aa);
                }
            })();

            this.items = el.querySelectorAll('.corousel__element'); // reselect

            // 3. Set the left position to the first 'real' item
            this.wrapper.scrollLeft += this.singleWidth * this.visible;



            // Event Listeners for Buttons

            self.prev.addEventListener("click", function() {
                self.switch(self.currentPage - 1);
                self.prev.style.pointerEvents = "none";

            });

            self.next.addEventListener("click", function() {
                self.switch(self.currentPage + 1);
                self.next.style.pointerEvents = "none";
            });
        }.bind(this));

    }

    repeat(str, num) {
        return new Array(num + 1).join(str);
    }

    switch (page) {

        var self = this;
        var direction = page < this.currentPage ? -1 : 1,
            n = Math.abs(this.currentPage - page),
            left = this.singleWidth * direction * this.visible * n;

        move(self.sduration);

        function move(dr) {
            if (page == 0) {
                function a() {
                    self.wrapper.scrollLeft = self.singleWidth * self.visible * self.pages;
                    page = self.pages;
                    self.currentPage = page;
                }

                self.scrollTo(self.wrapper, (self.wrapper.scrollLeft + left), dr, a);

            } else if (page > self.pages) {
                function b() {
                    self.wrapper.scrollLeft = self.singleWidth * self.visible;
                    page = 1;
                    self.currentPage = page;
                }
                self.scrollTo(self.wrapper, (self.wrapper.scrollLeft + left), dr, b);

            } else {
                self.scrollTo(self.wrapper, (self.wrapper.scrollLeft + left), dr);
                self.currentPage = page;
            }

        }

        return false;
    }


    scrollTo(element, to, duration, done) {

        var self = this;
        var start = element.scrollLeft,
            change = to - start,
            currentTime = 0,
            increment = 20;

        function animateScroll() {
            currentTime += increment;
            var val = self.easeInOutQuad(currentTime, start, change, duration);
            element.scrollLeft = val;
            if (currentTime < duration) {
                setTimeout(animateScroll, increment);
            } else if (currentTime == duration) {
                if (typeof done == 'function') {
                    done();
                }
                self.prev.style.pointerEvents = "auto";
                self.next.style.pointerEvents = "auto";
            }
        };
        animateScroll();

    }

    //t = ct = current time
    //b = st = start value
    //c = cv =change in value
    //d = duration
    easeInOutQuad(ct, st, cv, d) {
        ct /= d / 2;
        if (ct < 1) return cv / 2 * ct * ct + st;
        ct--;
        return -cv / 2 * (ct * (ct - 2) - 1) + st;
    };


    //console.log(`singlewidth:${singleWidth}`);
    //console.log(`currentpage:${currentPage}`);
    //console.log(`scrollLeft:${wrapper.scrollLeft}`);
    //console.log(`pages:${pages}`);
    //console.log(`visible:${visible}`);
    //console.log(`direction:${direction}`); //1 or -1
    //console.log(`n:${n}`);
    //console.log(`left:${left}`);
    //console.log(`currentpage:${currentPage}`);
    //console.log(`page:${page}`);

}

export default Corousel;
