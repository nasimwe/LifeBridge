document.addEventListener("DOMContentLoaded", () => {
    const apiBase = 'http://localhost:3000/api/admin/kids';
    const container = document.getElementById("kids-container");

    // Fetch and display kids
    fetch(apiBase, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
    })
        .then(response => response.json())
        .then(data => {
            container.innerHTML = data.map(kid => generateKidCard(kid)).join('');
        })
        .catch(err => {
            console.error('Error fetching kids:', err);
            container.innerHTML = `<p class="text-danger">Error loading kids data.</p>`;
        });

        function generateKidCard(kid) {
            return `
                <div class="col-md-4">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <strong>Kid</strong>
                        </div>
                        <div class="panel-body">
                            <h5><strong>Name:</strong> ${kid.user?.name || "N/A"}</h5>
                            <p><strong>Email:</strong> ${kid.user?.email || "N/A"}</p>
                            <p><strong>Age:</strong> ${kid.age || "N/A"}</p>
                            <p><strong>Needs:</strong> ${kid.needs || "N/A"}</p>
                            <p><strong>Status:</strong> ${kid.status}</p>
                            <p><strong>Created:</strong> ${new Date(kid.createdAt).toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            `;
        }
        
        
});
