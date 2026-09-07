(function () {
  "use strict";

  var data = window.JetNewsletters;
  var esc = data.escapeHtml;
  var params = new URLSearchParams(window.location.search);
  var issue = data.getIssue(params.get("id") || "");

  var article = document.getElementById("issue-article");
  var missing = document.getElementById("issue-missing");

  if (!issue) {
    article.hidden = true;
    missing.hidden = false;
    return;
  }

  document.title = issue.title + " — Jet NTNU Newsletter";
  var meta = document.querySelector('meta[name="description"]');
  if (meta && issue.description) meta.setAttribute("content", issue.description);

  document.getElementById("issue-eyebrow").textContent =
    "Issue No. " + issue.number + " · " + issue.category;
  document.getElementById("issue-title").textContent = issue.title;
  document.getElementById("issue-lead").textContent = issue.description;
  document.getElementById("issue-author").textContent = issue.author;
  document.getElementById("issue-date").textContent = data.formatDate(issue.date) || "Undated";
  document.getElementById("issue-category").textContent = issue.category;

  document.getElementById("issue-body").innerHTML = issue.body
    .split(/\n\s*\n/)
    .map(function (p) {
      return "<p>" + esc(p.trim()).replace(/\n/g, "<br />") + "</p>";
    })
    .join("");

  /* more issues */
  var others = data.getIssues().filter(function (i) {
    return i.id !== issue.id;
  }).slice(0, 3);

  var moreList = document.getElementById("more-list");
  if (others.length) {
    moreList.innerHTML = others
      .map(function (i) {
        return (
          '<li><a href="/newsletter-issue.html?id=' + encodeURIComponent(i.id) + '">' +
          '<span class="issue-no">No. ' + esc(i.number) + "</span>" +
          "<h3>" + esc(i.title) + "</h3>" +
          '<span class="issue-meta">' + esc(i.category) + " · " + esc(data.formatDate(i.date)) + "</span>" +
          "</a></li>"
        );
      })
      .join("");
  } else {
    document.getElementById("issue-more").hidden = true;
  }
})();
