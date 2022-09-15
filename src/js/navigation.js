import {closeMenu} from "./header";

export function initNavigation () {
    const linkItems = document.querySelectorAll('.js-nav-link')

    linkItems.forEach((link) => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const id = link.getAttribute('href');
            const element = document.querySelector(id);

            window.scrollTo({
                behavior: 'smooth',
                top: element.getBoundingClientRect().top + window.scrollY - 15,
            });

            closeMenu()
        });
    })
}