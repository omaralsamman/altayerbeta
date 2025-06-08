// auth.js - To be included in all pages that need auth state

// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Update UI based on auth state
function updateAuthUI(user) {
    const signinBtn = document.querySelector('.signin-btn');
    const userMenu = document.querySelector('.user-menu');
    
    if (user) {
        // User is signed in
        if (signinBtn) {
            signinBtn.textContent = 'My Account';
            signinBtn.href = 'account.html';
        }
        
        // Show user menu if it exists
        if (userMenu) {
            userMenu.style.display = 'block';
            document.querySelector('.user-name').textContent = user.displayName || 'User';
            if (user.photoURL) {
                document.querySelector('.user-avatar').src = user.photoURL;
            }
        }
    } else {
        // User is signed out
        if (signinBtn) {
            signinBtn.textContent = 'Sign in';
            signinBtn.href = 'signin.html';
        }
        
        // Hide user menu if it exists
        if (userMenu) {
            userMenu.style.display = 'none';
        }
    }
}

// Check auth state on page load
document.addEventListener('DOMContentLoaded', () => {
    auth.onAuthStateChanged((user) => {
        updateAuthUI(user);
    });
});

// Sign out function
function signOut() {
    auth.signOut().then(() => {
        localStorage.removeItem('user');
        window.location.href = 'index.html';
    }).catch((error) => {
        console.error('Sign out error:', error);
    });
}

// Add sign out event listener if sign out button exists
document.addEventListener('DOMContentLoaded', () => {
    const signoutBtn = document.getElementById('signout-btn');
    if (signoutBtn) {
        signoutBtn.addEventListener('click', signOut);
    }
});