// 01. Standaard browser gedrag uitzetten
form.noValidate = true

// 02. Iets doen als het formulier wordt verstuurd
form.addEventListener('submit', validateForm)

function validateForm(event) {
  // 03. Iets doen als er wordt getypt in een formulier veld
  field.addEventListener('keyup', validateForm)

  // 04. Valideren of de wachtwoorden matchen
  passwordsMatch = matchPasswords(passwordInput, confirmPasswordInput)

  // 05. Valideren of alle velden goed zijn ingevuld
  if (!passwordsMatch || !form.checkValidity() ) {
    formFields.filter(field => !field.checkValidity())
              .forEach(field => field.classList.add('invalid'))

    // 06. Als er nog fouten zijn het formulier niet versturen
    event.preventDefault()
  } else {
    // 07. Als alles goed is ingevuld het formulier versturen
    // post naar de api met fetch()
  }
}