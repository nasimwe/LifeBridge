document.addEventListener("DOMContentLoaded", () => {
    const apiBase = 'https://lifebridge-backend.onrender.com/api/admin'; 

    // Fetch and display pending applications
    fetch(`${apiBase}/applications`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
    })
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("pending-applications-container");
            const sponsorCards = data.sponsors.map(s => generateCard('Sponsor', s));
            const kidCards = data.kids.map(k => generateCard('Kid', k));
            container.innerHTML = [...sponsorCards, ...kidCards].join('');
        });

    // Fetch and display matches
    fetch(`${apiBase}/matches`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
    })
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("matches-container");
            container.innerHTML = data.map(match => `
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-header">Match</div>
                        <div class="card-body">
                            <p><strong>Sponsor:</strong> ${match.sponsor.user.name}</p>
                            <p><strong>Kid:</strong> ${match.kid.user.name}</p>
                        </div>
                    </div>
                </div>
            `).join('');
        });

});

document.addEventListener("DOMContentLoaded", async () => {
    const sponsorSelect = document.getElementById("sponsor-select");
    const kidsSelect = document.getElementById("kids-select");
    const apiBase = "https://lifebridge-backend.onrender.com/api/admin";

    // Fetch approved sponsors and populate dropdown
    try {
        const sponsorResponse = await fetch(`${apiBase}/sponsors`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
        });
        const sponsors = await sponsorResponse.json();

        if (sponsorResponse.ok) {
            sponsors
                .filter((sponsor) => sponsor.status === "approved")
                .forEach((sponsor) => {
                    const option = document.createElement("option");
                    option.value = sponsor._id; // Keep ID in value
                    option.textContent = sponsor.user.name; // Display name
                    sponsorSelect.appendChild(option);
                });
        } else {
            alert("Error fetching sponsors.");
        }
    } catch (error) {
        console.error("Error fetching sponsors:", error);
    }

    // Fetch approved kids and populate dropdown
    try {
        const kidsResponse = await fetch(`${apiBase}/kids`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
        });
        const kids = await kidsResponse.json();

        if (kidsResponse.ok) {
            kids
                .filter((kid) => kid.status === "approved")
                .forEach((kid) => {
                    const option = document.createElement("option");
                    option.value = kid._id; // Keep ID in value
                    option.textContent = kid.user.name; // Display name
                    kidsSelect.appendChild(option);
                });
        } else {
            alert("Error fetching kids.");
        }
    } catch (error) {
        console.error("Error fetching kids:", error);
    }

    // Handle form submission
    document.getElementById("match-form").addEventListener("submit", async (event) => {
        event.preventDefault();

        const sponsorId = sponsorSelect.value;
        const kidIds = Array.from(kidsSelect.selectedOptions).map((option) => option.value);

        if (!sponsorId || kidIds.length === 0) {
            return alert("Please select a sponsor and at least one kid.");
        }

        try {
            const response = await fetch(`${apiBase}/match`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
                },
                body: JSON.stringify({ sponsorId, kidIds }),
            });

            const data = await response.json();
            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Matching Successful",
                    text: data.message,
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Matching Failed",
                    text: data.message,
                });
            }
        } catch (error) {
            console.error("Error during matching:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "An unexpected error occurred.",
            });
        }
    });
});


function generateCard(type, entity) {
    return `
        <div class="col-md-4">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <strong>${type}</strong>
                </div>
                <div class="panel-body">
                    <h5><strong>${entity.user.name}</strong></h5>
                    <p><strong>Status:</strong> ${entity.status}</p>
                    <div class="text-center">
                        <button class="btn btn-success btn-sm" onclick="updateApplication('${type.toLowerCase()}', '${entity._id}', 'approve')">Approve</button>
                        <button class="btn btn-danger btn-sm" onclick="updateApplication('${type.toLowerCase()}', '${entity._id}', 'reject')">Reject</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}


function updateApplication(type, id, status) {
    const apiBase = 'https://lifebridge-backend.onrender.com/api/admin'; 
    fetch(`${apiBase}/${status}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ type, id })
    })
        .then(response => response.json())
        .then(data => alert(data.message));
}
