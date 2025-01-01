document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        let users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            alert('Авторизация прошла успешно!');
            window.location.href = 'profile.html';
        } else {
            alert('Неверный email или пароль.');
        }
    });
});
