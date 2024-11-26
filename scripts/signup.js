document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    try {
        const response = await fetch('https://lifebridge-backend.onrender.com/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, role }),
        });

        const data = await response.json();

        if (response.ok) {
            // SweetAlert for success
            Swal.fire({
                icon: 'success',
                title: 'Signup Successful!',
                text: 'Please log in to continue.',
                timer: 2000,
                showConfirmButton: false,
                didClose: () => {
                    window.location.href = 'login.html';
                }
            });
        } else {
            // SweetAlert for errors
            Swal.fire({
                icon: 'error',
                title: 'Signup Failed',
                text: data.message || 'An error occurred. Please try again.'
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
