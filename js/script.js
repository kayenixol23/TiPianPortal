// FAQ Data
const faqs = [
    {
        question: "How do I reset my password?",
        answer: "To reset your password, click on the 'Forgot Password' link on the login page and follow the instructions sent to your email."
    },
    {
        question: "When is the tuition payment deadline?",
        answer: "The tuition payment deadline for the current semester is June 30. Late payments may incur additional fees."
    },
    {
        question: "How do I view my grades?",
        answer: "Access your grades through the 'Grades' section in the sidebar menu. You can view both current and past semester grades."
    },
    {
        question: "How do I submit assignments?",
        answer: "Navigate to your course page, find the assignment section, and click the 'Submit' button. Follow the instructions to upload your work."
    },
    {
        question: "How do I contact my professors?",
        answer: "Use the Messages section to send direct messages to your professors. Select their name from the contact list and compose your message."
    }
];

// Initialize FAQ Section
function initFAQs() {
    const faqList = document.getElementById('faqList');
    
    faqs.forEach((faq, index) => {
        const faqItem = document.createElement('div');
        faqItem.className = 'faq-item';
        faqItem.innerHTML = `
            <div class="faq-question">
                ${faq.question}
                <span class="faq-toggle">▼</span>
            </div>
            <div class="faq-answer">
                ${faq.answer}
            </div>
        `;
        
        faqList.appendChild(faqItem);
        
        const question = faqItem.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = faqItem.classList.contains('active');
            // Close all other FAQs
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            // Toggle current FAQ
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// Notification System
function initNotifications() {
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationDropdown = document.getElementById('notificationDropdown');
    
    notificationBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        notificationDropdown.classList.toggle('active');
    });
    
    document.addEventListener('click', (e) => {
        if (!notificationDropdown.contains(e.target) && e.target !== notificationBtn) {
            notificationDropdown.classList.remove('active');
        }
    });
}

// Search Functionality
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    let searchTimeout;
    
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        
        searchTimeout = setTimeout(() => {
            const searchTerm = e.target.value.toLowerCase().trim();
            const faqItems = document.querySelectorAll('.faq-item');
            
            if (searchTerm === '') {
                faqItems.forEach(item => {
                    item.style.display = 'block';
                    item.classList.remove('active');
                });
                return;
            }
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question').textContent.toLowerCase();
                const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
                
                if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                    item.style.display = 'block';
                    item.classList.add('active');
                } else {
                    item.style.display = 'none';
                    item.classList.remove('active');
                }
            });
        }, 300);
    });
}

// Contact Form Handling
function initContactForm() {
    const supportForm = document.getElementById('supportForm');
    
    supportForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(supportForm);
        const submitBtn = supportForm.querySelector('.submit-btn');
        
        // Validate form
        let isValid = true;
        formData.forEach((value, key) => {
            if (!value.trim()) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            alert('Please fill in all fields');
            return;
        }
        
        // Simulate form submission
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Your support request has been submitted successfully!');
            supportForm.reset();
            submitBtn.textContent = 'Submit Request';
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Initialize all components
document.addEventListener('DOMContentLoaded', () => {
    initFAQs();
    initNotifications();
    initSearch();
    initContactForm();
});