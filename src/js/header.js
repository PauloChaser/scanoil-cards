
import {isWindowSizeSmallerThen} from './utils/helpers';


const menuButton = document.querySelector('.js-menu-button')
const headerMenu = document.querySelector('.js-header-menu')

export function initHeader() {
    if (!isWindowSizeSmallerThen(780)) {
        return
    }
    menuButton.addEventListener('click', function () {
        headerMenu.classList.toggle('header__menu--active')
        menuButton.classList.toggle('header__menuButton--active')
    })
}

export function closeMenu() {
    headerMenu.classList.remove('header__menu--active')
    menuButton.classList.remove('header__menuButton--active')
}