document.getElementById('profile-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const maxKids = document.getElementById('maxKids').value;
    const monthlyContribution = document.getElementById('monthlyContribution').value;
    const supportAreas = document.getElementById('supportAreas').value.split(',').map(area => area.trim());

    try {
        const response = await fetch('https://lifebridge-backend.onrender.com/api/sponsor/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                signupDetails: { maxKids, monthlyContribution, preferredSupportAreas: supportAreas },
            }),
        });

        const data = await response.json();

        if (response.ok) {
            // SweetAlert for success
            Swal.fire({
                icon: 'success',
                title: 'Profile Completed!',
                text: 'You can now access your dashboard.',
                timer: 2000,
                showConfirmButton: false,
                didClose: () => {
                    window.location.href = 'sponsor-dashboard.html';
                }
            });
        } else {
            // SweetAlert for errors
            Swal.fire({
                icon: 'error',
                title: 'Completion Failed',
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
