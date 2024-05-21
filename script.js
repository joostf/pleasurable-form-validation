// 1. variables
const form = document.querySelector('form')
const formFields = Array.from(form.elements)
const passwordInput = formFields.find(field => field.id == 'password')
const confirmPasswordInput = formFields.find(field => field.id == 'repeat-password')
const confirmPasswordMessage = confirmPasswordInput.nextElementSibling

// 2. code logic
form.noValidate = true
form.addEventListener('submit', validateForm)

passwordInput.addEventListener('transitionend', repairInput)
// 3. functions
function validateForm(event) {
  let passwordsMatch = false

  formFields.forEach(field => {
    field.setCustomValidity('')
    field.classList.remove('invalid')
    field.addEventListener('keyup', validateForm)
    // field.addEventListener('keyup', validateField)
  });

  passwordsMatch = arePasswordsMatching(passwordInput, confirmPasswordInput)

  if (!passwordsMatch || !form.checkValidity() ) {
    formFields.filter(field => !field.checkValidity())
              .forEach(field => field.classList.add('invalid'))
    
    event.preventDefault()
    event.stopImmediatePropagation()
  } 

}

function validateField() {
  console.log('🚀')
  this.classList.toggle('invalid', !(this.checkValidity()))
}

function arePasswordsMatching(passwordInput, confirmPasswordInput) {
  passwordInput.setCustomValidity('')
  confirmPasswordInput.setCustomValidity('')
  
  if (passwordInput.value !== confirmPasswordInput.value) {
    confirmPasswordInput.setCustomValidity('Wachtwoorden zijn niet gelijk aan elkaar')
    confirmPasswordMessage.innerText = confirmPasswordInput.validationMessage

    console.log('mismatch')
    return false
  }

  const passwordValidity = passwordInput.checkValidity() && confirmPasswordInput.checkValidity()

  return passwordValidity
}

function setRandomBackgroundColor() {
  h = 240
  s = Math.floor(Math.random() * 40) + 60
  l = Math.floor(Math.random() * 40) + 60
  color = 'hsl(' + h + ', ' + s + '%, ' + l + '%)'

  document.body.style.setProperty("--bg-color", color)
}

function repairInput(event) {
  event.propertyName == 'rotate' && event.target.closest('fieldset').classList.add('repaired')
}


