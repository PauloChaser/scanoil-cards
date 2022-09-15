import Validator from './classes/Validator';

export function initForms() {
    let sessionId = ''

    const inputInn = document.querySelector('.js-input-inn')
    const inputMail = document.querySelector('.js-input-email')
    const inputCode = document.querySelector('.js-input-code')
    const inputCheck = document.querySelector('.js-privacy-policy-agree')

    const buttonsReset = document.querySelectorAll('.js-button-reset')
    const buttonNext = document.querySelector('.js-button-continue')
    const buttonComplete = document.querySelector('.js-button-complete')

    const firstForm = document.querySelector('.js-first-form')
    const secondForm = document.querySelector('.js-second-form')
    const forms = [firstForm, secondForm]

    const steps = document.querySelectorAll('.js-step')

    const thirdStepHeading = document.querySelector('.js-third-step-header')
    const thirdStepMessage = document.querySelector('.js-third-step-message')

    resetSessionId().then((sessionResponse) => {
        sessionId = sessionResponse
    })

    firstForm.validator = new Validator(firstForm);

    firstForm.addEventListener('input', function () {
        buttonNext.disabled = !firstForm.validator.validate();
    })

    inputInn.addEventListener('input', function () {
        inputInn.value = inputInn.value.replace(/[^0-9]/g, "").slice(0, 12);
    });

    inputInn.addEventListener('keypress', function (e) {
        inputChecker(e, /[0-9]|\./, 12);
    });

    clearInput ()

    function clearInput () {
        firstForm.addEventListener('click', function (e) {
            const target = event.target
            const item = target.closest('.inputWrapper__input')
            if (!item) {
                return
            }
            item.value = ''
            // delete item.dataset.valid
            item.removeAttribute('data-valid')
            setError()
            buttonNext.disabled = !firstForm.validator.validate();
        })
    }

    inputCode.addEventListener('keypress', function (e) {
        inputChecker(e, /[0-9a-zA-Z]+/i, 8)
    });

    inputCheck.addEventListener('change', function () {
        setError()
    })

    buttonsReset.forEach((button) => {
        button.addEventListener('click', function () {
            clearForm()
            changeStep(1)
            resetSessionId().then((sessionResponse) => {
                sessionId = sessionResponse
            })
            scrollToElement()
        })
    })

    buttonNext.addEventListener('click', function () {
        const jsonData = JSON.stringify({
            "c-session": sessionId,
            "c-vat": inputInn.value,
            "c-mail": inputMail.value,
            "c-terms-accepted": 1
        });

        post('https://maps.scanoil.ru/forms/scripts/do.customer.1.htm', jsonData)
            .then((response) => {
                if (response['c-success'] === '1') {
                    setValues(response, inputMail.value)
                    changeStep(2)
                    scrollToElement()
                } else {
                    if (response['c-vat-color'] === '0') {
                        inputInn.dataset.valid = 'false'
                    } else if (response['c-mail-color'] === '0') {
                        inputMail.dataset.valid = 'false'
                    }
                    scrollToElement()
                }

                setError(response['c-message'])
                buttonNext.setAttribute('disabled', 'disabled')
            })
    })

    inputCode.addEventListener('input', function () {
        inputCode.value = inputCode.value.toUpperCase().slice(0, 8)
        const dataCode = JSON.stringify({
            "c-session": sessionId,
            "c-mail-code": inputCode.value
        });

        if (inputCode.value.length === 8) {
            post('https://maps.scanoil.ru/forms/scripts/do.customer.2.htm', dataCode)
                .then((response) => {
                    if (response['success'] === '1') {
                        inputCode.setAttribute('disabled', 'disabled')
                        buttonComplete.removeAttribute('disabled')
                        inputCode.dataset.valid = 'true'
                        inputCode.blur()
                    } else {
                        inputCode.dataset.valid = 'false'
                    }

                    setError(response['c-message'])
                })
        }
        if (inputCode.dataset.valid === 'false') {
            inputCode.removeAttribute('data-valid')
            setError()
        }
    })

    buttonComplete.addEventListener('click', function () {
        const dataCode = JSON.stringify({
            "c-session": sessionId
        })
        post('https://maps.scanoil.ru/forms/scripts/do.customer.done.htm', dataCode)
            .then((response) => {
                if (response['c-success'] === '1') {
                    thirdStepMessage.innerHTML = response['message']
                    thirdStepHeading.innerHTML = response['c-header']
                    changeStep(3)
                }
                scrollToElement()
            })
    })

    function setError(message = '') {
        const errorMessages = document.querySelectorAll('.js-form-message')
        errorMessages.forEach((messageElement) => {
            messageElement.innerText = message;
        })
    }

    function changeStep(step) {
        if (step > steps.length || step < 1) {
            return
        }
        steps.forEach(function (formStep, current) {
            formStep.classList.toggle('contract__step--active', current === (step - 1))
        })
    }

    function clearForm() {
        forms.forEach((form) => {
            form.reset()
            setError('')
            form.validator && form.validator.reset()
            delete inputCode.dataset.valid
            buttonNext.setAttribute('disabled', 'disabled')
            inputCode.removeAttribute('disabled')
        })
    }

    function resetSessionId() {
        return fetch('https://maps.scanoil.ru/forms/scripts/do.customer.0.htm', {
            method: "POST",
        }).then((response) => response.text())
    }
}

function inputChecker(e, regex, size) {
    const key = e.keyCode || e.which;
    const realKey = String.fromCharCode(key);

    if (
        e.target.value.length === size
    ) {
        e.returnValue = false;
        if (e.preventDefault) e.preventDefault();
    }
}

function setValues(data, mail) {
    const inputInn = document.getElementById('inputInn')
    const inputKpp = document.getElementById('inputKpp')
    const inputOgrn = document.getElementById('inputOgrn')
    const inputCompanyName = document.getElementById('inputCompanyName')
    const inputEmail = document.getElementById('inputEmail')
    const inputLegalAddress = document.getElementById('inputLegalAddress')

    inputInn.value = data['c-vat'] || ''
    inputKpp.value = data['c-kpp'] || ''
    inputOgrn.value = data['c-ogrn'] || ''
    inputCompanyName.value = data['c-name'] || ''
    inputLegalAddress.value = data['c-address'] || ''
    inputEmail.value = mail || ''

    const legalAddressWrapper = inputLegalAddress.closest('.inputWrapper')
    const kppWrapper = inputKpp.closest('.inputWrapper')

    legalAddressWrapper.classList.toggle('inputWrapper--hidden', data['c-type'] === '1')
    kppWrapper.classList.toggle('inputWrapper--hidden', data['c-type'] === '1')
}

function post(url, data) {
    console.log(data);
    return fetch(url, {
        method: 'POST',
        body: data,
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors',
    })
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            return response
        })
}

function scrollToElement() {
    const element = document.querySelector('.js-forms');

    window.scrollTo({
        behavior: 'smooth',
        top: element.getBoundingClientRect().top + window.scrollY - 15,
    });
}
