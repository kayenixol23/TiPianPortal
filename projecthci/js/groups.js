document.addEventListener('DOMContentLoaded', function() {
    // Initialize modal functionality
    const createGroupBtn = document.querySelector('.create-group-btn');
    const createGroupModal = document.getElementById('createGroupModal');
    const closeModalBtn = document.querySelector('.close-modal');
    const cancelBtn = document.querySelector('.cancel-btn');
    const createGroupForm = document.getElementById('createGroupForm');
    
    // Animation for group cards
    const groupCards = document.querySelectorAll('.group-card');
    groupCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100);
    });
    
    if (createGroupBtn && createGroupModal) {
        createGroupBtn.addEventListener('click', function() {
            createGroupModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeModal);
    }
    
    function closeModal() {
        createGroupModal.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
    }
    
    // Close modal on click outside
    window.addEventListener('click', function(e) {
        if (e.target === createGroupModal) {
            closeModal();
        }
    });
    
    // Member selection functionality
    const addMemberBtns = document.querySelectorAll('.add-member-btn');
    const selectedMembersContainer = document.getElementById('selectedMembers');
    
    if (addMemberBtns && selectedMembersContainer) {
        addMemberBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const memberItem = this.closest('.member-item');
                const memberImg = memberItem.querySelector('img').src;
                const memberName = memberItem.querySelector('span').textContent;
                
                // Check if member is already selected
                const existingMembers = selectedMembersContainer.querySelectorAll('.selected-member');
                for (let i = 0; i < existingMembers.length; i++) {
                    if (existingMembers[i].getAttribute('data-name') === memberName) {
                        tipianApp.notify('This member is already added to the group', 'info');
                        return;
                    }
                }
                
                // Create selected member element
                const selectedMember = document.createElement('div');
                selectedMember.className = 'selected-member';
                selectedMember.setAttribute('data-name', memberName);
                selectedMember.innerHTML = `
                    <img src="${memberImg}" alt="${memberName}">
                    <span>${memberName}</span>
                    <i class="fas fa-times remove-member"></i>
                `;
                
                selectedMembersContainer.appendChild(selectedMember);
                
                // Add event listener to remove button
                const removeBtn = selectedMember.querySelector('.remove-member');
                removeBtn.addEventListener('click', function() {
                    selectedMember.remove();
                });
            });
        });
    }
    
    // Form submission
    if (createGroupForm) {
        createGroupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const groupName = document.getElementById('groupName').value;
            const groupCourse = document.getElementById('groupCourse').value;
            const groupDescription = document.getElementById('groupDescription').value;
            
            // Get selected members
            const selectedMembers = [];
            const memberElements = selectedMembersContainer.querySelectorAll('.selected-member');
            memberElements.forEach(element => {
                selectedMembers.push(element.getAttribute('data-name'));
            });
            
            // Validate form
            if (!groupName) {
                tipianApp.notify('Please enter a group name', 'error');
                return;
            }
            
            if (!groupCourse) {
                tipianApp.notify('Please select a course', 'error');
                return;
            }
            
            if (selectedMembers.length === 0) {
                tipianApp.notify('Please add at least one member to the group', 'error');
                return;
            }
            
            // Create group (simulation)
            console.log('Creating group:', {
                name: groupName,
                course: groupCourse,
                description: groupDescription,
                members: selectedMembers
            });
            
            // Show loading state
            const submitBtn = createGroupForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Creating...';
            
            // Simulate API delay
            setTimeout(() => {
                // Success notification
                tipianApp.notify('Group created successfully!', 'success');
                
                // Close modal and reset form
                closeModal();
                createGroupForm.reset();
                selectedMembersContainer.innerHTML = '';
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Create Group';
                
                // Redirect to groups page (would refresh to show new group)
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }, 1500);
        });
    }
});