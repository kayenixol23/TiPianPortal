document.addEventListener('DOMContentLoaded', function() {
    // Sidebar Toggle
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.sidebar');
    const main = document.querySelector('.main');
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('open');
            main.classList.toggle('sidebar-open');
        });
    }
    
    // Notifications Dropdown
    const notificationBtn = document.querySelector('.notification-btn');
    const notificationDropdown = document.querySelector('.notification-dropdown');
    
    if (notificationBtn && notificationDropdown) {
        notificationBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            notificationDropdown.classList.toggle('show');
        });
        
        document.addEventListener('click', function(e) {
            if (!notificationDropdown.contains(e.target) && e.target !== notificationBtn) {
                notificationDropdown.classList.remove('show');
            }
        });
    }
    
    // Mark notifications as read
    const notificationItems = document.querySelectorAll('.notification-list li');
    
    if (notificationItems) {
        notificationItems.forEach(item => {
            item.addEventListener('click', function() {
                this.classList.remove('unread');
                updateNotificationCount();
            });
        });
    }
    
    function updateNotificationCount() {
        const unreadCount = document.querySelectorAll('.notification-list li.unread').length;
        const countElement = document.querySelector('.notification-count');
        
        if (countElement) {
            countElement.textContent = unreadCount;
            
            if (unreadCount === 0) {
                countElement.style.display = 'none';
            } else {
                countElement.style.display = 'flex';
            }
        }
    }
    
    // Form validation
    const forms = document.querySelectorAll('form');
    
    if (forms) {
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                const requiredFields = form.querySelectorAll('[required]');
                let isValid = true;
                
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        highlightField(field);
                    } else {
                        resetField(field);
                    }
                });
                
                if (!isValid) {
                    e.preventDefault();
                    showFormError(form, 'Please fill in all required fields');
                }
            });
        });
    }
    
    function highlightField(field) {
        field.classList.add('error');
        field.addEventListener('input', function() {
            if (field.value.trim()) {
                resetField(field);
            }
        });
    }
    
    function resetField(field) {
        field.classList.remove('error');
    }
    
    function showFormError(form, message) {
        let errorElement = form.querySelector('.form-error');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'form-error';
            form.prepend(errorElement);
        }
        
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        
        setTimeout(() => {
            errorElement.style.display = 'none';
        }, 3000);
    }
    
    // Initialize tooltips
    const tooltips = document.querySelectorAll('[data-tooltip]');
    
    if (tooltips) {
        tooltips.forEach(el => {
            const tooltipText = el.getAttribute('data-tooltip');
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            
            el.addEventListener('mouseenter', () => {
                document.body.appendChild(tooltip);
                const rect = el.getBoundingClientRect();
                tooltip.style.top = rect.bottom + 10 + 'px';
                tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
                tooltip.style.opacity = '1';
            });
            
            el.addEventListener('mouseleave', () => {
                tooltip.style.opacity = '0';
                setTimeout(() => {
                    if (document.body.contains(tooltip)) {
                        document.body.removeChild(tooltip);
                    }
                }, 300);
            });
        });
    }
    
    // Responsive navigation adjustments
    function adjustNavigation() {
        if (window.innerWidth <= 576) {
            sidebar.classList.remove('open');
            main.classList.remove('sidebar-open');
        }
    }
    
    window.addEventListener('resize', adjustNavigation);
    adjustNavigation();
});

// Helper functions for common operations
const tipianApp = {
    // Show notification
    notify: function(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <p>${message}</p>
            </div>
            <button class="notification-close">×</button>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        });
        
        if (duration) {
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
                }, 300);
            }, duration);
        }
    },
    
    // Format date
    formatDate: function(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('en-US', options);
    },
    
    // Format time
    formatTime: function(time) {
        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
        return new Date(time).toLocaleTimeString('en-US', options);
    },
    
    // Get current user (placeholder for actual authentication)
    getCurrentUser: function() {
        return {
            name: 'ABE, FRAISE VERCILLE G.',
            id: '1234567',
            email: 'fraise.abe@student.tip.edu.ph',
            role: 'student'
        };
    },
    
    // API request simulation (placeholder for actual API calls)
    apiRequest: function(endpoint, method = 'GET', data = null) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate API response
                if (endpoint === 'courses') {
                    resolve([
                        { id: 1, title: 'Computer Programming', schedule: '7:30-8:30 TTh', room: 'PC12', grade: '1.00' },
                        { id: 2, title: 'Introduction to Human Computer Interaction', schedule: '7:30-8:30 TTh', room: 'PC12', grade: '1.00' },
                        { id: 3, title: 'Discrete Mathematics', schedule: '7:30-8:30 TTh', room: 'PC12', grade: '1.00' }
                    ]);
                } else if (endpoint === 'assignments') {
                    resolve([
                        { id: 1, title: 'Programming Exercise 5', course: 'Computer Programming', dueDate: '2025-01-10', status: 'pending' },
                        { id: 2, title: 'UX Design Project', course: 'Introduction to Human Computer Interaction', dueDate: '2025-01-15', status: 'in-progress' }
                    ]);
                } else {
                    reject(new Error('Endpoint not found'));
                }
            }, 500);
        });
    }
};