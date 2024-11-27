// Navigation Menu Toggle Logic
let menu = document.querySelector('#menu-icon-js');
let menuicon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let navtc = document.querySelector('#nav-tc-js');

menu.onclick = () => {
    menuicon.classList.toggle('bx-x');
    navbar.classList.toggle('open');
    navtc.classList.toggle('nav-touch-close-open');
};

navtc.onclick = () => {
    menuicon.classList.remove('bx-x');
    navbar.classList.remove('open');
    navtc.classList.remove('nav-touch-close-open');
};

// Navbar Hide on Scroll Logic
let prevScrollpos = window.pageYOffset;

window.onscroll = () => {
    let currentScrollPos = window.pageYOffset;
    const header = document.getElementById('header');
    header.classList.add('scrolled');

    if (currentScrollPos === 0) {
        header.classList.remove('scrolled');
    }
    if (navtc.classList.contains('nav-touch-close-open')) {
        return;
    }
    if (prevScrollpos > currentScrollPos) {
        header.style.top = "0";
    } else {
        header.style.top = "-100px";
    }
    prevScrollpos = currentScrollPos;
};

// Contact Form Validation and Submission
const contactForm = document.querySelector('.contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const errorDiv = document.querySelector('.error');
const emailErrorDiv = document.querySelector('.email-error');
const contactButton = document.querySelector('.contact-button');
const contactLoad = document.querySelector('.contact-load');
const submitText = document.querySelector('.submit-text');
const contactSubmitAfter = document.querySelector('.contact-submit-after');
const csaOK = document.querySelector('.csa-ok');

if (csaOK) {
    csaOK.onclick = () => {
        contactSubmitAfter.classList.remove('show');
        contactForm.reset(); // Clear the form
        contactButton.classList.remove('loading');
        contactLoad.classList.remove('show');
        submitText.classList.remove('hide');
    };
}

// Validate Form
function validateForm(event) {
    event.preventDefault(); // Prevent the form from submitting

    let isValid = true;

    // Validate name
    if (!nameInput.value.trim()) {
        isValid = false;
    }

    // Validate email
    if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
        isValid = false;
    }

    // Validate message
    if (!messageInput.value.trim()) {
        isValid = false;
    }

    if (!isValid) {
        errorDiv.classList.add('error-show');
    } else {
        errorDiv.classList.remove('error-show');
        emailErrorDiv.classList.remove('error-show');
        contactButton.classList.add('loading');
        contactLoad.classList.add('show');
        submitText.classList.add('hide');

        // Simulate a delay to show loading feedback
        setTimeout(() => {
            sendMail();
        }, 2000);
    }
}

// Validate Email Format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Submit Form and Send Email using EmailJS
function sendMail() {
    const params = {
        name: nameInput.value,
        email: emailInput.value,
        message: messageInput.value,
    };

    const serviceID = "service_7meugbe"; // Replace with your EmailJS service ID
    const templateID = "template_7xf9ull"; // Replace with your EmailJS template ID

    emailjs.send(serviceID, templateID, params)
        .then((response) => {
            console.log("SUCCESS!", response.status, response.text);

            // Clear the form
            contactForm.reset();

            // Show success feedback
            contactSubmitAfter.classList.add('show');
            contactButton.classList.remove('loading');
            contactLoad.classList.remove('show');
            submitText.classList.remove('hide');
        })
        .catch((error) => {
            console.error("FAILED...", error);

            // Show error feedback
            alert("Failed to send the message. Please try again later.");
            contactButton.classList.remove('loading');
            contactLoad.classList.remove('show');
            submitText.classList.remove('hide');
        });
}

// Add Event Listener to the Form
if (contactForm) {
    contactForm.addEventListener('submit', validateForm);
}
