'use strict';
// Make navbar transparent when it is on the top
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener("scroll", ()=>{
    if (window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark');
    } else {
        navbar.classList.remove('navbar--dark');
    }
});

//Handle scrolling
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click',(event)=>{
   const target = event.target;
   const link = target.dataset.link;
    if (link == null) {
        return;
    }
    scrollIntoView(link);

});
//Handle click on 'Contact me'
const contactBtn = document.querySelector('.home__contact')
contactBtn.addEventListener('click',(event) =>{
    scrollIntoView('#contact');
});

// Make home slowly fade to transparent
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener("scroll", ()=>{
    home.style.opacity =  1 - (window.scrollY/homeHeight);
});

const arrowUp = document.querySelector('.btn_arrow');
document.addEventListener("scroll", ()=>{
    if (window.scrollY > homeHeight / 2) {
        arrowUp.classList.add('visible');
    }else{
        arrowUp.classList.remove('visible');
    }
})
arrowUp.addEventListener('click',()=>{
    scrollIntoView('#home');
});

const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projectsAll = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click',(e)=>{
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    const categoryBtns = document.querySelectorAll('.category__btn');
    let targetBtn = e.target;
    if (filter == null || targetBtn == null) {
        return;
    }

    if (targetBtn.className === 'category__count') {
        targetBtn = targetBtn.parentElement;
    }
    if (filter === targetBtn.dataset.filter) {
        categoryBtns.forEach((categoryBtn)=>{
            categoryBtn.classList.remove('active')
        });
        targetBtn.classList.add('active');
    }

    projectContainer.classList.add('anim-out');
    setTimeout(() => {
        projectsAll.forEach((project)=>{
            if (filter === '*' || filter === project.dataset.type) {
                project.classList.remove('invisible');
            } else {
                project.classList.add('invisible');
            }
            projectContainer.classList.remove('anim-out');
        });
    },300);

});

function scrollIntoView(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior: "smooth"});
}