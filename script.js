'use strict';

// const { ArrowRight } = require("lucide");

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};


btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));


// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


// // /////////////////////////////////////////////
// const header = document.querySelector('.header');
// const allSelections = document.querySelectorAll('.header');
// document.getElementById('section--1');
// const allButtons = document.getElementsByTagName('button')
// document.getElementsByClassName('btn');


// const message = document.createElement('div');
// message.classList.add('cookie-message');

// message.innerHTML = 'loren loren loren loren loren loren <button class="btn--close-cookie"> got it </button>'

// header.append(message)

// document.querySelector('.btn--close-cookie').addEventListener('click', function () {
//   message.remove();
//   // message.parentElement.removeChild(message)
// })


const btnScroll = document.querySelector('.btn--scroll-to');

const section1 = document.querySelector('#section--1');



btnScroll.addEventListener('click', function (e) {
  // const s1coords = section1.getBoundingClientRect();

  // console.log(s1coords);
  // window.scrollTo(s1coords.left, s1coords.top)

  // window.scrollTo({

  //   left: s1coords.left + window.pageXOffset,
  //   right: s1coords.top + window.pageYOffset,
  //   behavior: "smooth",
  // });

  section1.scrollIntoView({ behavior: "smooth" })

})


document.querySelectorAll('.nav__link').forEach
  (function (el) {

    el.addEventListener('click', function (e) {
      e.preventDefault();

      const id = this.getAttribute('href');
      // console.log(id);
      document.querySelector(id).scrollIntoView({ behavior: "smooth" })
    });
  });


// tabs components
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// tabs.forEach(t => t.addEventListener('click', () => console.log('Tab')))

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return;
  tabs.forEach(t => t.classList.remove('operations__tab--active'))
  tabsContent.forEach(c => c.classList.remove('operations__content--active'))
  clicked.classList.toggle('operations__tab--active');
  // console.log(clicked)



  // active content area
  // console.log(clicked.dataset.tab)
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');


})


// criando uma funcao para remover os codigos duplicados

const handleHover = function (e) {

  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }

}

// navigation hover

const nav = document.querySelector('.nav');
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));


// sticky navigation 

const initialCoords = section1.getBoundingClientRect()
// console.log(initialCoords)

window.addEventListener('scroll', function () {
  // console.log(this.window.scrollY)

  if (this.window.scrollY > initialCoords.top)
    nav.classList.add('sticky')
  else
    nav.classList.remove('sticky')
}
)

// reveal sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});


allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
})


// Lazy Loading Images.
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;


  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserver(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {

  root: null,
  threshold: 0,
  rootMargin: '400px',

});

imgTargets.forEach(img => imgObserver.observe(img));


// Slider 

const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right')
let curSlide = 0;
const maxSlide = slides.length;
const dotContainer = document.querySelector('.dots');

const createDots = function () {
  slides.forEach(function (_, i) {

    dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"> </button>`)

  });
};

createDots();
const activeDot = function (slide) {

  document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
};
activeDot(0);

const goToSlide = function (slide) {
  slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`));

};
goToSlide(0)

const nextSlide = function () {

  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
  activeDot(curSlide);

}

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
  activeDot(curSlide);
}

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') prevSlide();
  e.key === 'ArrowRight' && nextSlide();
});

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activeDot(slide);
  }
})