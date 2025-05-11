document.addEventListener('DOMContentLoaded', function() {
    // Load courses data
    loadCourses();
    
    // Add animation to course cards
    animateCourseCards();
    
    function loadCourses() {
        tipianApp.apiRequest('courses')
            .then(courses => {
                console.log('Loaded courses:', courses);
                // Data is loaded from the simulation in main.js
                // In a real application, this would update the DOM with actual course data
            })
            .catch(error => {
                console.error('Error loading courses:', error);
                tipianApp.notify('Failed to load courses. Please try again later.', 'error');
            });
    }
    
    function animateCourseCards() {
        const courseCards = document.querySelectorAll('.course-card');
        
        courseCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        });
    }
});