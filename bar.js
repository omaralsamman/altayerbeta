// bar.js
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    // Sample data for search - this would be replaced with your actual data
    const searchData = {
        categories: [
            { name: 'Burgers', icon: 'fas fa-hamburger', url: 'restaurants.html?category=burgers' },
            { name: 'Pizza', icon: 'fas fa-pizza-slice', url: 'restaurants.html?category=pizza' },
            { name: 'Asian', icon: 'fas fa-bowl-rice', url: 'restaurants.html?category=asian' },
            { name: 'Chicken', icon: 'fas fa-drumstick-bite', url: 'restaurants.html?category=chicken' },
            { name: 'Desserts', icon: 'fas fa-ice-cream', url: 'restaurants.html?category=desserts' },
            { name: 'Coffee', icon: 'fas fa-coffee', url: 'restaurants.html?category=coffee' }
        ],
        restaurants: [
            { name: 'Green Garden Salad Bar', icon: 'fas fa-leaf', url: 'restaurantcard1.html' },
            { name: 'Gourmet Burger House', icon: 'fas fa-hamburger', url: 'restaurantcard2.html' },
            { name: 'Napoli\'s Pizzeria', icon: 'fas fa-pizza-slice', url: 'restaurantcard3.html' },
            { name: 'Sushi Sensation', icon: 'fas fa-fish', url: 'restaurantcard4.html' },
            { name: 'Taco Fiesta', icon: 'fas fa-pepper-hot', url: 'restaurantcard5.html' },
            { name: 'Morning Brew Café', icon: 'fas fa-coffee', url: 'restaurantcard6.html' }
        ]
    };

    // Function to calculate similarity between strings (for fuzzy search)
    function similarity(s1, s2) {
        const longer = s1.length > s2.length ? s1 : s2;
        const shorter = s1.length <= s2.length ? s1 : s2;
        
        // If the shorter string is empty, return 0
        if (shorter.length === 0) return 0;
        
        // Check if the shorter string is a substring of the longer one
        if (longer.includes(shorter)) return shorter.length / longer.length;
        
        // Use Levenshtein distance for more complex matching
        const distance = levenshteinDistance(s1, s2);
        return 1 - (distance / Math.max(s1.length, s2.length));
    }

    // Levenshtein distance algorithm for fuzzy matching
    function levenshteinDistance(s, t) {
        if (s.length === 0) return t.length;
        if (t.length === 0) return s.length;

        const matrix = [];
        for (let i = 0; i <= t.length; i++) {
            matrix[i] = [i];
        }
        for (let j = 0; j <= s.length; j++) {
            matrix[0][j] = j;
        }

        for (let i = 1; i <= t.length; i++) {
            for (let j = 1; j <= s.length; j++) {
                const cost = t.charAt(i - 1) === s.charAt(j - 1) ? 0 : 1;
                matrix[i][j] = Math.min(
                    matrix[i - 1][j] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j - 1] + cost
                );
            }
        }

        return matrix[t.length][s.length];
    }

    // Function to perform search
    function performSearch(query) {
        if (query.length < 3) {
            searchResults.innerHTML = '';
            searchResults.style.display = 'none';
            return;
        }

        const normalizedQuery = query.toLowerCase().trim();
        let results = [];

        // Search categories
        searchData.categories.forEach(category => {
            const normalizedName = category.name.toLowerCase();
            const sim = similarity(normalizedQuery, normalizedName);
            if (sim > 0.3) { // Adjust similarity threshold as needed
                results.push({
                    type: 'category',
                    name: category.name,
                    icon: category.icon,
                    url: category.url,
                    similarity: sim
                });
            }
        });

        // Search restaurants
        searchData.restaurants.forEach(restaurant => {
            const normalizedName = restaurant.name.toLowerCase();
            const sim = similarity(normalizedQuery, normalizedName);
            if (sim > 0.3) { // Adjust similarity threshold as needed
                results.push({
                    type: 'restaurant',
                    name: restaurant.name,
                    icon: restaurant.icon,
                    url: restaurant.url,
                    similarity: sim
                });
            }
        });

        // Sort by similarity score
        results.sort((a, b) => b.similarity - a.similarity);

        displayResults(results);
    }

    // Function to display search results
    function displayResults(results) {
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="search-result-item">No results found</div>';
            searchResults.style.display = 'block';
            return;
        }

        searchResults.innerHTML = '';
        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
            resultItem.innerHTML = `
                <i class="${result.icon}"></i>
                <div class="search-result-text">
                    <div class="search-result-${result.type}">${result.name}</div>
                    <div class="search-result-type">${result.type}</div>
                </div>
            `;
            
            resultItem.addEventListener('click', () => {
                window.location.href = result.url;
            });
            
            searchResults.appendChild(resultItem);
        });

        searchResults.style.display = 'block';
    }

    // Event listeners
    searchInput.addEventListener('input', function() {
        performSearch(this.value);
    });

    searchInput.addEventListener('focus', function() {
        if (this.value.length >= 3 && searchResults.children.length > 0) {
            searchResults.style.display = 'block';
        }
    });

    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });

    // Handle URL parameter for search (for restaurants.html)
    if (window.location.pathname.includes('restaurants.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const searchParam = urlParams.get('search');
        
        if (searchParam) {
            const searchInput = document.getElementById('search-input');
            if (searchInput) {
                searchInput.value = searchParam;
                performSearch(searchParam);
            }
        }
    }
});