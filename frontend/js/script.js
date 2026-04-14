// Login Function
function loginUser() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    if (email !== "" && password !== "") {
        window.location.href = "dashboard.html";
    } else {
        alert("Please enter valid details");
    }

    return false;
}


// Complaint Submission Function
function submitComplaint() {
    var category = document.getElementById("category").value;
    var complaint = document.getElementById("complaint").value;

    if (category === "" || complaint === "") {
        alert("Please fill all fields");
    } else {
        alert("Complaint submitted successfully!");
    }

    return false;
}