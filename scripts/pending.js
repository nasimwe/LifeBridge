document.addEventListener("DOMContentLoaded", () => {
    const apiBase = 'https://lifebridge-backend.onrender.com/api/admin/applications';
    const container = document.getElementById("pending-applications-container");



    fetch(apiBase, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
    })
        .then(response => response.json())
        .then(data => {
            const sponsorCards = data.sponsors.map(sponsor => generateCard('Sponsor', sponsor));
            const kidCards = data.kids.map(kid => generateCard('Kid', kid));
            container.innerHTML = [...sponsorCards, ...kidCards].join('');
        });
        function generateCard(type, entity) {
            return `
                <div class="col-md-4">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <strong>${type} Application</strong>
                        </div>
                        <div class="panel-body">
                            <h5><strong>Name:</strong> ${entity.user?.name || "N/A"}</h5>
                            <p><strong>Email:</strong> ${entity.user?.email || "N/A"}</p>
                            <p><strong>Status:</strong> ${entity.status}</p>
                            ${
                                type === 'Sponsor'
                                    ? `
                                        <p><strong>Max Kids:</strong> ${entity.signupDetails?.maxKids || "N/A"}</p>
                                        <p><strong>Monthly Contribution:</strong> $${entity.signupDetails?.monthlyContribution || "N/A"}</p>
                                        <p><strong>Support Areas:</strong> ${entity.signupDetails?.preferredSupportAreas?.join(', ') || "N/A"}</p>
                                      `
                                    : type === 'Kid'
                                    ? `
                                        <p><strong>Age:</strong> ${entity.age || "N/A"}</p>
                                        <p><strong>Needs:</strong> ${entity.needs || "N/A"}</p>
                                      `
                                    : ""
                            }
                            <div class="text-center">
                                <button class="btn btn-success btn-sm" onclick="updateApplication('${type.toLowerCase()}', '${entity._id}', 'approve')">Approve</button>
                                <button class="btn btn-danger btn-sm" onclick="updateApplication('${type.toLowerCase()}', '${entity._id}', 'reject')">Reject</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        
        
});

function updateApplication(type, id, status) {
    fetch(`https://lifebridge-backend.onrender.com/api/admin/${status}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ type, id })
    })
        .then(async response => {
            const data = await response.json(); // Parse the response JSON
            if (response.ok) {
                // SweetAlert success message
                Swal.fire({
                    icon: 'success',
                    title: 'Application Updated',
                    text: data.message,
                    confirmButtonText: 'OK'
                }).then(() => {
                    // Refresh the page after the user clicks "OK"
                    window.location.reload();
                });
            } else {
                // SweetAlert error message for server errors
                Swal.fire({
                    icon: 'error',
                    title: 'Update Failed',
                    text: data.message || 'An error occurred while updating the application.'
                });
            }
        })
        .catch(err => {
            // SweetAlert error message for unexpected errors
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `Error updating application: ${err.message || err}`
            });
        });
}
