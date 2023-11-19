document.getElementById('togglePassword').addEventListener('click', function () {
    togglePassword();
});

function togglePassword() {
    var passwordField = document.getElementById('password');
    var toggleButton = document.querySelector('.toggle-password');

    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleButton.textContent = '👀';
    } else {
        passwordField.type = 'password';
        toggleButton.textContent = '👁️';
    }
}


