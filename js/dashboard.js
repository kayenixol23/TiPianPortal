document.addEventListener('DOMContentLoaded', function() {
    // Set current date in welcome section
    const currentDayElement = document.getElementById('currentDay');
    const currentDateElement = document.getElementById('currentDate');
    
    if (currentDayElement && currentDateElement) {
        const now = new Date();
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        
        currentDayElement.textContent = days[now.getDay()];
        currentDateElement.textContent = `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
    }
    
    // Mini Calendar
    const calendarDaysContainer = document.querySelector('.calendar-days');
    const currentMonthElement = document.querySelector('.current-month');
    const prevMonthButton = document.querySelector('.calendar-nav-btn.prev');
    const nextMonthButton = document.querySelector('.calendar-nav-btn.next');
    
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    
    function renderCalendar() {
        if (!calendarDaysContainer || !currentMonthElement) return;
        
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        currentMonthElement.textContent = `${months[currentMonth]} ${currentYear}`;
        
        calendarDaysContainer.innerHTML = '';
        
        // Get the first day of the month
        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        
        const startingDay = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.
        const totalDays = lastDay.getDate();
        
        // Get last month's last days to fill in the first row
        const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();
        
        // Create calendar days
        const totalCells = 42; // 6 rows x 7 days
        
        for (let i = 0; i < totalCells; i++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            
            // Fill in days from previous month
            if (i < startingDay) {
                dayElement.textContent = prevMonthLastDay - startingDay + i + 1;
                dayElement.classList.add('other-month');
            }
            // Fill in days of current month
            else if (i < startingDay + totalDays) {
                const day = i - startingDay + 1;
                dayElement.textContent = day;
                
                // Check if this is today
                const now = new Date();
                if (currentMonth === now.getMonth() && currentYear === now.getFullYear() && day === now.getDate()) {
                    dayElement.classList.add('today');
                }
                
                // Add event indicators (for demonstration)
                if (day === 10 || day === 15) {
                    dayElement.classList.add('has-event');
                }
                
                // Make days clickable
                dayElement.addEventListener('click', function() {
                    // Handle day click (e.g., show events for this day)
                    const selectedDate = new Date(currentYear, currentMonth, day);
                    console.log('Selected date:', selectedDate);
                    
                    // Remove 'selected' class from all days
                    document.querySelectorAll('.calendar-day').forEach(el => {
                        el.classList.remove('selected');
                    });
                    
                    // Add 'selected' class to clicked day
                    this.classList.add('selected');
                });
            }
            // Fill in days from next month
            else {
                dayElement.textContent = i - (startingDay + totalDays) + 1;
                dayElement.classList.add('other-month');
            }
            
            calendarDaysContainer.appendChild(dayElement);
        }
    }
    
    // Initialize calendar
    renderCalendar();
    
    // Navigate to previous month
    if (prevMonthButton) {
        prevMonthButton.addEventListener('click', function() {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            renderCalendar();
        });
    }
    
    // Navigate to next month
    if (nextMonthButton) {
        nextMonthButton.addEventListener('click', function() {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            renderCalendar();
        });
    }
    
    // Load dashboard data
    function loadDashboardData() {
        // Load upcoming assignments
        tipianApp.apiRequest('assignments')
            .then(assignments => {
                console.log('Loaded assignments:', assignments);
                // Additional processing could be done here
            })
            .catch(error => {
                console.error('Error loading assignments:', error);
            });
        
        // Load course data
        tipianApp.apiRequest('courses')
            .then(courses => {
                console.log('Loaded courses:', courses);
                // Additional processing could be done here
            })
            .catch(error => {
                console.error('Error loading courses:', error);
            });
    }
    
    // Initialize dashboard data
    loadDashboardData();
    
    // Add some animation effects
    const cards = document.querySelectorAll('.dashboard-card');
    
    if (cards.length > 0) {
        // Simple fade-in animation for cards
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = `opacity 0.5s ease, transform 0.5s ease`;
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 * index);
        });
    }
    
    // Notification badge animation
    const notificationCount = document.querySelector('.notification-count');
    
    if (notificationCount) {
        notificationCount.style.animation = 'pulse 2s infinite';
    }
    
    // Add CSS for the pulse animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
});