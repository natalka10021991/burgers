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


