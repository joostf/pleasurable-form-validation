/* VARIABLES */
const form = document.querySelector('form')
const formFields = Array.from(form.elements)
const nameInput = formFields.find(field => field.id == 'name')
const passwordInput = formFields.find(field => field.id == 'password')
const confirmPasswordInput = formFields.find(field => field.id == 'repeat-password')
const confirmPasswordMessage = confirmPasswordInput.nextElementSibling
const personalInformation = formFields.find(field => field.id == 'personalInformation')
const password = formFields.find(field => field.id == 'passwords')

/* CODE LOGIC */

// 01. Standaard browser gedrag uitzetten
form.noValidate = true

// 02. Iets doen als het formulier wordt verstuurd
form.addEventListener('submit', validateForm)

/* FUNCTIONS */
function validateForm(event) {
  let passwordsMatch = false

  formFields.forEach(field => {
    field.setCustomValidity('')
    field.classList.remove('invalid')

    // 03. Iets doen als er wordt getypt in een formulier veld
    field.addEventListener('keyup', validateForm)
  })

  // 04. Valideren of de wachtwoorden matchen
  passwordsMatch = matchPasswords(passwordInput, confirmPasswordInput)

  // 05. Valideren of alle velden wel of niet goed zijn ingevuld
  if (!passwordsMatch || !form.checkValidity() ) {
    formFields.filter(field => !field.checkValidity())
              .forEach(field => field.classList.add('invalid'))
    
    playSound('typing')

    // 06. Als er nog fouten zijn het formulier niet versturen
    event.preventDefault()
    event.stopImmediatePropagation()
  } else {
    // 07. Als alles goed is ingevuld het formulier versturen
  }

}

function validateField() {
  console.log('🚀')
  this.classList.toggle('invalid', !(this.checkValidity()))
}

function matchPasswords(passwordInput, confirmPasswordInput) {
  passwordInput.setCustomValidity('')
  confirmPasswordInput.setCustomValidity('')
  
  if (passwordInput.value !== confirmPasswordInput.value) {
    confirmPasswordInput.setCustomValidity('Wachtwoorden zijn niet gelijk aan elkaar')
    confirmPasswordMessage.innerText = confirmPasswordInput.validationMessage

    return false
  }

  const passwordValidity = passwordInput.checkValidity() && confirmPasswordInput.checkValidity()

  return passwordValidity
}

// 08. Add fun 
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

function setRandomBackgroundColor() {
  h = 240
  s = Math.floor(Math.random() * 40) + 60
  l = Math.floor(Math.random() * 40) + 60
  color = 'hsl(' + h + ', ' + s + '%, ' + l + '%)'

  document.body.style.setProperty("--bg-color", color)
}















passwordInput.addEventListener('transitionend', repairInput)