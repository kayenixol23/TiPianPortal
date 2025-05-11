document.addEventListener('DOMContentLoaded', function() {
    // Campus toggle functionality
    const campusButtons = document.querySelectorAll('.campus-btn');
    
    campusButtons.forEach(button => {
        button.addEventListener('click', () => {
            campusButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const selectedCampus = button.getAttribute('data-campus');
            console.log("Selected Campus:", selectedCampus);
        });
    });

    // Password visibility toggle
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.querySelector('#password');
    
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }

    // Gmail login button
    const gmailLoginButton = document.getElementById('gmailLoginBtn');
    if (gmailLoginButton) {
        gmailLoginButton.addEventListener('click', function() {
            // In a real app, this would trigger OAuth
            console.log("Gmail login initiated");
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        });
    }

    // Form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const studentNumber = document.getElementById('studentNumber').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Validate inputs (basic validation)
            if (!studentNumber || !email || !password) {
                showError('Please fill in all fields');
                return;
            }
            
            if (!validateEmail(email)) {
                showError('Please enter a valid email address');
                return;
            }
            
            // Simulate login (in a real app, this would be an API call)
            console.log("Login attempted with:", { studentNumber, email });
            
            // Show loading state
            const loginButton = document.querySelector('.login-btn');
            loginButton.textContent = 'Logging in...';
            loginButton.disabled = true;
            
            // Simulate API delay
            setTimeout(() => {
                // Redirect to dashboard on success
                window.location.href = 'dashboard.html';
            }, 1500);
        });
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function showError(message) {
        // Check if error element already exists
        let errorElement = document.querySelector('.login-error');
        
        if (!errorElement) {
            // Create error element
            errorElement = document.createElement('div');
            errorElement.className = 'login-error';
            const loginForm = document.getElementById('loginForm');
            loginForm.prepend(errorElement);
        }
        
        // Set message and show with animation
        errorElement.textContent = message;
        errorElement.style.opacity = '0';
        errorElement.style.display = 'block';
        
        // Fade in
        setTimeout(() => {
            errorElement.style.opacity = '1';
        }, 10);
        
        // Auto hide after 4 seconds
        setTimeout(() => {
            errorElement.style.opacity = '0';
            setTimeout(() => {
                errorElement.style.display = 'none';
            }, 300);
        }, 4000);
    }

    // Add animated background effect (optional enhancement)
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            mainContent.style.backgroundPosition = `${x * 10 + 45}% ${y * 10 + 45}%`;
        });
    }
});