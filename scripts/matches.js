fetch('https://lifebridge-backend.onrender.com/api/admin/matches', {
    headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
})
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById("matches-container");
        container.innerHTML = data.map(match => `
            <div class="col-md-4">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <strong>Match</strong>
                    </div>
                    <div class="panel-body">
                        <p><strong>Sponsor:</strong> ${match.sponsor.name}</p>
                        <p><strong>Kid:</strong> ${match.kid.name}</p>
                    </div>
                </div>
            </div>
        `).join('');
    });
