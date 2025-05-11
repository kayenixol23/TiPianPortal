document.addEventListener('DOMContentLoaded', function() {
    const chatForm = document.getElementById('chatForm');
    const messageInput = document.getElementById('messageInput');
    const chatMessages = document.getElementById('chatMessages');
    
    // Scroll to bottom of chat on load
    if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Handle message submission
    if (chatForm && messageInput) {
        chatForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const message = messageInput.value.trim();
            
            if (message) {
                // Create and add message to chat
                addMessage(message);
                
                // Clear input
                messageInput.value = '';
                
                // Focus input
                messageInput.focus();
            }
        });
    }
    
    function addMessage(content) {
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
            <div class="message-sender">You</div>
            <div class="message-content">
                <p>${content}</p>
            </div>
            <div class="message-time">Today, ${formattedTime}</div>
        `;
        
        // Add message to chat
        chatMessages.appendChild(messageElement);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Simulate response after delay (for demo purposes)
        setTimeout(() => {
            simulateResponse();
        }, 2000);
    }
    
    function simulateResponse() {
        // Create response message
        const responseElement = document.createElement('div');
        responseElement.className = 'message received';
        
        // Get random member
        const members = [
            { name: 'Kaye Guinto', response: "Thanks for the update!" },
            { name: 'Jianina Marie', response: "Great! Looking forward to our meeting." },
            { name: 'Fraise Abe', response: "I'll be bringing my notes as well." }
        ];
        const randomMember = members[Math.floor(Math.random() * members.length)];
        
        // Get current time
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const formattedTime = `${hours > 12 ? hours - 12 : hours}:${minutes < 10 ? '0' + minutes : minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
        
        // Set response content
        responseElement.innerHTML = `
            <div class="message-sender">${randomMember.name}</div>
            <div class="message-content">
                <p>${randomMember.response}</p>
            </div>
            <div class="message-time">Today, ${formattedTime}</div>
        `;
        
        // Add response to chat
        chatMessages.appendChild(responseElement);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Add typing animation to input
    if (messageInput) {
        messageInput.addEventListener('focus', function() {
            this.placeholder = 'Type your message...';
        });
        
        messageInput.addEventListener('blur', function() {
            this.placeholder = 'Type your message...';
        });
        
        messageInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                chatForm.dispatchEvent(new Event('submit'));
            }
        });
    }
    
    // Enhance chat UI with hover effects
    const messages = document.querySelectorAll('.message');
    
    messages.forEach(message => {
        message.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        });
        
        message.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });
    
    // Add typing indicator functionality
    let typingTimer;
    let isTyping = false;
    
    if (messageInput) {
        messageInput.addEventListener('input', function() {
            clearTimeout(typingTimer);
            
            if (!isTyping) {
                // Would typically emit "user is typing" event to server
                isTyping = true;
                console.log('User started typing...');
            }
            
            typingTimer = setTimeout(() => {
                // Would typically emit "user stopped typing" event to server
                isTyping = false;
                console.log('User stopped typing...');
            }, 1000);
        });
    }
});