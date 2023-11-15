document.addEventListener('DOMContentLoaded', function() {
    var passwordFields = document.querySelectorAll('.password-field');
    passwordFields.forEach(function(field) {
      field.addEventListener('click', function() {
        var passwordText = field.getAttribute('data-password');
        var currentText = field.innerText;

        // Cambia entre asteriscos y la contraseña real
        field.innerText = currentText === 'Click para mostrar' ? passwordText : 'Click para mostrar';
      });
    });
  });