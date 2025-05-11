document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabItems = document.querySelectorAll('.tab-item');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabItems.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs and panes
            tabItems.forEach(item => item.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding tab pane
            const tabId = `${this.getAttribute('data-tab')}-tab`;
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Module toggle functionality
    const moduleHeaders = document.querySelectorAll('.module-header');
    
    moduleHeaders.forEach(header => {
        header.addEventListener('click', function() {
            this.classList.toggle('expanded');
        });
    });
    
    // File upload functionality
    const fileInput = document.getElementById('file-upload');
    const uploadedFilesList = document.getElementById('uploaded-files-list');
    const submitButton = document.getElementById('submit-assignment');
    
    if (fileInput && uploadedFilesList) {
        fileInput.addEventListener('change', function(e) {
            const files = e.target.files;
            handleFiles(files);
        });
        
        // Drag and drop functionality
        const dropArea = document.querySelector('.file-upload-area');
        
        if (dropArea) {
            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                dropArea.addEventListener(eventName, preventDefaults, false);
            });
            
            function preventDefaults(e) {
                e.preventDefault();
                e.stopPropagation();
            }
            
            ['dragenter', 'dragover'].forEach(eventName => {
                dropArea.addEventListener(eventName, highlight, false);
            });
            
            ['dragleave', 'drop'].forEach(eventName => {
                dropArea.addEventListener(eventName, unhighlight, false);
            });
            
            function highlight() {
                dropArea.classList.add('highlight');
            }
            
            function unhighlight() {
                dropArea.classList.remove('highlight');
            }
            
            dropArea.addEventListener('drop', function(e) {
                const files = e.dataTransfer.files;
                handleFiles(files);
            });
        }
        
        function handleFiles(files) {
            // Clear previous files
            uploadedFilesList.innerHTML = '';
            
            if (files.length > 0) {
                Array.from(files).forEach(file => {
                    // Validate file type
                    const validTypes = ['.java', '.py', '.cpp'];
                    const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
                    
                    if (!validTypes.includes(fileExtension)) {
                        tipianApp.notify(`Invalid file type: ${fileExtension}. Please upload a .java, .py, or .cpp file.`, 'error');
                        return;
                    }
                    
                    // Validate file size (max 10MB)
                    if (file.size > 10 * 1024 * 1024) {
                        tipianApp.notify('File is too large. Maximum size is 10MB.', 'error');
                        return;
                    }
                    
                    // Create file item
                    const fileItem = document.createElement('div');
                    fileItem.className = 'uploaded-file';
                    
                    // File icon based on extension
                    let fileIcon = 'fas fa-file-code';
                    
                    fileItem.innerHTML = `
                        <i class="${fileIcon} uploaded-file-icon"></i>
                        <span class="uploaded-file-name">${file.name}</span>
                        <span class="uploaded-file-size">${formatFileSize(file.size)}</span>
                        <i class="fas fa-times uploaded-file-remove" data-file="${file.name}"></i>
                    `;
                    
                    uploadedFilesList.appendChild(fileItem);
                    
                    // Enable submit button if file is valid
                    submitButton.disabled = false;
                });
                
                // Add event listeners for remove buttons
                document.querySelectorAll('.uploaded-file-remove').forEach(button => {
                    button.addEventListener('click', function() {
                        this.parentElement.remove();
                        
                        // If no files are left, disable submit button
                        if (uploadedFilesList.children.length === 0) {
                            submitButton.disabled = true;
                        }
                    });
                });
            }
        }
        
        function formatFileSize(bytes) {
            if (bytes < 1024) {
                return bytes + ' bytes';
            } else if (bytes < 1048576) {
                return (bytes / 1024).toFixed(1) + ' KB';
            } else {
                return (bytes / 1048576).toFixed(1) + ' MB';
            }
        }
    }
    
    // Submit assignment button
    if (submitButton) {
        submitButton.addEventListener('click', function() {
            // Disable button to prevent multiple submissions
            this.disabled = true;
            this.textContent = 'Submitting...';
            
            // Simulate submission
            setTimeout(() => {
                tipianApp.notify('Assignment submitted successfully!', 'success');
                
                // Update UI to reflect submission
                const assignmentStatus = document.querySelector('.assignment-status');
                if (assignmentStatus) {
                    assignmentStatus.textContent = 'Submitted';
                    assignmentStatus.className = 'assignment-status completed';
                }
                
                // Reset button
                this.textContent = 'Submitted';
            }, 2000);
        });
    }
    
    // Load course data based on URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id');
    
    if (courseId) {
        // In a real application, this would fetch the specific course data
        console.log('Loading course with ID:', courseId);
    }
});