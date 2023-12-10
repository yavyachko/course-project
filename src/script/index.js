//--------for header opacity------
window.onscroll = function () {
    let scrolled = window.pageYOffset || document.documentElement.scrollTop;
    let posTop = window.pageYOffset;
    if (scrolled !== 0) {
        document.querySelector('header').style.background = 'rgba(28,28,40,' + posTop / 100 + ')';
    } else {
        document.querySelector('header').style.background = 'rgba(28,28,40, 0)';
    }
}
//-----------for header button----------
function updateButtonContent() {
    let headerButton = document.querySelector('.actButton');

    if (document.documentElement.clientWidth <= 1044) {
        headerButton.textContent = 'Apply';
    } else {
        headerButton.textContent = 'Apply for grant';
    }
};
//---------------------for accordion----------------------------------
try {
    var acc = document.getElementsByClassName("accordion");
    let i;
    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            this.classList.toggle("active");
            let panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    }
    window.addEventListener('resize', updateButtonContent);
} catch (e) {
    console.log("Accordion is not defined")
}
//---------------for card texts------------------
try {
    const textWrap = () => {
        let element = document.getElementsByClassName('cardText');
        for (let i = 0; i < element.length; i++) {
            if ((document.documentElement.clientWidth <= 576) && (element[i].textContent.length >= 280)) {
                element[i].textContent = element[i].textContent.substring(1, 342) + '...';
                console.log(element[i]);
            }
        }
    }
    textWrap();
} catch (e) {
    console.log("No text to wrap")
}
//---------for addresses-------
const addresExecution = (addres) => {
    let i = 0;
    let buff = 0;
    for (i; i < addres.length; i++) {
        if (addres[i] == '/') {
            buff = 0;
        }
        else {
            return null;
        }
        return buff;
    }
}
//-----------mobile menu script--------------
const mobileMenu = () => {
    let header = document.querySelector('header')
    let element = document.getElementsByClassName("burgerHeader");
    let elementImg = document.getElementsByClassName("mobileMenuWrapper");
    let flag = false;
    element[0].addEventListener('click', function () {
        flag = !flag;
        let start = Date.now();
        console.log(start);
        let timer = setInterval(function () {
            let timePassed = Date.now() - start;
            console.log(timePassed);
            if (flag) {
                header.style.background = '#4F4C64';
                elementImg[0].style.visibility = 'visible';
                elementImg[0].style.top = timePassed + 'px';
                document.body.style.overflow = 'hidden';
                document.location.pathname == '/' ? document.getElementsByClassName('burgerHeaderImg')[0].src = './src/img/icons/fi_x.svg' : document.getElementsByClassName('burgerHeaderImg')[0].src = '../src/img/icons/fi_x.svg';
                document.location.href.substring(addresExecution(document.location.href), document.location.href.length) == '404.html' ? document.getElementsByClassName('burgerHeaderImg')[0].src = './src/img/icons/fi_x.svg' : document.getElementsByClassName('burgerHeaderImg')[0].src = '../src/img/icons/fi_x.svg';
                if (timePassed > header.offsetHeight - 8) clearInterval(timer);
            }
            else if (!flag) {
                header.style.background = 'rgba(28,28,40, 1)';
                elementImg[0].style.visibility = 'hidden';
                document.location.pathname == '/' ? document.getElementsByClassName('burgerHeaderImg')[0].src = './src/img/icons/fi_menu.svg' : document.getElementsByClassName('burgerHeaderImg')[0].src = '../src/img/icons/fi_menu.svg';
                document.location.href.substring(addresExecution(document.location.href), document.location.href.length) == '404.html' ? document.getElementsByClassName('burgerHeaderImg')[0].src = './src/img/icons/fi_menu.svg' : document.getElementsByClassName('burgerHeaderImg')[0].src = '../src/img/icons/fi_menu.svg';
                elementImg[0].style.top = -(timePassed / 2) + 'px';
                document.body.style.overflowY = 'scroll';
                if (timePassed > header.offsetHeight) {
                    clearInterval(timer);

                };
            }
        }, 2);
    });
}
mobileMenu();
//----------modal script-------------
try {
    const shadow = document.getElementsByClassName("shadowForm");
    const modal = document.querySelector('#modal');
    const btn = document.querySelector('#openModal');
    const close = document.querySelector('.close');

    btn.onclick = function () {
        modal.style.visibility = 'visible';
        shadow[0].style.visibility = 'visible';
        document.body.style.overflowY = 'hidden';
    };

    close.onclick = function () {
        modal.style.visibility = 'hidden';
        shadow[0].style.visibility = 'hidden';
        document.body.style.overflowY = 'scroll';
    };
    //----------button animation func------------
    const buttonArrow = () => {
        let element = document.getElementsByClassName("btn");
        let elementImg = document.getElementsByClassName("btnImg");
        element[0].addEventListener('mouseover', function () {
            let start = Date.now();
            console.log(start);
            let timer = setInterval(function () {
                let timePassed = Date.now() - start;
                console.log(timePassed);

                elementImg[0].style.left = timePassed / 60 + 'px';

                if (timePassed > 300) clearInterval(timer);

            }, 20);
        })
        element[0].addEventListener('mouseout', function () {
            elementImg[0].style.left = 0 + 'px';
        })
    }
    buttonArrow();
} catch (e) {
    console.log("No modals on this page")
}
//------------------

const sliderContainer = document.querySelector('.communitySlider');
const sliderTrack = document.querySelector('.sliderTrack');
const sliderItems = document.querySelectorAll('.sliderItem');

let currentSlide = 0;
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;

sliderItems.forEach((item, index) => {
  // обработчик
  item.addEventListener('mousedown', dragStart);
  item.addEventListener('touchstart', dragStart);
  item.addEventListener('mouseup', dragEnd);
  item.addEventListener('touchend', dragEnd);
  item.addEventListener('mouseleave', dragEnd);
  item.addEventListener('mousemove', drag);
  item.addEventListener('touchmove', drag);
});

function dragStart(e) {
  // начальные координаты
  if (e.type === 'touchstart') {
    startPos = e.touches[0].clientX;
  } else {
    startPos = e.clientX;
  }
  isDragging = true;
  // остановка анимации
  cancelAnimationFrame(animationID);
}

function drag(e) {
  if (isDragging) {
    let currentPosition = 0;
    if (e.type === 'touchmove') {
      currentPosition = e.touches[0].clientX;
    } else {
      currentPosition = e.clientX;
    }
    // шаг слайдера по x
    currentTranslate = prevTranslate + currentPosition - startPos;
    // смещаем слайды
    sliderTrack.style.transform = `translateX(${currentTranslate}px)`;
  }
}

function dragEnd() {
  // примняем згачения 
  prevTranslate = currentTranslate;
  isDragging = false;
  // пуск анимации
  animationID = requestAnimationFrame(settle);
}

function settle() {
  // переключение на элемент
  const slideWidth = sliderItems[0].offsetWidth;
  const threshold = slideWidth / 4;
  if (currentTranslate > threshold && currentSlide > 0) {
    currentSlide--;
  } else if (currentTranslate < -threshold && currentSlide < sliderItems.length - 1) {
    currentSlide++;
  }
  currentTranslate = currentSlide * -slideWidth;
  // смещение окончательное
  sliderTrack.style.transform = `translateX(${currentTranslate}px)`;
  // запуск
  prevTranslate = currentTranslate;
  animationID = requestAnimationFrame(settle);
}

function nextSlide() {
  currentSlide++;
  if (currentSlide === sliderItems.length) {
    currentSlide = 0;
  }
  currentTranslate = currentSlide * -sliderItems[0].offsetWidth;
  sliderTrack.style.transform = `translateX(${currentTranslate}px)`;
  prevTranslate = currentTranslate;
}

const nextButton = document.getElementById('nextButton');
nextButton.addEventListener('click', nextSlide);
