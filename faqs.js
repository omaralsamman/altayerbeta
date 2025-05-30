document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // FAQ Category filtering
    const categoryBtns = document.querySelectorAll('.category-btn');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.dataset.category;
            filterFAQs(category);
        });
    });
    
    function filterFAQs(category) {
        const allFAQs = document.querySelectorAll('.faq-item');
        
        allFAQs.forEach(faq => {
            if (category === 'all' || faq.dataset.category === category) {
                faq.style.display = 'block';
            } else {
                faq.style.display = 'none';
            }
        });
    }
});