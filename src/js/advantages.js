import {SlideToggle} from "./classes/SlideToggle";
import {isWindowSizeSmallerThen} from "./utils/helpers";

export function initAdvantages() {
    const questions = document.querySelectorAll('.js-advantage')
    if (!isWindowSizeSmallerThen(780)) {
        return
    }

    questions.forEach(function (question) {
        const SpoilerElement = new SlideToggle(question.dataset.container, 'advantages__itemList--active')
        question.addEventListener('click', function () {
            question.classList.toggle('advantages__itemTitle--active')
            SpoilerElement.toggle()
        })
    })
}

