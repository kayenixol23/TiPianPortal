document.addEventListener('DOMContentLoaded', function() {
    // Initialize course select functionality
    const courseSelect = document.querySelector('.course-select');
    
    if (courseSelect) {
        courseSelect.addEventListener('change', function() {
            const selectedCourse = this.value;
            
            // Update attendance records based on selected course
            updateAttendanceRecords(selectedCourse);
        });
    }
    
    function updateAttendanceRecords(courseId) {
        // In a real application, this would fetch attendance data from the server
        console.log(`Fetching attendance records for course: ${courseId}`);
        
        // Simulate loading state
        const recordsBody = document.querySelector('.records-body');
        if (recordsBody) {
            recordsBody.style.opacity = '0.5';
            
            setTimeout(() => {
                recordsBody.style.opacity = '1';
            }, 500);
        }
    }
    
    // Add animation to overview cards
    const overviewCards = document.querySelectorAll('.overview-card');
    
    overviewCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100);
    });
    
    // Initialize progress bars
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
    
    // Add hover effect to attendance records
    const recordRows = document.querySelectorAll('.record-row');
    
    recordRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Calculate and update attendance statistics
    function updateAttendanceStats() {
        const present = document.querySelectorAll('.status.present').length;
        const total = document.querySelectorAll('.record-row').length;
        const rate = ((present / total) * 100).toFixed(0);
        
        // Update overview cards
        const presentValue = document.querySelector('.overview-card.present .overview-value');
        const totalValue = document.querySelector('.overview-card.total .overview-value');
        const rateValue = document.querySelector('.overview-card.rate .overview-value');
        
        if (presentValue) presentValue.textContent = present;
        if (totalValue) totalValue.textContent = total;
        if (rateValue) rateValue.textContent = `${rate}%`;
    }
    
    // Initialize attendance statistics
    updateAttendanceStats();
});