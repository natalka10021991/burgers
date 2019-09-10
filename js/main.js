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
});





var myForm = document.querySelector("#form");
var send = document.querySelector("#send");

send.addEventListener('click', event => {
    event.preventDefault();

    if (validateForm(myForm)) {
        let data = new FormData(myForm);
        data.append('name', myForm.elements.name.value);
        data.append('phone', myForm.elements.phone.value);
        data.append("comment", myForm.elements.desc.value);
        data.append("to", "frodo@gmail.com");
        // проверка содержимого data
//         for (var pair of data.entries()) {
//     console.log(pair[0]+ ', ' + pair[1]);
// }
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
        xhr.send(data);
        xhr.addEventListener('load', () => {
            if (xhr.response.status === 1) {
                console.log('Получилось!!!');
                console.log(xhr.response);
                //popup-message
                $(".status-popup").addClass("active");
                document.querySelector('body').onwheel = e => e.stopPropagation();
                $('.status-popup__close').on("click", function (e) {
                    e.preventDefault();
                    $(".status-popup").removeClass("active");
                    document.querySelector('body').onwheel = e => e.preventDefault();
                });
            } else {
                console.log('Не получилось...');
                console.log(xhr.response);
                document.querySelector('body').onwheel = e => e.stopPropagation();
                $(".status-popup-err").addClass("active");
                $('.status-popup__close').on("click", function (e) {
                    e.preventDefault();
                    $(".status-popup-err").removeClass("active");

                });
                document.querySelector('body').onwheel = e => e.preventDefault();
            }

        })
    }

    function validateForm(form) {
        let valide = true;
        if (!validateField(form.elements.name)) {
            valide = false;
        }
        if (!validateField(form.elements.phone)) {
            valide = false;
        }
        return valide;
    }
    function validateField(field) {
        field.nextElementSibling.textContent = field.validationMessage;
        if (document.getElementById('desc').value == '') {
            form.elements.desc.nextElementSibling.textContent = 'Заполните это поле Please fill in this field.';
            valide = false;
        } else {
            form.elements.desc.nextElementSibling.textContent = '';
        }
        return field.checkValidity();
    }
})



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

// MAP

ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
            center: [59.939095, 30.315868],
            zoom: 11
        }, {
            searchControlProvider: 'yandex#search'
        }),

        // Создаём макет содержимого.
        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        ),

        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
            hintContent: 'Бургерная 1',
            balloonContent: 'Бургерная 1'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: 'img/icons/map-marker.svg',
            // Размеры метки.
            iconImageSize: [30, 42],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-5, -38]
        }),

        myPlacemark2 = new ymaps.Placemark(myMap.getCenter(), {
            hintContent: 'Бургерная 2',
            balloonContent: 'Бургерная 2'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: 'img/icons/map-marker.svg',
            // Размеры метки.
            iconImageSize: [30, 42],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-40, -100]
        });

    myMap.geoObjects
        .add(myPlacemark)
        .add(myPlacemark2);
    myMap.behaviors.disable('scrollZoom');
});

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



