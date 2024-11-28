// Navigation Menu Toggle Logic
const menu = document.querySelector('#menu-icon-js');
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const navTc = document.querySelector('#nav-tc-js');
const header = document.getElementById('header');

// Menu toggle functionality
if (menu && menuIcon && navbar && navTc) {
    menu.onclick = () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('open');
        navTc.classList.toggle('nav-touch-close-open');
    };

    navTc.onclick = () => {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('open');
        navTc.classList.remove('nav-touch-close-open');
    };
}

// Navbar Hide on Scroll Logic
let prevScrollPos = window.pageYOffset;

window.onscroll = () => {
    if (!header) return;

    const currentScrollPos = window.pageYOffset;
    header.classList.add('scrolled');

    if (currentScrollPos === 0) {
        header.classList.remove('scrolled');
    }

    if (navTc && navTc.classList.contains('nav-touch-close-open')) {
        return;
    }

    if (prevScrollPos > currentScrollPos) {
        header.style.top = "0";
    } else {
        header.style.top = "-100px";
    }

    prevScrollPos = currentScrollPos;
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

// Reset form and feedback after submission
if (csaOK && contactSubmitAfter && contactForm && contactButton && contactLoad && submitText) {
    csaOK.onclick = () => {
        contactSubmitAfter.classList.remove('show');
        contactForm.reset();
        contactButton.classList.remove('loading');
        contactLoad.classList.remove('show');
        submitText.classList.remove('hide');
    };
}

// Validate Form Inputs
function validateForm(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    if (!nameInput || !emailInput || !messageInput || !errorDiv || !contactButton || !contactLoad || !submitText) {
        console.error('One or more form elements are missing.');
        return;
    }

    let isValid = true;

    // Validate Name
    if (!nameInput.value.trim()) {
        isValid = false;
    }

    // Validate Email
    if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
        isValid = false;
    }

    // Validate Message
    if (!messageInput.value.trim()) {
        isValid = false;
    }

    // Error feedback
    if (!isValid) {
        errorDiv.classList.add('error-show');
    } else {
        errorDiv.classList.remove('error-show');
        emailErrorDiv.classList.remove('error-show');
        contactButton.classList.add('loading');
        contactLoad.classList.add('show');
        submitText.classList.add('hide');

        // Simulate loading and send mail
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

if (contactForm) {
	contactForm.addEventListener('submit', validateForm);
}

// Send Email using EmailJS
function sendMail() {
   
	var params = {
		name: document.getElementById('name').value,
		email: document.getElementById('email').value,
	message: document.getElementById('message').value
	}



	 emailjs.send( "service_evf2wim",  "template_v085uvl", params)
		.then(
	 		res => {
				document.getElementById('name').value = "";
			document.getElementById('email').value = "";
			document.getElementById('message').value = "";

			contactSubmitAfter.classList.add('show');
	 			formSection.classList.add('hide');
	 			contactSection.classList.add('csa-cs');
 			contactForm.classList.add('csa-cf');

	 		}
	 	)
	 	.catch((error) => {
	 		console.log(error);
	 	})
}
