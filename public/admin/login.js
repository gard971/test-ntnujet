document.getElementById("login-form").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission behavior
  fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: document.getElementById("login-user").value,
      password: document.getElementById("login-pass").value
    })
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Login successful:", data);
      // Redirect to the admin page or perform any other action upon successful login
      window.location.href = "/admin";
    })
    .catch((error) => {
      console.error("Error during login:", error);
      // Display an error message to the user
      document.getElementById("login-error").hidden = false;
    });
  });