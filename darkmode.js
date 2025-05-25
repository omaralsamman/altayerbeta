document.addEventListener('DOMContentLoaded', function() {
    // Dark Mode Elements
    const darkModeToggle = document.getElementById('darkmode-switch');
    const body = document.body;

    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        enableDarkMode();
        darkModeToggle.checked = true;
    }

    // Toggle dark mode when switch is changed
    darkModeToggle.addEventListener('change', function() {
        if (this.checked) {
            enableDarkMode();
            localStorage.setItem('darkMode', 'enabled');
        } else {
            disableDarkMode();
            localStorage.setItem('darkMode', 'disabled');
        }
    });

    // Enable dark mode function
    function enableDarkMode() {
        body.style.transition = 'background-color 1s ease, color 1s ease';
        body.classList.add('dark-mode');
        setTimeout(() => body.style.transition = '', 1000);
    }

    // Disable dark mode function
    function disableDarkMode() {
        body.style.transition = 'background-color 1s ease, color 1s ease';
        body.classList.remove('dark-mode');
        setTimeout(() => body.style.transition = '', 1000);
    }
});
