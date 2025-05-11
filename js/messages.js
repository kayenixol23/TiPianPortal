document.addEventListener('DOMContentLoaded', function() {
    const messageForm = document.getElementById('messageForm');
    const messageInput = document.getElementById('messageInput');
    const messagesBody = document.getElementById('messagesBody');
    const contacts = document.querySelectorAll('.contact');
    
    // Scroll to bottom of messages on load
    if (messagesBody) {
        messagesBody.scrollTop = messagesBody.scrollHeight;
    }
    
    // Contact selection
    if (contacts) {
        contacts.forEach(contact => {
            contact.addEventListener('click', function() {
                // Remove active class from all contacts
                contacts.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked contact
                this.classList.add('active');
                
                // Update header with contact info
                const contactName = this.querySelector('.contact-name').textContent;
                const contactAvatar = this.querySelector('.contact-avatar').innerHTML;
                const contactAvatarClass = this.querySelector('.contact-avatar').className;
                
                document.querySelector('.messages-header .contact-name').textContent = contactName;
                document.querySelector('.messages-header .contact-avatar').innerHTML = contactAvatar;
                document.querySelector('.messages-header .contact-avatar').className = contactAvatarClass;
                
                // Remove notification badge if any
                const badge = this.querySelector('.contact-badge');
                if (badge) {
                    badge.remove();
                }
                
                // Load conversation (simulated)
                loadConversation(this.getAttribute('data-contact'));
            });
        });
    }
    
    // Handle message submission
    if (messageForm && messageInput) {
        messageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const message = messageInput.value.trim();
            
            if (message) {
                // Add message to conversation
                sendMessage(message);
                
                // Clear input
                messageInput.value = '';
                
                // Focus input
                messageInput.focus();
            }
        });
    }
    
    function sendMessage(content) {
        // Get active contact
        const activeContact = document.querySelector('.contact.active');
        if (!activeContact) return;
        
        // Create message element
        const messageElement = document.createElement('div');
        messageElement.className = 'message sent';
        
        // Get current time
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const formattedTime = `${hours > 12 ? hours - 12 : hours}:${minutes < 10 ? '0' + minutes : minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
        
        // Set message content
        messageElement.innerHTML = `
            <div class="message-content">
                <p>${content}</p>
            </div>
            <div class="message-time">${formattedTime}</div>
        `;
        
        // Find or create today's message group
        let todayGroup = document.querySelector('.message-day');
        if (!todayGroup) {
            todayGroup = document.createElement('div');
            todayGroup.className = 'message-day';
            todayGroup.innerHTML = `
                <div class="day-divider">
                    <span>Today</span>
                </div>
            `;
            messagesBody.appendChild(todayGroup);
        }
        
        // Add message to today's group
        todayGroup.appendChild(messageElement);
        
        // Scroll to bottom
        messagesBody.scrollTop = messagesBody.scrollHeight;
        
        // Update preview in sidebar
        const contactPreview = activeContact.querySelector('.contact-preview');
        if (contactPreview) {
            contactPreview.textContent = `You: ${content}`;
        }
        
        // Simulate response after random delay
        const delay = Math.floor(Math.random() * 3000) + 1000; // 1-4 seconds
        setTimeout(() => {
            simulateResponse(activeContact.getAttribute('data-contact'));
        }, delay);
    }
    
    function simulateResponse(contactId) {
        // Responses for different contacts
        const responses = {
            'dr-smith': [
                "Thank you for confirming. Please make sure to submit your work on time.",
                "Do you have any questions about the assignment requirements?",
                "I'll be available during office hours tomorrow if you need additional help."
            ],
            'programming-group': [
                "Thanks for the update on your part of the project.",
                "When can we meet to integrate all the components?",
                "Has anyone started working on the documentation yet?"
            ],
            'jane-doe': [
                "Thanks! I'll check my notes as well.",
                "Are you planning to attend the review session this weekend?",
                "Let me know if you need any clarification on the material."
            ]
        };
        
        // Get random response for active contact
        const contactResponses = responses[contactId] || responses['dr-smith'];
        const randomResponse = contactResponses[Math.floor(Math.random() * contactResponses.length)];
        
        // Create response message
        const responseElement = document.createElement('div');
        responseElement.className = 'message received';
        
        // Get current time
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const formattedTime = `${hours > 12 ? hours - 12 : hours}:${minutes < 10 ? '0' + minutes : minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
        
        // Set response content
        responseElement.innerHTML = `
            <div class="message-content">
                <p>${randomResponse}</p>
            </div>
            <div class="message-time">${formattedTime}</div>
        `;
        
        // Find today's message group
        const todayGroup = document.querySelector('.message-day');
        if (todayGroup) {
            // Add response to today's group
            todayGroup.appendChild(responseElement);
            
            // Scroll to bottom
            messagesBody.scrollTop = messagesBody.scrollHeight;
            
            // Update preview in sidebar
            const activeContact = document.querySelector(`.contact[data-contact="${contactId}"]`);
            if (activeContact) {
                const contactPreview = activeContact.querySelector('.contact-preview');
                const contactTime = activeContact.querySelector('.contact-time');
                
                if (contactPreview) {
                    contactPreview.textContent = randomResponse;
                }
                
                if (contactTime) {
                    contactTime.textContent = 'Just now';
                }
            }
        }
    }
    
    function loadConversation(contactId) {
        // In a real application, this would load actual conversation history
        console.log(`Loading conversation with ${contactId}`);
        
        // Simulate loading by clearing and adding placeholder content
        if (messagesBody) {
            // Clear current messages
            messagesBody.innerHTML = '';
            
            // Add loading message
            messagesBody.innerHTML = '<div class="loading-messages">Loading messages...</div>';
            
            // Simulate delay
            setTimeout(() => {
                // Clear loading message
                messagesBody.innerHTML = '';
                
                // Add conversation based on contact
                if (contactId === 'dr-smith') {
                    messagesBody.innerHTML = `
                        <div class="message-day">
                            <div class="day-divider">
                                <span>Today</span>
                            </div>
                            
                            <div class="message received">
                                <div class="message-content">
                                    <p>Hello. I wanted to remind you about the assignment due tomorrow.</p>
                                </div>
                                <div class="message-time">10:15 AM</div>
                            </div>
                            
                            <div class="message sent">
                                <div class="message-content">
                                    <p>Hi Dr. Smith, thanks for the reminder. I'm working on it now.</p>
                                </div>
                                <div class="message-time">10:20 AM</div>
                            </div>
                            
                            <div class="message received">
                                <div class="message-content">
                                    <p>Great! Make sure to include all the required sections. Let me know if you have any questions.</p>
                                </div>
                                <div class="message-time">10:25 AM</div>
                            </div>
                            
                            <div class="message received">
                                <div class="message-content">
                                    <p>Also, please submit your assignment by tomorrow. The deadline is at 11:59 PM.</p>
                                </div>
                                <div class="message-time">10:30 AM</div>
                            </div>
                        </div>
                    `;
                } else if (contactId === 'programming-group') {
                    messagesBody.innerHTML = `
                        <div class="message-day">
                            <div class="day-divider">
                                <span>Yesterday</span>
                            </div>
                            
                            <div class="message received">
                                <div class="message-content">
                                    <p>Hey team! How's everyone doing with their assigned modules?</p>
                                </div>
                                <div class="message-time">2:15 PM</div>
                            </div>
                            
                            <div class="message sent">
                                <div class="message-content">
                                    <p>I'm about 80% done with the user interface. Should be finished by tomorrow.</p>
                                </div>
                                <div class="message-time">2:20 PM</div>
                            </div>
                            
                            <div class="message received">
                                <div class="message-content">
                                    <p>Great progress! I've completed the database integration. We need to finish the project by Friday.</p>
                                </div>
                                <div class="message-time">2:30 PM</div>
                            </div>
                        </div>
                        
                        <div class="message-day">
                            <div class="day-divider">
                                <span>Today</span>
                            </div>
                            
                            <div class="message received">
                                <div class="message-content">
                                    <p>Morning everyone! Let's plan to meet tomorrow to integrate our modules.</p>
                                </div>
                                <div class="message-time">9:15 AM</div>
                            </div>
                            
                            <div class="message received">
                                <div class="message-content">
                                    <p>We need to finish the project by Friday to have time for testing.</p>
                                </div>
                                <div class="message-time">9:20 AM</div>
                            </div>
                        </div>
                    `;
                } else if (contactId === 'jane-doe') {
                    messagesBody.innerHTML = `
                        <div class="message-day">
                            <div class="day-divider">
                                <span>Yesterday</span>
                            </div>
                            
                            <div class="message received">
                                <div class="message-content">
                                    <p>Hi there! Do you have the notes from yesterday's class? I missed it due to a doctor's appointment.</p>
                                </div>
                                <div class="message-time">4:30 PM</div>
                            </div>
                            
                            <div class="message sent">
                                <div class="message-content">
                                    <p>Hey Jane! Yes, I do. I'll scan them and send them to you this evening.</p>
                                </div>
                                <div class="message-time">5:15 PM</div>
                            </div>
                            
                            <div class="message received">
                                <div class="message-content">
                                    <p>That would be great, thank you so much!</p>
                                </div>
                                <div class="message-time">5:20 PM</div>
                            </div>
                        </div>
                    `;
                }
                
                // Scroll to bottom
                messagesBody.scrollTop = messagesBody.scrollHeight;
            }, 800);
        }
    }
});