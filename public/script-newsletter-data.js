/* Shared newsletter data layer — reads issues written by the admin panel,
   falling back to the built-in sample dispatches. Vanilla JS, no deps. */
(function (global) {
  "use strict";

  var STORE_KEY = "jetntnu.newsletters";

  var DEFAULT_ISSUES = [
    {
      id: "sample-04",
      title: "First ignition — the combustor lives",
      category: "testing",
      description:
        "Stable flame for 42 seconds in the test cell. Fuel scheduling, failed attempts, and the road to spool-up.",
      author: "Test team",
      date: "2026-08-12",
      body:
        "After three redesigns of the flame tube and a long night in the test cell, Jotun's combustor held a stable flame for 42 seconds.\n\nThe first two attempts blew out within a second of light-off. The fuel schedule was too aggressive: we were commanding full flow before the swirler had established recirculation. Ramping the pump over four seconds instead of one changed everything.\n\nNext up is coupling the combustor to the turbine stage and pushing toward full spool-up. Before that we re-instrument the liner with two more thermocouples, because the outer wall ran hotter than the model predicted.",
    },
    {
      id: "sample-03",
      title: "Compressor map, take two",
      category: "propulsion",
      description:
        "Why our first blade profile stalled at 60% N1, and the re-stagger that bought us back 11 points of efficiency.",
      author: "Propulsion group",
      date: "2026-06-03",
      body:
        "Our first compressor design looked fine on paper and stalled hard on the rig at 60% corrected speed.\n\nThe root cause was incidence: at part speed the relative flow angle at the leading edge was far off design, and the suction side separated across most of the span. Re-staggering the blade row by four degrees and thinning the leading edge moved the stall line well clear of the operating line.\n\nThe rebuilt map shows an 11 point efficiency gain at the design point, and — more importantly — a surge margin we can actually accelerate through.",
    },
    {
      id: "sample-02",
      title: "Machining the turbine disc",
      category: "structures",
      description:
        "Five-axis, Inconel, and a 0.02 mm tolerance. Inside the longest single operation we have run so far.",
      author: "Structures group",
      date: "2026-04-18",
      body:
        "Fourteen hours of continuous five-axis machining in Inconel 718, held to two hundredths of a millimetre on the blade root fits.\n\nTooling was the hard part. Inconel work-hardens the moment a cutter rubs instead of cuts, so every pass had to keep chip load up and speed down. We went through six end mills and learned to listen for the change in tone that means the edge is going.\n\nThe finished disc is now balanced and waiting on the shaft assembly.",
    },
    {
      id: "sample-01",
      title: "Why we chose a turbojet",
      category: "propulsion",
      description:
        "The founding issue: project goals, the Jotun concept, and why simplicity beats specific thrust for a first engine.",
      author: "Jet NTNU",
      date: "2026-02-05",
      body:
        "A turbofan would be more efficient. A rocket would be simpler still. We chose a single-spool turbojet because it is the smallest complete gas turbine you can build and still learn everything that matters.\n\nOne shaft, one compressor, one combustor, one turbine. Every subsystem is visible, testable and small enough for a student team to own end to end.\n\nJotun is the result: a target of 200 N of thrust, built in Trondheim, by students, from scratch.",
    },
  ];

  function readStored() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      var parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  function normalize(n) {
    return {
      id: String(n.id),
      title: n.title || "Untitled",
      category: (n.category || "general").toLowerCase(),
      description: n.description || "",
      author: n.author || "Jet NTNU",
      date: n.date || "",
      body: n.body || "",
    };
  }

  /* All published issues, newest first, numbered oldest = No. 01 */
  function getIssues() {
    var stored = readStored()
      .filter(function (n) {
        return n.status === "published";
      })
      .map(normalize);

    var all = stored.concat(DEFAULT_ISSUES.map(normalize));

    all.sort(function (a, b) {
      return (b.date || "").localeCompare(a.date || "");
    });

    var total = all.length;
    return all.map(function (issue, i) {
      issue.number = String(total - i).padStart(2, "0");
      return issue;
    });
  }

  function getIssue(id) {
    var match = null;
    getIssues().forEach(function (i) {
      if (i.id === String(id)) match = i;
    });
    return match;
  }

  function formatDate(iso) {
    if (!iso) return "";
    var d = new Date(iso + "T00:00:00");
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleDateString("en-GB", { month: "short", year: "numeric" });
  }

  function escapeHtml(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  global.JetNewsletters = {
    getIssues: getIssues,
    getIssue: getIssue,
    formatDate: formatDate,
    escapeHtml: escapeHtml,
  };
})(window);
