(function () {
  "use strict";

  var SESSION_KEY = "jetntnu.session";
  try {
    if (!localStorage.getItem(SESSION_KEY)) {
      window.location.replace("./login.html");
      return;
    }
  } catch (e) {
    /* storage unavailable */
  }

  var KEYS = {
    employees: "jetntnu.employees",
    newsletters: "jetntnu.newsletters",
    admins: "jetntnu.admins",
  };

  function load(key) {
    try {
      var raw = localStorage.getItem(key);
      var parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  function save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      /* storage unavailable */
    }
  }

  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function el(id) {
    return document.getElementById(id);
  }

  function esc(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  var toastTimer;
  function toast(msg) {
    var t = el("toast");
    t.textContent = msg;
    t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      t.hidden = true;
    }, 2200);
  }

  document.getElementById("logout").addEventListener("click", function () {
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch (e) {
      /* storage unavailable */
    }
    window.location.replace("./login.html");
  });

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

  /* ---------------- employees ---------------- */
  var employees = load(KEYS.employees);
  var empForm = el("employee-form");
  var empSearch = el("emp-search");

  function renderEmployees() {
    var q = empSearch.value.trim().toLowerCase();
    var list = employees.filter(function (p) {
      if (!q) return true;
      return (p.name + " " + p.role + " " + p.team + " " + p.email).toLowerCase().indexOf(q) > -1;
    });

    el("emp-count").textContent = String(employees.length);
    el("emp-empty").hidden = list.length > 0;
    el("emp-empty").textContent = employees.length ? "No matches." : "No employees yet.";

    el("emp-list").innerHTML = list
      .map(function (p) {
        return (
          '<li class="item">' +
          '<div class="item-head"><span class="item-title">' +
          esc(p.name) +
          '</span><span class="badge">' +
          esc(p.team) +
          "</span></div>" +
          '<div class="item-meta">' +
          esc(p.role) +
          " · " +
          esc(p.email) +
          "</div>" +
          (p.bio ? '<div class="item-body">' + esc(p.bio) + "</div>" : "") +
          '<div class="item-actions">' +
          '<button class="link" data-edit-emp="' + p.id + '">Edit</button>' +
          '<button class="link danger" data-del-emp="' + p.id + '">Delete</button>' +
          "</div></li>"
        );
      })
      .join("");
  }

  function resetEmpForm() {
    empForm.reset();
    el("employee-id").value = "";
    el("emp-submit").textContent = "Add employee";
    el("emp-cancel").hidden = true;
    el("emp-error").hidden = true;
  }

  empForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = el("emp-name").value.trim();
    var role = el("emp-role").value.trim();
    var email = el("emp-email").value.trim();
    var err = el("emp-error");

    if (!name || !role || !email) {
      err.textContent = "Name, role and email are required.";
      err.hidden = false;
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      err.textContent = "Please enter a valid email address.";
      err.hidden = false;
      return;
    }

    var id = el("employee-id").value;
    var data = {
      id: id || uid(),
      name: name,
      role: role,
      team: el("emp-team").value,
      email: email,
      bio: el("emp-bio").value.trim(),
    };

    if (id) {
      employees = employees.map(function (p) {
        return p.id === id ? data : p;
      });
      toast("Employee updated");
    } else {
      employees.unshift(data);
      toast("Employee added");
    }

    save(KEYS.employees, employees);
    resetEmpForm();
    renderEmployees();
  });

  el("emp-cancel").addEventListener("click", resetEmpForm);
  empSearch.addEventListener("input", renderEmployees);

  el("emp-list").addEventListener("click", function (e) {
    var editId = e.target.dataset ? e.target.dataset.editEmp : null;
    var delId = e.target.dataset ? e.target.dataset.delEmp : null;

    if (editId) {
      var p = employees.find(function (x) {
        return x.id === editId;
      });
      if (!p) return;
      el("employee-id").value = p.id;
      el("emp-name").value = p.name;
      el("emp-role").value = p.role;
      el("emp-team").value = p.team;
      el("emp-email").value = p.email;
      el("emp-bio").value = p.bio || "";
      el("emp-submit").textContent = "Save changes";
      el("emp-cancel").hidden = false;
      el("emp-name").focus();
    }

    if (delId && confirm("Delete this employee?")) {
      employees = employees.filter(function (x) {
        return x.id !== delId;
      });
      save(KEYS.employees, employees);
      if (el("employee-id").value === delId) resetEmpForm();
      renderEmployees();
      toast("Employee deleted");
    }
  });

  /* ---------------- newsletters ---------------- */
  var newsletters = load(KEYS.newsletters);
  var newsForm = el("news-form");
  var newsSearch = el("news-search");

  function renderNewsletters() {
    var q = newsSearch.value.trim().toLowerCase();
    var list = newsletters.filter(function (n) {
      if (!q) return true;
      return (n.title + " " + n.author + " " + n.category + " " + n.description + " " + n.body)
        .toLowerCase()
        .indexOf(q) > -1;
    });

    el("news-count").textContent = String(newsletters.length);
    el("news-empty").hidden = list.length > 0;
    el("news-empty").textContent = newsletters.length ? "No matches." : "No newsletters yet.";

    el("news-list").innerHTML = list
      .map(function (n) {
        var summary = n.description || n.body;
        var preview = summary.length > 180 ? summary.slice(0, 180) + "…" : summary;
        return (
          '<li class="item' + (n.status === "published" ? "" : " draft") + '">' +
          '<div class="item-head"><span class="item-title">' +
          esc(n.title) +
          '</span><span class="badge ' +
          (n.status === "published" ? "published" : "") +
          '">' +
          esc(n.status) +
          "</span></div>" +
          '<div class="item-meta">' +
          esc(n.category || "general") +
          " · " +
          esc(n.author || "Unknown author") +
          (n.date ? " · " + esc(n.date) : "") +
          "</div>" +
          '<div class="item-body">' +
          esc(preview) +
          "</div>" +
          '<div class="item-actions">' +
          '<button class="link" data-edit-news="' + n.id + '">Edit</button>' +
          (n.status === "published"
            ? '<a class="link" target="_blank" rel="noopener" href="/newsletter-issue.html?id=' +
              encodeURIComponent(n.id) + '">View</a>'
            : "") +
          (n.status === "published"
            ? '<button class="link" data-unpub-news="' + n.id + '">Unpublish</button>'
            : '<button class="link" data-pub-news="' + n.id + '">Publish</button>') +
          '<button class="link danger" data-del-news="' + n.id + '">Delete</button>' +
          "</div></li>"
        );
      })
      .join("");
  }

  function resetNewsForm() {
    newsForm.reset();
    el("news-id").value = "";
    el("news-cancel").hidden = true;
    el("news-error").hidden = true;
  }

  function submitNewsletter(status) {
    var title = el("news-title").value.trim();
    var body = el("news-body").value.trim();
    var err = el("news-error");

    if (!title || !body) {
      err.textContent = "Title and body are required.";
      err.hidden = false;
      return;
    }
    err.hidden = true;

    var id = el("news-id").value;
    var data = {
      id: id || uid(),
      title: title,
      category: el("news-category").value,
      description: el("news-description").value.trim(),
      author: el("news-author").value.trim(),
      date: el("news-date").value,
      body: body,
      status: status,
    };

    if (id) {
      newsletters = newsletters.map(function (n) {
        return n.id === id ? data : n;
      });
    } else {
      newsletters.unshift(data);
    }

    save(KEYS.newsletters, newsletters);
    resetNewsForm();
    renderNewsletters();
    toast(status === "published" ? "Newsletter published" : "Draft saved");
  }

  newsForm.addEventListener("submit", function (e) {
    e.preventDefault();
    submitNewsletter("draft");
  });

  el("news-publish").addEventListener("click", function () {
    submitNewsletter("published");
  });

  el("news-cancel").addEventListener("click", resetNewsForm);
  newsSearch.addEventListener("input", renderNewsletters);

  el("news-list").addEventListener("click", function (e) {
    var d = e.target.dataset;
    if (!d || e.target.tagName === "A") return;

    if (d.editNews) {
      var n = newsletters.find(function (x) {
        return x.id === d.editNews;
      });
      if (!n) return;
      el("news-id").value = n.id;
      el("news-title").value = n.title;
      el("news-category").value = n.category || "general";
      el("news-description").value = n.description || "";
      el("news-author").value = n.author || "";
      el("news-date").value = n.date || "";
      el("news-body").value = n.body;
      el("news-cancel").hidden = false;
      el("news-title").focus();
    }

    if (d.pubNews || d.unpubNews) {
      var targetId = d.pubNews || d.unpubNews;
      var next = d.pubNews ? "published" : "draft";
      newsletters = newsletters.map(function (x) {
        return x.id === targetId ? Object.assign({}, x, { status: next }) : x;
      });
      save(KEYS.newsletters, newsletters);
      renderNewsletters();
      toast(next === "published" ? "Newsletter published" : "Moved back to draft");
    }

    if (d.delNews && confirm("Delete this newsletter?")) {
      newsletters = newsletters.filter(function (x) {
        return x.id !== d.delNews;
      });
      save(KEYS.newsletters, newsletters);
      if (el("news-id").value === d.delNews) resetNewsForm();
      renderNewsletters();
      toast("Newsletter deleted");
    }
  });

  /* ---------------- admin users ---------------- */
  var admins = load(KEYS.admins);
  var admForm = el("admin-form");

  function renderAdmins() {
    el("adm-count").textContent = String(admins.length);
    el("adm-empty").hidden = admins.length > 0;

    el("adm-list").innerHTML = admins
      .map(function (a) {
        return (
          '<li class="item">' +
          '<div class="item-head"><span class="item-title">' +
          esc(a.user) +
          '</span><span class="badge">admin</span></div>' +
          '<div class="item-meta">' +
          esc(a.name || "No name") +
          "</div>" +
          '<div class="item-actions">' +
          '<button class="link danger" data-del-adm="' + a.id + '">Delete</button>' +
          "</div></li>"
        );
      })
      .join("");
  }

  admForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var user = el("adm-user").value.trim().toLowerCase();
    var pass = el("adm-pass").value;
    var pass2 = el("adm-pass2").value;
    var err = el("adm-error");

    function fail(msg) {
      err.textContent = msg;
      err.hidden = false;
    }

    if (!user || !pass) return fail("Username and password are required.");
    if (!/^[a-z0-9._-]{3,32}$/.test(user))
      return fail("Username must be 3–32 characters: letters, numbers, dot, dash or underscore.");
    if (pass.length < 8) return fail("Password must be at least 8 characters.");
    if (pass !== pass2) return fail("The two passwords do not match.");
    if (user === "admin" || admins.some(function (a) { return a.user === user; }))
      return fail("That username is already taken.");

    err.hidden = true;
    admins.unshift({
      id: uid(),
      user: user,
      name: el("adm-name").value.trim(),
      pass: pass,
      createdAt: Date.now(),
    });
    save(KEYS.admins, admins);
    admForm.reset();
    renderAdmins();
    toast("Admin created");
  });

  el("adm-list").addEventListener("click", function (e) {
    var delId = e.target.dataset ? e.target.dataset.delAdm : null;
    if (delId && confirm("Delete this admin user?")) {
      admins = admins.filter(function (a) {
        return a.id !== delId;
      });
      save(KEYS.admins, admins);
      renderAdmins();
      toast("Admin deleted");
    }
  });

  renderEmployees();
  renderNewsletters();
  renderAdmins();
})();
