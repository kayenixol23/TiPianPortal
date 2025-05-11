document.addEventListener('DOMContentLoaded', function() {
    // Initialize payment modal
    const payNowBtn = document.querySelector('.pay-now-btn');
    const paymentModal = document.getElementById('paymentModal');
    const closeModalBtn = document.querySelector('.close-modal');
    const cancelBtn = document.querySelector('.cancel-btn');
    const paymentForm = document.getElementById('paymentForm');
    const paymentMethodSelect = document.getElementById('paymentMethod');
    
    // Show payment modal when Pay Now button is clicked
    if (payNowBtn && paymentModal) {
        payNowBtn.addEventListener('click', function() {
            paymentModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    }
    
    // Close modal functions
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeModal);
    }
    
    function closeModal() {
        paymentModal.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
        
        // Reset form
        if (paymentForm) {
            paymentForm.reset();
            
            // Hide all payment details sections
            document.querySelectorAll('.payment-details').forEach(section => {
                section.style.display = 'none';
            });
        }
    }
    
    // Close modal on click outside
    window.addEventListener('click', function(e) {
        if (e.target === paymentModal) {
            closeModal();
        }
    });
    
    // Show appropriate payment details based on selected payment method
    if (paymentMethodSelect) {
        paymentMethodSelect.addEventListener('change', function() {
            // Hide all payment details sections
            document.querySelectorAll('.payment-details').forEach(section => {
                section.style.display = 'none';
            });
            
            // Show selected payment method details
            const selectedMethod = this.value;
            if (selectedMethod) {
                const detailsSection = document.querySelector(`.${selectedMethod}-details`);
                if (detailsSection) {
                    detailsSection.style.display = 'block';
                }
            }
        });
    }
    
    // Handle payment form submission
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const paymentMethod = paymentMethodSelect.value;
            
            // Validate form
            if (!paymentMethod) {
                tipianApp.notify('Please select a payment method', 'error');
                return;
            }
            
            // Validate payment-specific fields
            if (paymentMethod === 'credit-card') {
                const cardName = document.getElementById('cardName').value;
                const cardNumber = document.getElementById('cardNumber').value;
                const cardExpiry = document.getElementById('cardExpiry').value;
                const cardCvv = document.getElementById('cardCvv').value;
                
                if (!cardName || !cardNumber || !cardExpiry || !cardCvv) {
                    tipianApp.notify('Please fill in all credit card details', 'error');
                    return;
                }
            } else if (paymentMethod === 'bank-transfer') {
                const bankName = document.getElementById('bankName').value;
                const accountName = document.getElementById('accountName').value;
                const accountNumber = document.getElementById('accountNumber').value;
                
                if (!bankName || !accountName || !accountNumber) {
                    tipianApp.notify('Please fill in all bank transfer details', 'error');
                    return;
                }
            } else if (paymentMethod === 'e-wallet') {
                const walletType = document.getElementById('walletType').value;
                const walletNumber = document.getElementById('walletNumber').value;
                
                if (!walletType || !walletNumber) {
                    tipianApp.notify('Please fill in all e-wallet details', 'error');
                    return;
                }
            } else if (paymentMethod === 'over-the-counter') {
                const otcProvider = document.getElementById('otcProvider').value;
                
                if (!otcProvider) {
                    tipianApp.notify('Please select a payment center', 'error');
                    return;
                }
            }
            
            // Show processing state
            const submitBtn = paymentForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Processing...';
            
            // Simulate payment processing
            setTimeout(() => {
                // Success message
                tipianApp.notify('Payment processing initiated. You will receive a confirmation shortly.', 'success');
                
                // Close modal
                closeModal();
                
                // Reset button
                submitBtn.disabled = false;
                submitBtn.textContent = 'Confirm Payment';
                
                // Update UI to reflect payment (in a real app, this would happen after server confirmation)
                updatePaymentUI();
            }, 2000);
        });
    }
    
    function updatePaymentUI() {
        // Simulate a payment being processed
        // In a real application, this would be called after server confirmation
        
        // Update upcoming payment section
        const upcomingPayment = document.querySelector('.upcoming-payment');
        if (upcomingPayment) {
            // Replace with a "Processing" message
            upcomingPayment.innerHTML = `
                <div class="payment-info">
                    <div class="payment-title">Second Semester Tuition Fee</div>
                    <div class="payment-date">Processing payment...</div>
                </div>
                <div class="payment-amount">₱45,000.00</div>
                <div class="payment-status processing">
                    <i class="fas fa-spin fa-spinner"></i> Processing
                </div>
            `;
            
            // Add processing style
            upcomingPayment.style.backgroundColor = 'rgba(52, 152, 219, 0.1)';
            upcomingPayment.style.borderLeft = '4px solid #3498db';
        }
        
        // Simulate successful payment after a delay
        setTimeout(() => {
            // Add to payment history
            const tableBody = document.querySelector('.table-body');
            if (tableBody) {
                const newRow = document.createElement('div');
                newRow.className = 'table-row';
                
                const currentDate = new Date();
                const formattedDate = `${currentDate.toLocaleString('default', { month: 'short' })} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;
                
                newRow.innerHTML = `
                    <div class="cell description">Second Semester Tuition Fee</div>
                    <div class="cell amount">₱45,000.00</div>
                    <div class="cell date">${formattedDate}</div>
                    <div class="cell status"><span class="status-paid">Paid</span></div>
                    <div class="cell receipt"><a href="#" class="download-receipt">Download</a></div>
                `;
                
                // Add new row to the beginning of the table
                tableBody.insertBefore(newRow, tableBody.firstChild);
                
                // Highlight new row
                newRow.style.backgroundColor = 'rgba(46, 204, 113, 0.1)';
                setTimeout(() => {
                    newRow.style.backgroundColor = '';
                }, 3000);
            }
            
            // Update upcoming payment section
            if (upcomingPayment) {
                upcomingPayment.innerHTML = `
                    <div class="payment-info">
                        <div class="payment-title">All payments up to date!</div>
                        <div class="payment-date">No upcoming payments at this time</div>
                    </div>
                `;
                upcomingPayment.style.backgroundColor = 'rgba(46, 204, 113, 0.1)';
                upcomingPayment.style.borderLeft = '4px solid #2ecc71';
            }
            
            // Update overview cards
            const totalPaid = document.querySelector('.overview-card:nth-child(1) .overview-amount');
            const upcomingPaymentAmount = document.querySelector('.overview-card:nth-child(2) .overview-amount');
            
            if (totalPaid) {
                totalPaid.textContent = '₱101,000.00';
                totalPaid.style.color = '#2ecc71';
                setTimeout(() => {
                    totalPaid.style.color = '';
                }, 3000);
            }
            
            if (upcomingPaymentAmount) {
                upcomingPaymentAmount.textContent = '₱0.00';
                upcomingPaymentAmount.style.color = '#2ecc71';
                setTimeout(() => {
                    upcomingPaymentAmount.style.color = '';
                }, 3000);
            }
            
            // Show success notification
            tipianApp.notify('Payment completed successfully! Receipt has been sent to your email.', 'success');
            
        }, 3000);
    }
    
    // Initialize download receipt links
    const receiptLinks = document.querySelectorAll('.download-receipt');
    
    if (receiptLinks) {
        receiptLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // In a real application, this would download a PDF receipt
                tipianApp.notify('Receipt download initiated. Check your downloads folder.', 'info');
            });
        });
    }
    
    // Add animations to payment history table
    const tableRows = document.querySelectorAll('.table-row');
    
    tableRows.forEach((row, index) => {
        row.style.opacity = '0';
        row.style.transform = 'translateY(20px)';
        row.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            row.style.opacity = '1';
            row.style.transform = 'translateY(0)';
        }, 100);
    });
    
    // Format card number input with spaces
    const cardNumberInput = document.getElementById('cardNumber');
    
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            // Remove non-digit characters
            let value = this.value.replace(/\D/g, '');
            
            // Add spaces after every 4 digits
            value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
            
            // Update input value
            this.value = value;
        });
    }
    
    // Format expiry date input with slash
    const expiryInput = document.getElementById('cardExpiry');
    
    if (expiryInput) {
        expiryInput.addEventListener('input', function(e) {
            // Remove non-digit characters
            let value = this.value.replace(/\D/g, '');
            
            // Add slash after first 2 digits
            if (value.length > 2) {
                value = value.substring(0, 2) + '/' + value.substring(2);
            }
            
            // Limit to MM/YY format (5 characters)
            value = value.substring(0, 5);
            
            // Update input value
            this.value = value;
        });
    }
});