class Corousel {

    constructor() {
        this.init();

    }

    init() {


        var wrapper = document.getElementsByClassName("wrapper")[0],
            slider = wrapper.querySelectorAll('ul')[0],
            items = slider.querySelectorAll('li'),
            single = items[0],
            singleWidth = single.offsetWidth,
            visible = Math.ceil(((wrapper.offsetWidth) / singleWidth)), // note: doesn't include padding or border
            currentPage = 1,
            pages = Math.ceil(items.length / visible);


        wrapper.insertAdjacentHTML('afterend', '<a class="arrow back">&lt;</a><a class="arrow forward">&gt;</a>');

        function repeat(str, num) {
            return new Array(num + 1).join(str);
        }

        // 1. Pad so that 'visible' number will always be seen, otherwise create empty items

        if ((items.length % visible) != 0) {
            var x = repeat('<li class="blank"></li>', (visible - (items.length % visible)));
            slider.insertAdjacentHTML('beforeend', x);
            items = slider.querySelectorAll('li');
        }

        // 2. Top and tail the list with 'visible' number of items, top has the last section, and tail has the first

        let z = [].slice.call(items).slice(-visible);

        for (var i = 0; i < z.length; i++) {
            var zz = `<li>${z[i].innerHTML}</li>`;
            console.log(z);
            items[0].insertAdjacentHTML('beforebegin', zz);

        }

        let z1 = [].slice.call(items).slice(0, visible).reverse();

        for (var i = 0; i < z1.length; i++) {
            var zz1 = `<li>${z1[i].innerHTML}</li>`;
            //console.log(zz1);
            items[items.length - 1].insertAdjacentHTML('afterend', zz1);
        }

        items = slider.querySelectorAll('li'); // reselect

        // 3. Set the left position to the first 'real' item
        wrapper.scrollLeft += singleWidth * visible;

        //console.log(wrapper.scrollLeft);



        //function gotoPage(page) {
        //    var dir = page < currentPage ? -1 : 1,
        //        n = Math.abs(currentPage - page),
        //        left = singleWidth * dir * visible * n;
        //
        //    wrapper.animate({
        //        scrollLeft: += left;
        //    }, 500, function() {
        //        if (page == 0) {
        //            wrapper.scrollLeft += singleWidth * visible * pages;
        //            page = pages;
        //        } else if (page > pages) {
        //            wrapper.scrollLeft += singleWidth * visible;
        //            // reset back to start position
        //            page = 1;
        //        }
        //
        //        currentPage = page;
        //    });
        //
        //    return false;
        //}



        // 5. Bind to the forward and back buttons

        var back = document.querySelectorAll('a.back')[0];
        //console.log(back);
        back.addEventListener("click", function() {
            gotoPage(currentPage - 1);
        });

        var forward = document.querySelectorAll('a.forward')[0];
        //console.log(forward);
        forward.addEventListener("click", function() {
            gotoPage(currentPage + 1);
        });


    }

}

export default Corousel;
