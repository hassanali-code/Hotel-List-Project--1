

 (() => {
  'use strict'

  // bootstrap validation style ka data schema ka according ha rules ka according enter kia ha to wo box green ho jaye agar wrong ha to red ho jaye iska lia ya  bootstrap ki javascript add ki ha 
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()