"use strict";
// Make navbar transparent when it is on the top
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
  }
});

//Handle scrolling
const navbarMenu = document.querySelector(".navbar__menu");
const toggleNavMenu = document.querySelector("ul.nav__menu");
navbarMenu.addEventListener("click", (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  toggleNavMenu.classList.remove("open");
  scrollIntoView(link);
  selectNavItem(target);
});

const navbarToggleBtn = document.querySelector(".navbar__toggle-btn");
navbarToggleBtn.addEventListener("click", () => {
  toggleNavMenu.classList.toggle("open");
});
//Handle click on 'Contact me'
const contactBtn = document.querySelector(".home__contact");
contactBtn.addEventListener("click", (event) => {
  scrollIntoView("#contact");
});

// Make home slowly fade to transparent
const home = document.querySelector(".home__container");
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

const arrowUp = document.querySelector(".btn_arrow");
document.addEventListener("scroll", () => {
  if (window.scrollY > homeHeight / 2) {
    arrowUp.classList.add("visible");
  } else {
    arrowUp.classList.remove("visible");
  }
});
arrowUp.addEventListener("click", () => {
  scrollIntoView("#home");
});

const workBtnContainer = document.querySelector(".work__categories");
const projectContainer = document.querySelector(".work__projects");
const projectsAll = document.querySelectorAll(".project");
workBtnContainer.addEventListener("click", (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;

  let targetBtn = e.target;
  if (filter == null || targetBtn == null) {
    return;
  }
  //remove selection from the previous item and selct the new one
  const active = document.querySelector(".category__btn.selected");
  active.classList.remove("selected");
  const target =
    e.target.nodeName === "BUTTON" ? e.target : e.target.parentNode;
  target.classList.add("selected");

  projectContainer.classList.add("anim-out");
  setTimeout(() => {
    projectsAll.forEach((project) => {
      if (filter === "*" || filter === project.dataset.type) {
        project.classList.remove("invisible");
      } else {
        project.classList.add("invisible");
      }
      projectContainer.classList.remove("anim-out");
    });
  }, 300);
});
//1. 모든 섹션 요소들을 가지고 온다
//2. IntersectionObserver 를 이용해서 모든 섹션들을 관찰한다
//3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다.
const sectionIds = [
  "#home",
  "#about",
  "#skills",
  "#work",
  "#testimonials",
  "#contact",
];
const sections = sectionIds.map((id) => document.querySelector(id));
const navItems = sectionIds.map((id) =>
  document.querySelector('[data-link="' + id + '"]')
);

let selectedNavItem = navItems[0];
let selectedNavIndex = 0;
function selectNavItem(selected) {
  selectedNavItem.classList.remove("active");
  selectedNavItem = selected;
  selectedNavItem.classList.add("active");
}

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.3,
};
const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      let target = entry.target.id;
      target = "#" + target;
      const index = sectionIds.indexOf(target);

      // 스크롤링이 아래로 되어서 페이지가 안올라옴
      if (entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1;
      }
    }
  });
};
const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((section) => observer.observe(section));

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
}

window.addEventListener("wheel", () => {
  if (window.scrollY === 0) {
    selectedNavIndex = 0;
  } else if (
    window.scrollY + window.innerHeight ===
    document.body.clientHeight
  ) {
    selectedNavIndex = navItems.length - 1;
  }
  selectNavItem(navItems[selectedNavIndex]);
});
