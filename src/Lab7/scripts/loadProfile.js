document.addEventListener("DOMContentLoaded", function() {
    const preloader = document.getElementById('preloader');
    const profileData = document.getElementById('profileData');

    async function loadProfile() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (!currentUser) {
            alert('Пользователь не авторизован. Пожалуйста, войдите в систему.');
            window.location.href = 'sign-in.html';
            return;
        }

        try {
            preloader.style.display = 'flex';
            const offset = Math.floor(Math.random() * 10) + 1;
            const filterType = Math.random() < 0.5 ? 'increase' : 'decrease';
            let adjustedId;
            if (filterType === 'increase') {
                adjustedId = currentUser.id + offset;
            } else {
                adjustedId = currentUser.id - offset;
                if (adjustedId < 1) adjustedId = 1;
            }

            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${adjustedId}`);
            if (!response.ok) {
                throw new Error('Сеть перестала быть доступна');
            }
            const user = await response.json();
            displayProfile(user);
        } catch (error) {
            console.error('Ошибка:', error);
            profileData.innerHTML += '<div class="error">⚠ Что-то пошло не так</div>';
        } finally {
            preloader.style.display = 'none';
        }
    }

    function displayProfile(user) {
        profileData.innerHTML = `
            <p>Имя пользователя: ${user.username}</p>
            <p>Email: ${user.email}</p>`;
    }

    videojs('local-video', {
        autoplay: false,
        controls: true,
        preload: 'auto' });
    
    loadProfile();
});
