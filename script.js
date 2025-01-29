let menu = document.querySelector('#menu-icon-js');
let menuicon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let navtc = document.querySelector('#nav-tc-js');

// Toggle menu visibility
menu.onclick = () => {
    menuicon.classList.toggle('bx-x');
    navbar.classList.toggle('open');
    navtc.classList.toggle("nav-touch-close-open");
};

navtc.onclick = () => {
    menuicon.classList.toggle('bx-x');
    navbar.classList.remove('open');
    navtc.classList.remove('nav-touch-close-open');
};
 document.getElementById('current-year').textContent = new Date().getFullYear();
// Hide navbar on scroll down and show on scroll up
var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;

    document.getElementById("header").classList.add('scrolled');
    if (currentScrollPos === 0) {
        document.getElementById("header").classList.remove('scrolled');
    }

    if (navtc.classList.contains('nav-touch-close-open')) {
        return;
    }

    if (prevScrollpos > currentScrollPos) {
        document.getElementById("header").style.top = "0";
    } else {
        document.getElementById("header").style.top = "-100px";
    }
    prevScrollpos = currentScrollPos;
};


