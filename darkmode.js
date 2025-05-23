document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkmode-switch');
    const body = document.body;

    // Check for saved preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        enableDarkMode();
        darkModeToggle.checked = true;
    }

    // Toggle dark mode with transition
    darkModeToggle.addEventListener('change', function() {
        if (this.checked) {
            enableDarkMode();
            localStorage.setItem('darkMode', 'enabled');
        } else {
            disableDarkMode();
            localStorage.setItem('darkMode', 'disabled');
        }
    });

    function enableDarkMode() {
        body.style.transition = 'background-color 1s ease, color 1s ease';
        body.classList.add('dark-mode');
        
        // Remove transition after animation completes
        setTimeout(() => {
            body.style.transition = '';
        }, 1000);
    }

    function disableDarkMode() {
        body.style.transition = 'background-color 1s ease, color 1s ease';
        body.classList.remove('dark-mode');
        
        // Remove transition after animation completes
        setTimeout(() => {
            body.style.transition = '';
        }, 1000);
    }
});
// Dark Mode Toggle Functionality
const darkModeToggle = document.getElementById('darkmode-switch');
const body = document.body;

// Check for saved user preference
if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    darkModeToggle.checked = true;
}

// Toggle dark mode
darkModeToggle.addEventListener('change', function() {
    if (this.checked) {
        body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
    } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
    }
    
    // Force redraw to prevent transition issues
    document.querySelectorAll('.cart-item').forEach(item => {
        item.style.display = 'none';
        item.offsetHeight; // Trigger reflow
        item.style.display = 'flex';
    });
});
