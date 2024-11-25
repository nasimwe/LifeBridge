document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem('adminToken');
    const apiBase = 'http://localhost:3000/api/kid/sponsor'; 
    const sponsorContainer = document.getElementById("sponsors-container");
    const kidContainer = document.getElementById("kids-container");

    try {
        const response = await fetch(apiBase, {
            headers: { Authorization: `Bearer ${token}` }
        });

        const data = await response.json();
        if (response.ok) {
            // Generate all sponsor cards
            sponsorContainer.innerHTML = data.sponsors.map(generateSponsorCard).join('');
            // Generate kid card (assuming only one kid per dashboard)
            kidContainer.innerHTML = generateKidCard(data.kid);
        } else {
            sponsorContainer.innerHTML = `<p class="text-danger">Sponsor data: ${data.message}</p>`;
            kidContainer.innerHTML = `<p class="text-danger">Your application is pending.</p>`;
        }
    } catch (error) {
        console.error('Error:', error);
        sponsorContainer.innerHTML = `<p class="text-danger">Error loading sponsor data.</p>`;
        kidContainer.innerHTML = `<p class="text-danger">Error loading kid data.</p>`;
    }

    // Function to generate sponsor card
    function generateSponsorCard(sponsor) {
        return `
            <div class="col-md-6">
                <div class="panel panel-primary">
                    <div class="panel-heading">
                        <strong>Sponsor Details</strong>
                    </div>
                    <div class="panel-body">
                        <h6><strong>Name:</strong> ${sponsor.name || "N/A"}</h6>
                        <p><strong>Email:</strong> ${sponsor.email || "N/A"}</p>
                        <p><strong>Monthly Contribution:</strong> $${sponsor.monthlyContribution || "N/A"}</p>
                        <p><strong>Preferred Support Areas:</strong> ${
                            sponsor.preferredSupportAreas || "N/A"
                        }</p>
                        <p><strong>Status:</strong> ${sponsor.status || "N/A"}</p>
                    </div>
                </div>
            </div>
        `;
    }

    // Function to generate kid card
    function generateKidCard(kid) {
        return `
            <div class="col-md-6">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <strong>Your Details</strong>
                    </div>
                    <div class="panel-body">
                        <h6><strong>Name:</strong> ${kid.name || "N/A"}</h6>
                        <p><strong>Email:</strong> ${kid.email || "N/A"}</p>
                        <p><strong>Age:</strong> ${kid.age || "N/A"}</p>
                        <p><strong>Needs:</strong> ${kid.needs || "N/A"}</p>
                        <p><strong>Status:</strong> ${kid.status || "N/A"}</p>
                        <p><strong>Created At:</strong> ${new Date(kid.createdAt).toLocaleString() || "N/A"}</p>
                    </div>
                </div>
            </div>
        `;
    }
});
