
// Smooth sroll

const section1 = document.querySelector('#section--1');

btnScroll.addEventListener('click', function (e) {
    section1.scrollIntoView({ behavior: "smooth" })

})

//#########################//


// add a event on mouseover and remove

const h1 = document.querySelector('h1');
const alertH1 = function (e) {
    alert('your text goes here')

    // you can add a remove situation in here.
    h1.removeEventListener('mouseenter', alertH1)
};


h1.addEventListener('mouseenter', alertH1)

// or you can add a timeout too
setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000)

// navigation hover

const nav = document.querySelector('.nav');
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));





// sticky navigation 

const initialCoords = section1.getBoundingClientRect()
console.log(initialCoords)

window.addEventListener('scroll', function () {
    // console.log(this.window.scrollY)

    if (this.window.scrollY > initialCoords.top)
        nav.classList.add('sticky')
    else
        nav.classList.remove('sticky')
}
)

// reveal sections (Lembrando que precisa ter uma classe como a section--hidden com opacity: 0; e transform: translateY(8rem);) 
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserver(entry.target)
        ;
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
});


allSections.forEach(function (section) {
    sectionObserver.observe(section);
    section.classList.add('section--hidden');
})