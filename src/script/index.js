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
    let btn = document.getElementsByClassName("burgerHeader");
    let elementContainer = document.getElementsByClassName("mobileMenuWrapper");
    let flag = false;
    let dist = elementContainer[0].offsetHeight;
    let img = document.getElementsByClassName("burgerHeaderImg");
    elementContainer[0].style.top = -dist+"px";
    console.log( btn[0].style.top);
    btn[0].addEventListener("click", () =>{
        flag = !flag; 
        if(!flag){
            header.style.background = 'rgba(0,0,0,' + window.pageYOffset / 100 + ')';
            elementContainer[0].style.visibility = "hidden";
            elementContainer[0].style.transform = "translateY(" + (-header.offsetHeight - dist - 1) + "px)";
            document.body.style.overflowY = 'scroll';
            header.classList.remove("activeHeader");
            img[0].src = ""
            
        }else{
            header.classList.add("active");
            elementContainer[0].style.visibility = "visible";
            elementContainer[0].style.transform = "translateY(" + (header.offsetHeight + dist - 1) + "px)";
            document.body.style.overflowY = 'hidden';
            header.style.background = "#4F4C64"
        }
    })
};
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
let viewport = document.getElementById("viewport").offsetWidth;
let btnNext = document.querySelector(".nextButton");
let btnPrev = document.querySelector(".prevButton");
let slider = document.querySelector("div.sliderTrack");
let viewSlide = 0;
let elementsAmount = document.getElementsByClassName('sliderItem').length;

btnNext.addEventListener("click", function () {
    if (viewSlide < elementsAmount-1) {
        viewSlide++;
    } else {
        viewSlide = 0;
    }
    slider.style.left = -viewSlide * document.getElementsByClassName('sliderItem')[viewSlide].offsetWidth + "px";

});

btnPrev.addEventListener("click", function () {
    if (viewSlide > 0) {
        viewSlide--;
    } else {
        viewSlide = elementsAmount-1;
    }
    slider.style.left = -viewSlide * document.getElementsByClassName('sliderItem')[viewSlide].offsetWidth + "px";
});

