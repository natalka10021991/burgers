const mobileMenuButton = document.querySelector('#mobile-menu-btn');
const mobileMenu = document.querySelector('#mobile-menu');
const closeButton = document.querySelector('#close-button');

mobileMenuButton.addEventListener('click' , function (e) {
    e.preventDefault();

    mobileMenu.classList.add("mobile-menu_opened");
});

closeButton.addEventListener('click' , function (e) {
    e.preventDefault();

    mobileMenu.classList.remove("mobile-menu_opened");

});


const teamAccordionButton = document.querySelectorAll('.team__item');
const menuAccordionButton = document.querySelectorAll('.menu__item');

function accordeon(button) {
    for (var i = 0; i < button.length; i++) {
        button[i].addEventListener('click', function(e) {
            e.preventDefault();

            for (var i = 0; i < button.length; i++) {
                if (button[i].classList.contains('active')) {
                    button[i].classList.remove('active');
                }
            }

            this.classList.add('active');

        });
    };
};

accordeon(teamAccordionButton);

accordeon(menuAccordionButton);


