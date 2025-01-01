document.addEventListener("DOMContentLoaded", function() {
    var currentLocation = document.location.href;
    var navButton = document.querySelectorAll('.nav-button');

    navButton.forEach(a => {
        if (a.href === currentLocation) {
            a.setAttribute('style', 'text-decoration: underline');
        }
    });
});
