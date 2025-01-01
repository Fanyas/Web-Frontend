(function() {
    window.addEventListener('load', function() {
        console.log('Page loaded');
        var [navigationEntry] = performance.getEntriesByType('navigation');
        var loadTime = navigationEntry.domContentLoadedEventEnd - navigationEntry.startTime;
        var footer = document.querySelector('footer');
        var loadTimeDiv = document.createElement('div');
        loadTimeDiv.style.backgroundColor = '#699CC2';
        loadTimeDiv.style.borderRadius = '5px';
        loadTimeDiv.style.color = 'white';
        loadTimeDiv.style.textAlign = 'center';
        loadTimeDiv.style.padding = '10px';
        loadTimeDiv.innerText = 'Page load time: ' + loadTime.toFixed(2) + ' ms';
        footer.appendChild(loadTimeDiv);
    });
})();