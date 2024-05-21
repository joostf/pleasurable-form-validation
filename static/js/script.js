/* VARIABLES */
const form = document.querySelector('form')
const formFields = Array.from(form.elements)
const personalInformation = formFields.find(field => field.id == 'personalInformation')
const nameInput = formFields.find(field => field.id == 'name')
const passwordInput = formFields.find(field => field.id == 'password')
const confirmPasswordInput = formFields.find(field => field.id == 'repeat-password')
const confirmPasswordMessage = confirmPasswordInput.nextElementSibling


/* CODE LOGIC */
form.noValidate = true
form.addEventListener('submit', validateForm)

/* FUNCTIONS */
function validateForm(event) {
  let passwordsMatch = false

  formFields.forEach(field => {
    field.setCustomValidity('')
    field.classList.remove('invalid')
    field.addEventListener('keyup', validateForm)
  })

  passwordsMatch = matchPasswords(passwordInput, confirmPasswordInput)

  if (!passwordsMatch || !form.checkValidity() ) {
    formFields.filter(field => !field.checkValidity())
              .forEach(field => field.classList.add('invalid'))
    
    playSound('typing')

    event.preventDefault()
    event.stopImmediatePropagation()
  } 
}

function matchPasswords(passwordInput, confirmPasswordInput) {
  const message = 'Wachtwoorden zijn niet gelijk aan elkaar'
  passwordInput.setCustomValidity('')
  confirmPasswordInput.setCustomValidity('')
  
  if (passwordInput.value !== confirmPasswordInput.value) {
    confirmPasswordInput.setCustomValidity(message)
    confirmPasswordMessage.innerText = confirmPasswordInput.validationMessage

    greeting(confirmPasswordMessage)

    return false
  }

  const passwordValidity = passwordInput.checkValidity() && confirmPasswordInput.checkValidity()

  return passwordValidity
}

function validateField() {
  console.log('🚀')
  this.classList.toggle('invalid', !(this.checkValidity()))
}

function greeting(message) {
  const text = `Hey, ${message.innerText}`
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'nl-NL'
  speechSynthesis.speak(utterance)
}

function playSound(type) {
  let soundFile
  type == 'typing'? soundFile = 'mixkit-hard-typewriter-click-1119.wav' : soundFile = '/mixkit-glass-break-with-hammer-thud-759.wav'

  const audio = new Audio(`/static/sound/${soundFile}`)
  audio.play()
}

function repairInput(event) {
  if(event.propertyName == 'rotate') {
    passwordInput.removeEventListener('transitionend', repairInput)

    playSound('impact')
    passwordInput.classList.add('broken')

    setTimeout(() => {
      event.target.closest('fieldset').classList.add('repaired')
      passwordInput.classList.remove('broken')
    }, 8000)
  
  }
}
















passwordInput.addEventListener('transitionend', repairInput)