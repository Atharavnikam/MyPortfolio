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


const form = document.getElementById('form');
const result = document.getElementById('result');

// Add event listener for form submission
form.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission

    // Extract access key from the hidden input
    const accessKey = form.querySelector('input[name="access_key"]').value;

    // Collect form data and convert to object
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries());

    // Add access key to the form object
    formObject.access_key = accessKey;

    // Convert the form data to JSON
    const updatedJson = JSON.stringify(formObject);

    // Show loading message
    result.innerHTML = "Please wait...";

    // Send form data to Web3Forms API
    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: updatedJson, // Send the updated JSON with access key
    })
    .then(async (response) => {
        const json = await response.json();
        if (response.status === 200) {
            result.innerHTML = "Form submitted successfully!";
        } else {
            result.innerHTML = json.message || "Something went wrong!";
        }
    })
    .catch((error) => {
        console.error(error); // Log errors for debugging
        result.innerHTML = "Failed to submit the form.";
    });
});
