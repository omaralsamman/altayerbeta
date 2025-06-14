// language.js
document.addEventListener('DOMContentLoaded', function() {
    const languageToggle = document.getElementById('language-toggle');
    const currentLanguage = localStorage.getItem('language') || 'en';
    
    // Set initial language
    setLanguage(currentLanguage);
    
    // Toggle language on button click
    languageToggle.addEventListener('click', function() {
        const newLanguage = document.documentElement.lang === 'en' ? 'ar' : 'en';
        setLanguage(newLanguage);
        localStorage.setItem('language', newLanguage);
    });
    
    function setLanguage(lang) {
        // Update html lang and dir attributes
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        
        // Update toggle button text
        const languageText = languageToggle.querySelector('.language-text');
        languageText.textContent = lang === 'en' ? 'العربية' : 'English';
        
        // Update all translatable elements
        document.querySelectorAll('[data-en], [data-ar]').forEach(element => {
            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                if (element.tagName === 'INPUT' || element.tagName === 'SELECT') {
                    element.placeholder = text;
                } else {
                    element.textContent = text;
                }
            }
        });
        
        // Update select options
        document.querySelectorAll('option[data-en], option[data-ar]').forEach(option => {
            const text = option.getAttribute(`data-${lang}`);
            if (text) {
                option.textContent = text;
            }
        });
    }
});