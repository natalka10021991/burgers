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


/*
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

*/



const myForm = document.querySelector('#myForm');
const send = document.querySelector('#send');
const successSend = openOverlay("<div>Данные отправлены!</div>")
const failedSend = openOverlay("<div class='error'>Упс! Что-то пошло не так!</div>")


send.addEventListener('click', event => {
    event.preventDefault();

    if (validateForm(myForm)) {

        let data = new FormData(myForm);
        data.append('name', myForm.elements.name.value);
        data.append('phone', myForm.elements.phone.value);
        data.append("comment", myForm.elements.desc.value);
        data.append("to", "n.a.bystrova@gmail.com");
        // проверка содержимого data
//         for (var pair of data.entries()) {
//     console.log(pair[0]+ ', ' + pair[1]);
//        }

        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
        xhr.send(data);
        xhr.addEventListener('load', () => {
            if (xhr.response.status === 1) {
                console.log('Получилось!!!');
                console.log(xhr.response);
                document.body.appendChild(successSend);


            } else {
                console.log('Не получилось...');
                console.log(xhr.response);
                document.body.appendChild(failedSend);
            }
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

const teamButton = $('.team__item');
const menuButton = $('.menu__item');

accordeon(teamButton);
accordeon(menuButton);

function accordeon(button) {
    button.on('click', function(e) {
        e.preventDefault();
        button.not($(this)).removeClass('active');

        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $(this).addClass('active');
        }
    })
}




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
            iconImageHref: '../img/map-marker.svg',
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
            iconImageHref: '../img/map-marker.svg',
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



$(document).ready(function(){
    $('.slider__list').slick({
        prevArrow: $('#slider-btn-left'),
        nextArrow: $('#slider-btn-right')

    });
});


var array = [61, 200.2, 300];
var result = filter(array, 60);

console.log(result); // [100, 65];



