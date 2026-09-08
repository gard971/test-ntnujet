(function () {
    fetch("/api/employees")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            data.employees.forEach((employee) => {
                const employeeList = document.getElementById("emp-list");
                const listItem = document.createElement("li");
                listItem.textContent = `${employee.name} - ${employee.position} (${employee.department})`;
                employeeList.appendChild(listItem);
            });
        })
        .catch((error) => {
            console.error("Error retrieving employees:", error);
        });
})();



document.getElementById("employee-form").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission behavior
  fetch("/api/admin/employee", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fullname: document.getElementById("emp-name").value,
      role: document.getElementById("emp-role").value,
      team: document.getElementById("emp-team").value,
      email: document.getElementById("emp-email").value,
      shortBio: document.getElementById("emp-bio").value
    })
    
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Employee added:", data);
      // Clear the form
      document.getElementById("employee-form").reset();
    })
    .catch((error) => {
      console.error("Error adding employee:", error);
    });
});