'use strict';

(function () {
    var animationElements = document.querySelectorAll('.load-animation');
    var marginPxLoad = 150;
    var speed = 16;

    var loadElements = debounce(function () {
        var winScroll = window.innerHeight + window.pageYOffset;
        for (var i = 0; i < animationElements.length; i++) {
            if (winScroll > animationElements[i].offsetTop + marginPxLoad) {
                animationElements[i].classList.add(animationElements[i].classList[0]+'-lazy');
                var e = animationElements[i];
                setTimeout(function(){
                  e.classList.add('inView');
                },100)
                console.log(animationElements[i].classList[0])
            }
        }
    }, speed);

    //If failsafe for if none exist
    if (animationElements.length >= 0) {
        window.addEventListener('scroll', loadElements);
    }
    window.onload = loadElements();

    //Limits number of times event is run - on scroll in this case
    function debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this,
                args = arguments;
            var later = function later() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
})();
