let submitted = false; // Flag to track submission

        // Set the countdown timer
        const countdownElement = document.getElementById('countdown');
        const endTime = new Date();
        endTime.setMinutes(endTime.getMinutes() + 2);

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = endTime - now;

            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            const milliseconds = Math.floor((distance % 1000) / 10);

            countdownElement.textContent = minutes + 'm ' + seconds + 's ' + milliseconds + 'ms';

            if (minutes === 1 && seconds === 0 && milliseconds === 0) {
                alert("Only 1 minute left! Please submit your code.");
            }

            if (distance < 0 && !submitted) {
                clearInterval(interval);
                countdownElement.textContent = 'Time Expired';
                submitCode();
            }
        }

        function submitCode() {
            // Simulate form submission
            // document.getElementById('code-form').submit(); // Remove this line to prevent actual form submission
            submitted = true; // Set submitted flag to true
            showThanksModal();
        }

        const interval = setInterval(updateCountdown, 10);

        // Enter full screen function
        function enterFullScreen() {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
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