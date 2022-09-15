export default class Validator {
    constructor(form) {
        this.form = form
        this.elements = [...this.form.querySelectorAll('[data-validation]')]
        this.elements.forEach((input) => {
            input.addEventListener('input', function(e) {
                if (!input.dataset.valid) {
                    input.dataset.valid = 'pending'
                }
            })
        })
    }

    reset() {
        for (let input of this.elements) {
            delete input.dataset.valid
        }
    }

    validate() {
        for (let input of this.elements) {
            this.checkField(input, input.dataset.validation);
        }
        return this.checkForm()
    }

    checkForm() {
        return !this.elements.some(item => item.dataset.valid !== 'true')
    }

    setInputValid(input, value) {
        if (!input.dataset.valid) {
            return
        }

        input.dataset.valid = String(value)
    }

    checkField(field, type) {
        switch (type) {
            case 'checkbox':
                this.setInputValid(field, field.checked)
                break;

            case 'required':
                let minLength = !!field.getAttribute('minlength') ? field.getAttribute('minlength') : 2;
                this.setInputValid(field, field.value.length >= minLength)
                break;

            case 'phone':
                let phonePattern = /^(\+7)?[\s]\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/,
                    phoneTest = phonePattern.test(field.value);
                this.setInputValid(field, phoneTest)
                break;

            case 'email':
                let emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    emailTest = emailPattern.test(field.value);
                this.setInputValid(field, emailTest)
                break;

            case 'inn':
                this.setInputValid(field, checkInnShort(field.value))
                break;
        }
    }
}

function checkInnShort(value) {
  if (typeof value !== 'string' ||
    (value.length !== 10 && value.length !== 12) ||
    value.split('').some((symbol) => isNaN(Number(symbol)))
  ) return false;

  if (value.length === 10) {
    return Number(value[9]) === (value.split('').slice(0, -1)
        .reduce(
          (summ, symbol, index) =>
            [2, 4, 10, 3, 5, 9, 4, 6, 8][index] * Number(symbol) + summ,
          0)
      % 11) % 10;

  } else if (value.length === 12) {
    let checkSumOne = (value.split('').slice(0, -2)
        .reduce(
          (summ, symbol, index) =>
            [7, 2, 4, 10, 3, 5, 9, 4, 6, 8][index] * Number(symbol) + summ,
          0)
      % 11) % 10;

    let checkSumTwo = (value.split('').slice(0, -1)
        .reduce(
          (summ, symbol, index) =>
            [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8][index] * Number(symbol) + summ,
          0)
      % 11) % 10;

    return (checkSumOne === Number(value[10]) && checkSumTwo === Number(value[11]));
  }
}
