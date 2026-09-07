(function () {
  "use strict";

  var data = window.JetNewsletters;

  /* Subscribe form — front-end only, no backend wired up yet */
  var form = document.getElementById("subscribe-form");
  var note = document.getElementById("form-note");
  var DEFAULT_NOTE = note.textContent;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var email = document.getElementById("sub-email").value.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      note.textContent = "Please enter a valid email address.";
      note.className = "form-note error";
      return;
    }

    note.textContent = "Thank you — you are on the list. First dispatch lands next month.";
    note.className = "form-note success";
    form.reset();

    setTimeout(function () {
      note.textContent = DEFAULT_NOTE;
      note.className = "form-note";
    }, 6000);
  });

  /* ---------- render issues ---------- */
  var issues = data.getIssues();
  var esc = data.escapeHtml;
  var list = document.getElementById("issue-list");
  var emptyMsg = document.getElementById("archive-empty");

  function issueUrl(issue) {
    return "/newsletter-issue.html?id=" + encodeURIComponent(issue.id);
  }

  list.innerHTML = issues
    .map(function (issue) {
      return (
        '<li class="issue" data-topic="' + esc(issue.category) + '">' +
        '<span class="issue-no">No. ' + esc(issue.number) + "</span>" +
        '<div class="issue-main">' +
        "<h3><a href=\"" + issueUrl(issue) + '">' + esc(issue.title) + "</a></h3>" +
        "<p>" + esc(issue.description) + "</p>" +
        "</div>" +
        '<span class="issue-meta">' +
        esc(issue.category) +
        (issue.date ? " · " + esc(data.formatDate(issue.date)) : "") +
        "</span>" +
        '<a class="issue-link" href="' + issueUrl(issue) + '" aria-label="Read ' + esc(issue.title) + '">→</a>' +
        "</li>"
      );
    })
    .join("");

  /* whole row is clickable */
  list.addEventListener("click", function (e) {
    if (e.target.closest("a")) return;
    var row = e.target.closest(".issue");
    if (!row) return;
    var link = row.querySelector(".issue-link");
    if (link) window.location.href = link.getAttribute("href");
  });

  /* ---------- featured (latest issue) ---------- */
  var latest = issues[0];
  if (latest) {
    var f = document.getElementById("featured");
    if (f) {
      f.querySelector(".featured-eyebrow").textContent = "Latest issue · No. " + latest.number;
      f.querySelector("h2").textContent = latest.title;
      f.querySelector(".featured-copy").textContent = latest.description || latest.body.slice(0, 220);
      var fl = f.querySelector(".text-link");
      fl.setAttribute("href", issueUrl(latest));
      fl.innerHTML = "Read issue " + esc(latest.number) + ' <span aria-hidden="true">→</span>';
    }
  }

  /* ---------- archive filters ---------- */
  var filters = document.querySelectorAll(".filter");

  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filters.forEach(function (b) {
        b.classList.toggle("is-active", b === btn);
      });
      var topic = btn.dataset.filter;
      var visible = 0;

      document.querySelectorAll(".issue").forEach(function (issue) {
        var show = topic === "all" || issue.dataset.topic === topic;
        issue.classList.toggle("is-hidden", !show);
        if (show) visible += 1;
      });

      emptyMsg.hidden = visible > 0;
    });
  });
})();
