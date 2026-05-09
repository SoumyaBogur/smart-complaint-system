// ================= LOGIN =================

function loginUser() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(async response => {

        const text = await response.text();

        console.log("RAW RESPONSE:", text);

        if (!text || text === "null") {

            alert("Invalid email or password");
            return;
        }

        const data = JSON.parse(text);

        localStorage.setItem("user", JSON.stringify(data));

        // ADMIN LOGIN
        if (data.role === "ADMIN") {

            window.location.href = "admin.html";

        } else {

            window.location.href = "dashboard.html";
        }

    })
    .catch(error => {

        console.log("ERROR:", error);

        alert("Server error");
    });

    return false;
}



// ================= REGISTER =================

function registerUser() {

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password
        })
    })
    .then(response => response.text())
    .then(message => {

        alert(message);

        if (message.includes("successfully")) {

            window.location.href = "login.html";
        }

    })
    .catch(error => {

        console.log(error);

        alert("Registration failed");
    });

    return false;
}



// ================= SUBMIT COMPLAINT =================

function submitComplaint() {

    const category = document.getElementById("category").value;
    const description = document.getElementById("complaint").value;

    const user = JSON.parse(localStorage.getItem("user"));

    fetch("/complaint", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            category: category,
            description: description,
            userId: user.id
        })
    })
    .then(response => response.text())
    .then(message => {

        alert(message);

        document.getElementById("category").value = "";
        document.getElementById("complaint").value = "";

        displayComplaints();

    })
    .catch(error => {

        console.log(error);

        alert("Complaint submission failed");
    });

    return false;
}



// ================= DISPLAY USER COMPLAINTS =================

function displayComplaints() {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) return;

    fetch("/complaints/" + user.id)
    .then(response => response.json())
    .then(data => {

        const container = document.getElementById("complaintList");

        if (!container) return;

        container.innerHTML = "";

        if (data.length === 0) {

            container.innerHTML = "<p>No complaints found</p>";

            return;
        }

        data.forEach(c => {

            const div = document.createElement("div");

            div.className = "complaint-card";

            div.innerHTML = `
                <h3>${c.category}</h3>
                <p>${c.description}</p>
                <small>Status: ${c.status}</small>
                <hr>
            `;

            container.appendChild(div);

        });

    })
    .catch(error => {

        console.log(error);

    });
}



// ================= ADMIN VIEW ALL COMPLAINTS =================

function loadAllComplaints() {

    fetch("/allComplaints")
    .then(response => response.json())
    .then(data => {

        console.log(data);

        const container = document.getElementById("complaintList");

        if (!container) return;

        container.innerHTML = "";

        if (data.length === 0) {

            container.innerHTML = "<p>No complaints found</p>";

            return;
        }

        data.forEach(c => {

            const div = document.createElement("div");

            div.className = "complaint-card";

            div.innerHTML = `
                <h3>${c.category}</h3>

                <p>${c.description}</p>

                <p>
                    <strong>Status:</strong> ${c.status}
                </p>

                <button onclick="updateComplaint(${c.id})">
                    Resolve
                </button>

                <button onclick="deleteComplaint(${c.id})">
                    Delete
                </button>

                <hr>
            `;

            container.appendChild(div);

        });

    })
    .catch(error => {

        console.log(error);

    });
}



// ================= UPDATE STATUS =================

function updateComplaint(id) {

    fetch(`/updateStatus/${id}?status=RESOLVED`, {
        method: "PUT"
    })
    .then(response => response.text())
    .then(message => {

        alert(message);

        loadAllComplaints();

    })
    .catch(error => {

        console.log(error);

    });
}



// ================= DELETE COMPLAINT =================

function deleteComplaint(id) {

    fetch(`/deleteComplaint/${id}`, {
        method: "DELETE"
    })
    .then(response => response.text())
    .then(message => {

        alert(message);

        loadAllComplaints();

    })
    .catch(error => {

        console.log(error);

    });
}



// ================= LOGOUT =================

function logoutUser() {

    localStorage.removeItem("user");

    window.location.href = "login.html";
}