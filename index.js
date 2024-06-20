// Submit form data to Google Sheets
async function submitCode() {
    submitted = true; // Set submitted flag to true

    const formData = new FormData(document.getElementById('code-form'));
    const data = {
        name: formData.get('name-input'),
        language: formData.get('language-select'),
        college: formData.get('college-select'),
        course: formData.get('course-select'),
        year: formData.get('year-select'),
        code: formData.get('new-secret-input')
    };

    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbztgmLs1dQrmV8NxbHO3cwB6UqIbhgLqJbRmdxEri9VMoWNF-_co1ulUJNlyaN1wCug/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            showThanksModal();
        } else {
            const errorData = await response.json();
            alert('Failed to submit the form: ' + errorData.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to submit the form. Please try again.');
    }
}

// Show confirmation modal on submit
document.getElementById('code-form').addEventListener('submit', function(event) {
    event.preventDefault();
    document.getElementById('confirmModal').style.display = 'block';
});


        // Close modal function
        function closeModal() {
            document.getElementById('confirmModal').style.display = 'none';
        }

        // Confirm submit function
        function confirmSubmit() {
            closeModal();
            submitCode();
        }

        // Show thanks modal
        function showThanksModal() {
            document.getElementById('thanksModal').style.display = 'block';
            // Prevent the page from reloading for 2 minutes
            setTimeout(() => {
                window.location.reload();
            }, 2 * 60 * 1000); // 2 minutes in milliseconds
        }

        // Automatically enter full screen on page load
        window.onload = function() {
            enterFullScreen();
        }

        // Prevent leaving page alert
        window.addEventListener('beforeunload', function(e) {
            if (!submitted) {
                const confirmationMessage = 'Are you sure you want to leave? Your code submission will be lost.';
                e.returnValue = confirmationMessage; // Standard browsers
                return confirmationMessage; // Old browsers
            }
        });

        // Automatically submit form if user switches tabs or closes the window
        document.addEventListener('visibilitychange', function() {
            if (document.visibilityState === 'hidden' && !submitted) {
                submitCode();
            }
        });

        window.addEventListener('beforeunload', function() {
            if (!submitted) {
                submitCode();
            }
        });

        // Disable right-click, copy, and paste
        document.addEventListener('contextmenu', function(event) {
            event.preventDefault();
        });

        document.addEventListener('copy', function(event) {
            event.preventDefault();
        });

        document.addEventListener('paste', function(event) {
            event.preventDefault();
        });

        document.getElementById('new-secret-input').addEventListener('copy', function(event) {
            event.preventDefault();
        });

        document.getElementById('new-secret-input').addEventListener('paste', function(event) {
            event.preventDefault();
        });
