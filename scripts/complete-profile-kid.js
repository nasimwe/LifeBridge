document.getElementById('kid-profile-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const age = document.getElementById('age').value;
    const needs = document.getElementById('needs').value;

    try {
        const response = await fetch('http://localhost:3000/api/kid/complete-profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ age, needs }),
        });

        const data = await response.json();

        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Profile Completed!',
                text: 'Your application will be reviewed by an admin.',
                timer: 3000,
                showConfirmButton: false,
                didClose: () => {
                    window.location.href = 'kid-dashboard.html';
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Submission Failed',
                text: data.message || 'An error occurred. Please try again.'
            });
        }
    } catch (error) {
        console.error('Error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Something Went Wrong',
            text: 'An error occurred. Please try again later.'
        });
    }
});
