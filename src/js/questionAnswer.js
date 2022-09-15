import {SlideToggle} from './classes/SlideToggle';

export function initQuestionAnswer() {
    const questions = document.querySelectorAll('.js-question')
    const itemsWrapper = document.querySelector('.js-items-wrapper')
    const buttonMore = document.querySelector('.js-button-more')
    getQuestions()

    function getQuestions() {
        return fetch('http://card.zoupe.ru/faq.json', {
            method: 'GET',
            mode: 'cors',
        })
            .then((response) => response.json())
            .then((response) => {

                const itemsJson = response['faq_items'].reduce(function (acc, item) {
                    acc += renderQuestion(item, item.id)
                    console.log(item);
                    return acc
                }, ' ')
                itemsWrapper.innerHTML = itemsJson
                return response
            })
    }

    function renderQuestion(item, id) {
        return `<div class="questions__item">
                    <div class="questions__itemHeading js-question" data-container="${item.id}">
                        <div class="questions__itemHeadingOpenIcon">
                            <svg>
                                <use href="./spritemap.svg#icon-questions-open"/>
                            </svg>
                        </div>
                        <span>${item.question}</span>
                    </div>
                    <p class="questions__itemAnswer" id="${item.id}">${item.answer}</p>
                </div>`
    }


    itemsWrapper.addEventListener('click', function (e) {
        const target = event.target
        const item = target.closest('.questions__itemHeading')
        if (!item) {
            return
        }
        const SpoilerElement = new SlideToggle(item.dataset.container, 'questions__itemAnswer--active')
        item.classList.toggle('questions__itemHeading--active')
        SpoilerElement.toggle()

    })

    buttonMore.addEventListener('click', function (e) {
        e.preventDefault()
        itemsWrapper.classList.remove('questions__items--notFull')
        buttonMore.setAttribute('disabled', 'disabled')
    })
}
