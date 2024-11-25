document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // SweetAlert for success
            Swal.fire({
                icon: 'success',
                title: 'Login Successful!',
                text: 'Redirecting to your dashboard...',
                timer: 2000,
                showConfirmButton: false,
                didClose: () => {
                    localStorage.setItem('adminToken', data.token);
            // Redirect based on role and status
            if (data.status === 'pending') {
                // Redirect unapproved users to profile completion
                if (data.role === 'sponsor') {
                    window.location.href = 'complete-profile.html';
                } else if (data.role === 'kid') {
                    window.location.href = 'complete-profile-kid.html';
                }
            } else {
                // Redirect approved users based on their role
                switch (data.role) {
                    case 'admin':
                        window.location.href = 'admin.html';
                        break;
                    case 'sponsor':
                        window.location.href = 'sponsor-dashboard.html';
                        break;
                    case 'kid':
                        window.location.href = 'kid-dashboard.html';
                        break;
                    default:
                        Swal.fire('Error', 'Unknown role. Contact support.', 'error');
                }
            }
            
                }
            });
        } else {
            // SweetAlert for errors
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: data.message || 'Invalid credentials. Please try again.'
            });
        }
    } catch (error) {
        console.error('Error:', error);
        // SweetAlert for unexpected errors
        Swal.fire({
            icon: 'error',
            title: 'Something Went Wrong',
            text: 'An error occurred. Please try again later.'
        });
    }
});
