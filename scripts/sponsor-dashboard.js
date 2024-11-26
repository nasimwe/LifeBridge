fetch('https://lifebridge-backend.onrender.com/api/sponsor/matches', { 
    headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` } 
})
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            // Handle cases like pending or no sponsor found
            document.getElementById('matches-container').innerHTML = `<p>${data.message}</p>`;
        } else {
            // Display sponsor details
            const sponsorContainer = document.getElementById('sponsor-container');
            sponsorContainer.innerHTML = `
                <div class="panel panel-primary">
                    <div class="panel-heading">Sponsor Details</div>
                    <div class="panel-body">
                        <p><strong>Name:</strong> ${data.sponsor.name}</p>
                        <p><strong>Email:</strong> ${data.sponsor.email}</p>
                        <p><strong>Max Kids:</strong> ${data.sponsor.maxKids}</p>
                        <p><strong>Monthly Contribution:</strong> $${data.sponsor.monthlyContribution}</p>
                        <p><strong>Preferred Support Areas:</strong> ${data.sponsor.preferredSupportAreas}</p>
                    </div>
                </div>
            `;

            // Display matched kids
            const matchesContainer = document.getElementById('kids-container');
            matchesContainer.innerHTML = data.matches.map(match => `
                <div class="col-md-4">
                    <div class="panel panel-default">
                        <div class="panel-heading">Kid Details</div>
                        <div class="panel-body">
                            <p><strong>Name:</strong> ${match.kid.name}</p>
                            <p><strong>Email:</strong> ${match.kid.email}</p>
                            <p><strong>Age:</strong> ${match.kid.age}</p>
                            <p><strong>Needs:</strong> ${match.kid.needs}</p>
                            <p><strong>Status:</strong> ${match.kid.status}</p>
                            <p><strong>Created:</strong> ${new Date(match.kid.createdAt).toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    })
    .catch(err => console.error('Error:', err));
