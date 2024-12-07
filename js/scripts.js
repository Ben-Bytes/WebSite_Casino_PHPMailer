/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    //  Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});


const contactForm = document.querySelector('.contactForm');
let nom = document.getElementById('name');
let email = document.getElementById('email');
let phone = document.getElementById('phone');
let message = document.getElementById('message');
document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Empêche l'envoi du formulaire

    // Créer un objet FormData à partir du formulaire
    const formData = new FormData(this);

    // Convertir FormData en objet, en ignorant le champ access_key
    const formObject = {
        name: nom.value,
        email: email.value,
        phone: phone.value,
        message: message.value

    };
    formData.forEach((value, key) => {
        if (key !== 'access_key') { // Ignorer le champ access_key
            formObject[key] = value;
        }
    });

    // Convertir l'objet en JSON
    const json = JSON.stringify(formObject);

    //

    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: json,
        
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Afficher le message de succès
            document.getElementById('submitSuccessMessage').classList.remove('d-none');
            // Réinitialiser les champs du formulaire
            nom.value = '';
            email.value = '';
            phone.value = '';
            message.value = '';
        })
        
        .catch(error => {
            console.error('Error:', error);
            // Afficher le message d'erreur
            document.getElementById('submitErrorMessage').classList.remove('d-none');
        });
        
});
