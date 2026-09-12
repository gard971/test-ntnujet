let employeesCache = [];
const originalFetch = window.fetch;

window.fetch = async (...args) => {
  const response = await originalFetch(...args);

  if (response.status === 401) {
    window.location.href = "/admin/login";
  }

  return response;
};

(function () {
  fetch("/api/employees")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      employeesCache = data.employees
      if (data.employees.length > 0) {
        el("emp-empty").style.display = "none";
      } else {
        el("emp-empty").style.display = "block";
      }
      el("emp-count").textContent = data.employees.length;
      addEmployeeToList(data.employees);

    })
    .catch((error) => {
      console.error("Error retrieving employees:", error);
    });

  fetch("/api/admin/admin")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json()
        .then((data) => {
          if (data.admins.length > 0) {
            el("adm-empty").style.display = "none";
          } else {
            el("adm-empty").style.display = "block";
          }
          el("adm-count").textContent = data.admins.length;
          addAdminToList(data.admins);
        })
    })

  fetch("/api/openings")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      return response.json()
        .then((data) => {
          data.openings.forEach(opening => {
            const deptUl = el(`${opening.department}-btn`).parentElement.parentElement.parentElement.querySelector(`.dept-openings`)
            let li = document.createElement("li")
            li.classList.add("dept-opening")
            li.innerHTML = `
                <div>
                    <span class="dept-opening-title">${opening.title}</span>
                    <span class="dept-opening-meta">${opening.description}</span>
                  </div>
                  <button class="link danger" type="button" onclick="deleteOpening(${opening.id})">Remove</button>
            `
            deptUl.appendChild(li)
          })
        })

    })

  const buttons = document.getElementsByClassName("btn dept-add")
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', event => {
      event.preventDefault();
      let openingForm = event.target.parentNode.parentNode
      let formTitle = openingForm.querySelector('input').value
      let formDescription = openingForm.querySelector('textarea').value
      fetch("/api/admin/opening", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formTitle,
          description: formDescription,
          department: buttons[i].id.replace("-btn", "")
        })
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          let opening = data.opening
          const deptUl = el(`${opening.department}-btn`).parentElement.parentElement.parentElement.querySelector(`.dept-openings`)
          let li = document.createElement("li")
          li.classList.add("dept-opening")
          li.innerHTML = `
                <div>
                    <span class="dept-opening-title">${opening.title}</span>
                    <span class="dept-opening-meta">${opening.description}</span>
                  </div>
                  <button class="link danger" type="button" onclick="deleteOpening(${opening.id})">Remove</button>
            `
          deptUl.appendChild(li)
          openingForm.reset()
        })

    })
  }
})();

el("employee-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    try {
        const employeeId = el("employee-id").value;
        const isEditing = employeeId !== "";

        const formData = new FormData();

        const file = el("new-emp-pic").files[0];

        if (file) {
            formData.append("image", file);
        }

        formData.append("fullname", el("emp-name").value);
        formData.append("role", el("emp-role").value);
        formData.append("team", el("emp-team").value);
        formData.append("email", el("emp-email").value);
        formData.append("shortBio", el("emp-bio").value);
        formData.append("boardMember", el("emp-board").checked);

        const url = isEditing
            ? `/api/admin/employee/${employeeId}`
            : "/api/admin/employee";

        const method = isEditing ? "PUT" : "POST";

        const response = await fetch(url, {
            method,
            body: formData
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();

        if (isEditing) {
            // Oppdater employee i lokal cache
            employeesCache = employeesCache.map(employee =>
                String(employee.id) === String(data.employee.id)
                    ? data.employee
                    : employee
            );

            // Bygg listen på nytt
            el("emp-list").innerHTML = "";
            addEmployeeToList(employeesCache);

        } else {
            // Ny employee
            employeesCache.push(data.employee);
            addEmployeeToList([data.employee]);

            el("emp-count").textContent =
                parseInt(el("emp-count").textContent) + 1;
        }

        resetEmployeeForm();

    } catch (error) {
        console.error("Error saving employee:", error);
    }
});

el("admin-form").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission behavior
  if (el("adm-pass").value !== el("adm-pass2").value) {
    alert("Passwords do not match!");
    return;
  }
  fetch("/api/admin/admin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: el("adm-user").value,
      password: el("adm-pass").value
    })
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Admin added:", data);
      // Clear the form
      el("admin-form").reset();
      // Add the new admin to the list
      addAdminToList([data.admin]);
      el("adm-count").textContent = parseInt(el("adm-count").textContent) + 1;
    })
    .catch((error) => {
      console.error("Error adding admin:", error);
    });
});

el("logout").addEventListener("click", function () {
  fetch("/api/admin/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Logged out:", data);
      window.location.href = "/admin/login";
    })
    .catch((error) => {
      console.error("Error logging out:", error);
    });
});

function deleteEmployee(employeeId, event) {
  if (!confirm("Are you sure you want to delete this employee?")) {
    return; // Exit the function if the user cancels
  }
  fetch(`/api/admin/employee`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: employeeId })
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Employee deleted:", data);
      // Remove the employee from the list
      const li = event.target.closest("li");
      if (li) {
        li.remove();
      }
    })
    .catch((error) => {
      console.error("Error deleting employee:", error);
    });
}

function deleteAdmin(adminId, event) {
  if (!confirm("Are you sure you want to delete this admin? This action will also log them out of all sessions.")) {
    return; // Exit the function if the user cancels
  }
  fetch(`/api/admin/admin`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: adminId })
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Admin deleted:", data);
      // Remove the admin from the list
      const li = event.target.closest("li");
      if (li) {
        li.remove();
      }
      el("adm-count").textContent = parseInt(el("adm-count").textContent) - 1;
    })
    .catch((error) => {
      console.error("Error deleting admin:", error);
    });
}

function addAdminToList(admins) {
  admins.forEach((admin) => {
    let htmlString = `
    <li class="item">
              <div class="item-head">
                <span class="item-title">${admin.username}</span>
                <span class="badge">admin</span>
              </div>
              <div class="item-actions">
                <button class="link danger" data-del-adm="ghi012" onclick="deleteAdmin('${admin.id}', event)">Delete</button>
              </div>
            </li>

    `
    el("adm-list").insertAdjacentHTML("beforeend", htmlString);
  });
}

function addEmployeeToList(employees) {
  employees.forEach((employee) => {
    let htmlString = `
            <li class="item">
                <div class="item-head">
                    <span class="item-title">${employee.name}</span>
                    <span class="badge">Propulsion</span>
                 </div>
                 <div class="item-meta">${employee.department} · ${employee.email}</div>
                 <div class="item-body">${employee.shortBio}</div>
                 <div class="item-actions">
                     <button class="link" data-edit-emp="abc123" onclick="editEmployee('${employee.id}')">Edit</button>
                     <button class="link danger" data-del-emp="abc123" onclick="deleteEmployee('${employee.id}', event)">Delete</button>
                   </div>
            </li>
        `
    const employeeList = el("emp-list");
    employeeList.insertAdjacentHTML("beforeend", htmlString);
  });
}

function deleteOpening(openingID) {
  fetch("/api/admin/opening", {
    method: "DELETE",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify({ id: openingID })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok.")
      }
      return response.json()
        .then(data => {
          document.querySelector(`[onclick="deleteOpening(${openingID})"`).parentElement.remove()
        })
    })
}

function editEmployee(id) {
    const employee = employeesCache.find(
        employee => String(employee.id) === String(id)
    );

    if (!employee) {
        console.error("Employee not found:", id);
        return;
    }

    el("employee-id").value = employee.id;
    el("emp-name").value = employee.name;
    el("emp-role").value = employee.position;
    el("emp-team").value = employee.department;
    el("emp-email").value = employee.email;
    el("emp-bio").value = employee.shortBio;
    el("emp-board").checked = employee.boardMember;

    el("emp-title").textContent = "Edit employee";
    el("emp-submit").textContent = "Save changes";
    el("emp-cancel").hidden = false;  
}



el("emp-cancel").addEventListener("click", function () {
    resetEmployeeForm();
});

function resetEmployeeForm() {
    el("employee-form").reset();
    el("employee-id").value = "";

    el("emp-title").textContent = "Add employee";
    el("emp-submit").textContent = "Add employee";
    el("emp-cancel").hidden = true;
}

/* ---------------- tabs ---------------- */
el("tabs").addEventListener("click", function (e) {
  var btn = e.target.closest(".tab");
  if (!btn) return;
  var name = btn.dataset.tab;
  document.querySelectorAll(".tab").forEach(function (t) {
    t.classList.toggle("is-active", t === btn);
  });
  document.querySelectorAll(".panel").forEach(function (p) {
    p.classList.toggle("is-active", p.id === "panel-" + name);
  });
  location.hash = name;
});

if (location.hash === "#newsletters") {
  var nb = document.querySelector('.tab[data-tab="newsletters"]');
  if (nb) nb.click();
}
function el(id) {
  return document.getElementById(id);
}
