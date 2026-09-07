(function () {
  "use strict";

  var SESSION_KEY = "jetntnu.session";
  var ADMINS_KEY = "jetntnu.admins";
  var USERS = [{ user: "admin", pass: "jetntnu2026" }];

  function storedUsers() {
    try {
      var raw = localStorage.getItem(ADMINS_KEY);
      var parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  function el(id) {
    return document.getElementById(id);
  }

  try {
    if (localStorage.getItem(SESSION_KEY)) {
      window.location.replace("./index.html");
      return;
    }
  } catch (e) {
    /* storage unavailable */
  }

  el("login-form").addEventListener("submit", function (e) {
    e.preventDefault();
    var user = el("login-user").value.trim().toLowerCase();
    var pass = el("login-pass").value;
    var ok = USERS.concat(storedUsers()).some(function (u) {
      return u.user === user && u.pass === pass;
    });

    if (!ok) {
      el("login-error").hidden = false;
      el("login-pass").value = "";
      el("login-pass").focus();
      return;
    }

    el("login-error").hidden = true;
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify({ user: user, at: Date.now() }));
    } catch (err) {
      /* storage unavailable */
    }
    window.location.replace("./index.html");
  });
})();
