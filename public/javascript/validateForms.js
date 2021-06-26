 // Example starter JavaScript for disabling form submissions if there are invalid fields
 (function () {
    'use strict'

   // Fetch all the forms we want to apply custom Bootstrap validation styles to
   const forms = document.querySelectorAll('.validated-form')

   // Loop over them and prevent submission
   Array.from(forms)                               // It is used to make an array from form and in bootstrap it is used as"Array.prototype.slice.call(form)" 
     .forEach(function (form) {
       form.addEventListener('submit', function (event) {
         if (!form.checkValidity()) {
           event.preventDefault()
           event.stopPropagation()
         }

         form.classList.add('was-validated')
       }, false)
     })
})()