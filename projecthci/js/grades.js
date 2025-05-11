document.addEventListener('DOMContentLoaded', function() {
    // Initialize download report functionality
    const downloadReportBtn = document.querySelector('.download-report');
    
    if (downloadReportBtn) {
        downloadReportBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Simulate report generation
            tipianApp.notify('Generating grade report...', 'info');
            
            setTimeout(() => {
                tipianApp.notify('Grade report has been downloaded', 'success');
            }, 1500);
        });
    }
    
    // Add animation to table rows
    const tableRows = document.querySelectorAll('.table-row');
    
    tableRows.forEach((row, index) => {
        row.style.opacity = '0';
        row.style.transform = 'translateX(-20px)';
        row.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            row.style.opacity = '1';
            row.style.transform = 'translateX(0)';
        }, 100);
    });
    
    // Calculate and update GPA
    function calculateGPA() {
        const grades = document.querySelectorAll('.cell.grade');
        let total = 0;
        
        grades.forEach(grade => {
            total += parseFloat(grade.textContent);
        });
        
        const gpa = (total / grades.length).toFixed(2);
        const gpaValue = document.querySelector('.gpa-value');
        
        if (gpaValue) {
            gpaValue.textContent = gpa;
            
            // Add color based on GPA
            if (gpa >= 1.75) {
                gpaValue.style.color = '#2ecc71';
            } else if (gpa >= 2.25) {
                gpaValue.style.color = '#f39c12';
            } else {
                gpaValue.style.color = '#e74c3c';
            }
        }
    }
    
    // Initialize GPA calculation
    calculateGPA();
});