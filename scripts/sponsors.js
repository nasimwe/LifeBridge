document.addEventListener("DOMContentLoaded", () => {
    const apiBase = 'http://localhost:3000/api/admin/sponsors';
    const container = document.getElementById("sponsors-container");

    // Fetch and display sponsors
    fetch(apiBase, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
    })
        .then(response => response.json())
        .then(data => {
            container.innerHTML = data.map(sponsor => generateSponsorCard(sponsor)).join('');
        })
        .catch(err => {
            console.error('Error fetching sponsors:', err);
            container.innerHTML = `<p class="text-danger">Error loading sponsors data.</p>`;
        });

        function generateSponsorCard(sponsor) {
            return `
                <div class="col-md-4">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            <strong>Sponsor</strong>
                        </div>
                        <div class="panel-body">
                            <h6><strong>Name:</strong> ${sponsor.user?.name || "N/A"}</h6>
                            <p><strong>Email:</strong> ${sponsor.user?.email || "N/A"}</p>
                            <p><strong>Monthly Contribution:</strong> $${sponsor.signupDetails?.monthlyContribution || "N/A"}</p>
                            <p><strong>Preferred Support Areas:</strong> ${
                                sponsor.signupDetails?.preferredSupportAreas?.join(', ') || "N/A"
                            }</p>
                        </div>
                    </div>
                </div>
            `;
        }
        
});
