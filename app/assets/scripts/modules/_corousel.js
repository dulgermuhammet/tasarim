class Corousel {

    constructor(duration) {
        this.duration = duration;
        this.corouselEl = document.querySelectorAll(".corousel");
        this.init();

    }

    init() {

        var self = this;
        [].forEach.call(this.corouselEl, function(el) {

            self.corouselEl = el;
            var container = el.querySelectorAll(".corousel__container")[0],
                slider = el.querySelectorAll("ul")[0],
                elements = el.querySelectorAll(".corousel__element"),
                singleEl = elements[0],
                singleElWidth = singleEl.offsetWidth,
                visibleBlock = Math.ceil(((container.offsetWidth) / singleElWidth)), // note: doesn't include padding or border
                totalPages = Math.ceil(elements.length / visibleBlock),
                currentPage = 1,
                sliderDuration = self.duration || 500;

            container.insertAdjacentHTML('afterend', '<a class="corousel__prev">&#10094;</a><a class="corousel__next">&#10095;</a>');

            var prev = el.querySelectorAll(".corousel__prev")[0],
                next = el.querySelectorAll(".corousel__next")[0];

            // 1. Pad so that 'visibleBlock' number will always be seen, otherwise create empty elements

            if ((elements.length % visibleBlock) != 0) {
                var x = self.repeat('<div class="corousel__element blank"></div>', (visibleBlock - (elements.length % visibleBlock)));
                slider.insertAdjacentHTML('beforeend', x);
                elements = el.querySelectorAll('.corousel__element');
            }

            // 2. Top and tail the list with 'visibleBlock' number of elements, top has the last section, and tail has the first

            (function() {

                let a = [].slice.call(elements).slice(-visibleBlock);

                for (var i = 0; i < a.length; i++) {
                    var aa = `<div class="corousel__element">${a[i].innerHTML}</div>`;
                    elements[0].insertAdjacentHTML('beforebegin', aa);

                }
            })();

            (function() {

                let a = [].slice.call(elements).slice(0, visibleBlock).reverse();

                for (var i = 0; i < a.length; i++) {
                    var aa = `<div class="corousel__element">${a[i].innerHTML}</div>`;
                    elements[elements.length - 1].insertAdjacentHTML('afterend', aa);
                }

            })();

            elements = el.querySelectorAll('.corousel__element'); // reselect

            // 3. Set the left position to the first 'real' item
            container.scrollLeft += singleElWidth * visibleBlock;


            function change(page) {

                var direction = page < currentPage ? -1 : 1,
                    n = Math.abs(currentPage - page),
                    left = singleElWidth * direction * visibleBlock * n;

                move(sliderDuration);

                function move(dr) {

                    if (page == 0) {
                        function a() {
                            container.scrollLeft = singleElWidth * visibleBlock * totalPages;
                            page = totalPages;
                            currentPage = page;
                        }

                        scrollTo(container, (container.scrollLeft + left), dr, a);

                    } else if (page > totalPages) {
                        function b() {
                            container.scrollLeft = singleElWidth * visibleBlock;
                            page = 1;
                            currentPage = page;
                        }
                        scrollTo(container, (container.scrollLeft + left), dr, b);

                    } else {
                        scrollTo(container, (container.scrollLeft + left), dr);
                        currentPage = page;
                    }

                }
            }

            function scrollTo(element, to, duration, done) {

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
                        prev.style.pointerEvents = "auto";
                        next.style.pointerEvents = "auto";
                    }
                };
                animateScroll();

            }


            // Event Listeners for Buttons

            prev.addEventListener("click", function() {
                change(currentPage - 1);
                prev.style.pointerEvents = "none";

            });

            next.addEventListener("click", function() {
                change(currentPage + 1);
                next.style.pointerEvents = "none";
            });


        });

    }

    repeat(str, num) {
        return new Array(num + 1).join(str);
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


    //console.log(`singleElwidth:${singleElWidth}`);
    //console.log(`currentpage:${currentPage}`);
    //console.log(`scrollLeft:${container.scrollLeft}`);
    //console.log(`totalPages:${totalPages}`);
    //console.log(`visibleBlock:${visibleBlock}`);
    //console.log(`direction:${direction}`); //1 or -1
    //console.log(`n:${n}`);
    //console.log(`left:${left}`);
    //console.log(`currentpage:${currentPage}`);
    //console.log(`page:${page}`);

}

export default Corousel;
