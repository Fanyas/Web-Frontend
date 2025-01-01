document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const id = Math.floor(Math.random() * 10) + 1;

        let users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.find(user => user.email === email)) {
            alert('Пользователь с таким email уже существует.');
            return;
        }

        users.push({ id, username, email, password });
        localStorage.setItem('users', JSON.stringify(users));

        alert('Регистрация прошла успешно!');
        window.location.href = 'index.html';
    });
});
