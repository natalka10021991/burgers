const mobileMenuButton = document.querySelector('#mobile-menu-btn');
const mobileMenu = document.querySelector('#mobile-menu');
const closeButton = document.querySelector('#close-button');

mobileMenuButton.addEventListener('click' , function (e) {
    e.preventDefault();

    mobileMenu.classList.add("mobile-menu_opened");
    document.body.classList.add('hidden');
});

closeButton.addEventListener('click' , function (e) {
    e.preventDefault();

    mobileMenu.classList.remove("mobile-menu_opened");
    document.body.classList.remove('hidden');

});


const sliderButtonLeft = document.querySelector('#slider-btn-left');
const sliderButtonRight = document.querySelector('#slider-btn-right');
const sliderList = document.querySelector('.slider__list');

sliderButtonLeft.addEventListener('click', function(e) {
    e.preventDefault();
    sliderList.insertBefore(sliderList.lastElementChild, sliderList.firstElementChild);
})

sliderButtonRight.addEventListener('click', function(e) {
    e.preventDefault();
    sliderList.appendChild(sliderList.firstElementChild);
})

const myForm = document.querySelector('#myForm');
const formButton = document.querySelector('#formButton');

formButton.addEventListener('click', event => {
    event.preventDefault();

    if (validateForm(myForm)) {
        const data = {
            name: myForm.elements.name.value,
            phone: myForm.elements.phone.value,
            comment: myForm.elements.comment.value
        }

        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
        xhr.send(JSON.stringify(data));
        xhr.addEventListener('load', () => {
            console.log(xhr.response);
        })
    }
});


function validateForm(form) {
    let valid = true;

    if(!validateField(form.elements.name)) {
        valid = false;
    }

    if(!validateField(form.elements.phone)) {
        valid = false;
    }

    if(!validateField(form.elements.comment)) {
        valid = false;
    }
    return valid;
}

function validateField(field) {
    field.nextElementSibling.textContent = field.validationMessage;
    return field.checkValidity();
}



// Accordeon

const accordeonTeam = document.querySelector('#accordeonTeam');
const clickTeam = document.querySelector('.team__person-name')
const clickTeamClass = clickTeam.className;
const accordeonMenu = document.querySelector('#accordeonMenu');
const clickMenu = document.querySelector('.menu__elem-btn')
const clickMenuClass = clickMenu.className;

function accordeon(element, title) {
    let lastActive;

    element.addEventListener('click', function(e) {
        e.preventDefault();
        if(e.target.classList.contains(title)) {
            if(lastActive) {
                lastActive.classList.remove('active');
            }

            lastActive = e.target.parentNode;
            lastActive.classList.add("active");
        }
    })
}

accordeon(accordeonTeam, clickTeamClass);
accordeon(accordeonMenu, clickMenuClass);

// Overlay

const openButton = document.querySelectorAll('.open');
const successOverlay = openOverlay('<h3>Константин Спилберг</h3><p>Мысли все о них и о них, о них и о них. Нельзя устоять, невозможно забыть... Никогда не думал, что булочки могут быть такими мягкими, котлетка такой сочной, а сыр таким расплавленным. Мысли все о них и о них, о них и о них. Нельзя устоять, невозможно забыть... Никогда не думал, что булочки могут быть такими мягкими, котлетка такой сочной, а сыр таким расплавленным.</p>');

for (var i = 0; i < openButton.length; i++) {
    openButton[i].addEventListener('click', function(e) {
        e.preventDefault();
        document.body.appendChild(successOverlay);
        document.body.classList.add('hidden');
    })
}

function openOverlay(content) {
    const overlayElement = document.createElement('div');
    overlayElement.classList.add('overlay-wrapper');

    const template = document.querySelector('#overlayTemplate');
    overlayElement.innerHTML = template.innerHTML;

    const closeTemplate = overlayElement.querySelector('.overlay__btn-close');
    closeTemplate.addEventListener('click', function(e) {
        e.preventDefault();
        document.body.removeChild(overlayElement);
        document.body.classList.remove('hidden');
    })

    const contentElement = overlayElement.querySelector('.overlay__content');
    contentElement.innerHTML = content;

    return overlayElement;



}

function filter(input, than) {
    let newArray = [];

    try {
        if (input.length === 0) {
            throw new Error('Array is empty')
        }

        for (var i=0; i<input.length; i++) {

            if (input[i] < than && input[i] > 0)  {
                throw new Error('less')
            } else if (!Number.isInteger(input[i])) {
                throw new Error('Not integer')

            } else if (input[i] < 0) {
                throw new Error('меньше нуля')

            } else {
                newArray.push(input[i]);

            }
        }

        return newArray;

    } catch (e) {
        console.log(e.message);
    }

}

var array = [61, 200.2, 300];
var result = filter(array, 60);

console.log(result); // [100, 65];



