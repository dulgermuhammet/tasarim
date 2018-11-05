class Corousel {

    constructor() {
        this.init();

    }

    init() {


        var wrapper = document.getElementsByClassName("corousel__container")[0],
            slider = wrapper.querySelectorAll('ul')[0],
            items = document.getElementsByClassName("corousel__element"),
            single = items[0],
            singleWidth = single.offsetWidth,
            visible = Math.ceil(((wrapper.offsetWidth) / singleWidth)), // note: doesn't include padding or border
            currentPage = 1,
            prev = "",
            next = "",
            pages = Math.ceil(items.length / visible),
            sduration = 700,
            auto = true;

        wrapper.insertAdjacentHTML('afterend', '<a class="corousel__prev">&#10094;</a><a class="corousel__next">&#10095;</a>');
        prev = document.getElementsByClassName("corousel__prev")[0],
        next = document.getElementsByClassName("corousel__next")[0];
        //console.log(items);

        function repeat(str, num) {
            return new Array(num + 1).join(str);
        }

        // 1. Pad so that 'visible' number will always be seen, otherwise create empty items

        if ((items.length % visible) != 0) {
            var x = repeat('<div class="corousel__element blank"></div>', (visible - (items.length % visible)));
            slider.insertAdjacentHTML('beforeend', x);
            items = slider.querySelectorAll('div.corousel__element');
        }

        // 2. Top and tail the list with 'visible' number of items, top has the last section, and tail has the first

        let z = [].slice.call(items).slice(-visible);

        for (var i = 0; i < z.length; i++) {
            var zz = `<div class="corousel__element">${z[i].innerHTML}</div>`;
            //console.log(z);
            items[0].insertAdjacentHTML('beforebegin', zz);

        }

        let z1 = [].slice.call(items).slice(0, visible).reverse();

        for (var i = 0; i < z1.length; i++) {
            var zz1 = `<div class="corousel__element">${z1[i].innerHTML}</div>`;
            //console.log(zz1);
            items[items.length - 1].insertAdjacentHTML('afterend', zz1);
        }

        items = document.getElementsByClassName("corousel__element"); // reselect

        // 3. Set the left position to the first 'real' item
        wrapper.scrollLeft += singleWidth * visible;

        //console.log(wrapper.scrollLeft);



        function runCorousel(page) {

            var direction = page < currentPage ? -1 : 1,
                n = Math.abs(currentPage - page),
                left = singleWidth * direction * visible * n;

            move(sduration);

            function move(dr) {
                if (page == 0) {
                    function x1() {
                        wrapper.scrollLeft = singleWidth * visible * pages;
                        page = pages;
                        currentPage = page;
                    }

                    scrollTo(wrapper, (wrapper.scrollLeft + left), dr, x1);

                } else if (page > pages) {
                    function x2() {
                        wrapper.scrollLeft = singleWidth * visible;
                        // reset prev to start position
                        page = 1;
                        currentPage = page;
                    }
                    scrollTo(wrapper, (wrapper.scrollLeft + left), dr, x2);

                } else {
                    scrollTo(wrapper, (wrapper.scrollLeft + left), dr);
                    currentPage = page;
                }

            }

            return false;
        }



        function scrollTo(element, to, duration, done) {
            var start = element.scrollLeft,
                change = to - start,
                currentTime = 0,
                increment = 20;

            function animateScroll() {
                currentTime += increment;
                var val = Math.easeInOutQuad(currentTime, start, change, duration);
                element.scrollLeft = val;
                if (currentTime < duration) {
                    setTimeout(animateScroll, increment);
                } else if (currentTime == duration) {
                    if (typeof done == 'function') {
                        done();
                    }
                    prev.style.pointerEvents = "auto";
                    next.style.pointerEvents = "auto";
                }
            };
            animateScroll();
        }

        //t = ct = current time
        //b = st = start value
        //c = cv =change in value
        //d = duration
        Math.easeInOutQuad = function(ct, st, cv, d) {
            ct /= d / 2;
            if (ct < 1) return cv / 2 * ct * ct + st;
            ct--;
            return -cv / 2 * (ct * (ct - 2) - 1) + st;
        };




        // Event Listeners for Buttons

        prev.addEventListener("click", function() {
            runCorousel(currentPage - 1);
            prev.style.pointerEvents = "none";

        });

        next.addEventListener("click", function() {
            runCorousel(currentPage + 1);
            next.style.pointerEvents = "none";
        });



    }


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
