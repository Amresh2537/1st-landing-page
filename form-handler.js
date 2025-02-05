document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: form.querySelector('[name="name"]').value,
            phone: form.querySelector('[name="phone"]').value,
            email: form.querySelector('[name="email"]').value,
            address: form.querySelector('[name="address"]').value,
            comment: form.querySelector('[name="comment"]').value
        };
        
        // Using EmailJS service
        emailjs.send('service_0hmlq51', 'template_higgtda', {
            to_email: 'amresh2537kumar@gmail.com', // Your specific email address
            from_name: formData.name,
            from_email: formData.email,
            phone: formData.phone,
            address: formData.address,
            message: formData.comment
        })
        .then(function(response) {
            Swal.fire({
                title: 'Thank You!',
                text: 'Your enquiry has been submitted successfully. We will contact you soon.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            form.reset();
        })
        .catch(function(error) {
            Swal.fire({
                title: 'Oops...',
                text: 'Something went wrong! Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            console.error('Error:', error);
        });
    });
});
