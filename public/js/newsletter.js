(async function () {
    "use strict";

    const list = document.getElementById("issue-list");
    const emptyMsg = document.getElementById("archive-empty");

    function issueUrl(issue) {
        return `/newsletter-issue?id=${issue.id}`;
    }

    function formatDate(date) {
        return new Date(date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    }

    try {
        const response = await fetch("/api/newsletters");

        if (!response.ok) {
            throw new Error("Could not load newsletters");
        }

        const data = await response.json();
        const issues = data.issues;

        list.innerHTML = issues
            .map((issue, index) => {
                return `
                    <li class="issue" data-topic="all">
                        <span class="issue-no">
                            No. ${String(index + 1).padStart(2, "0")}
                        </span>

                        <div class="issue-main">
                            <h3>
                                <a href="${issueUrl(issue)}">
                                    ${issue.title}
                                </a>
                            </h3>

                            <p>${issue.description}</p>
                        </div>

                        <span class="issue-meta">
                            ${issue.publishDate ? formatDate(issue.publishDate) : ""}
                        </span>

                        <a
                            class="issue-link"
                            href="${issueUrl(issue)}"
                            aria-label="Read ${issue.title}"
                        >
                            →
                        </a>
                    </li>
                `;
            })
            .join("");

        list.addEventListener("click", (e) => {
            if (e.target.closest("a")) return;

            const row = e.target.closest(".issue");

            if (!row) return;

            const link = row.querySelector(".issue-link");

            if (link) {
                window.location.href = link.getAttribute("href");
            }
        });

        const latest = issues[0];

        if (latest) {
            const featured = document.getElementById("featured");

            if (featured) {
                featured.querySelector(".featured-eyebrow").textContent =
                    `Latest issue · No. 01`;

                featured.querySelector("h2").textContent =
                    latest.title;

                featured.querySelector(".featured-copy").textContent =
                    latest.description;

                const link = featured.querySelector(".text-link");

                link.href = issueUrl(latest);

                link.innerHTML = `
                    Read issue 01
                    <span aria-hidden="true">→</span>
                `;
            }
        }

    } catch (error) {
        console.error(error);

        emptyMsg.hidden = false;
        emptyMsg.textContent = "Could not load issues.";
    }
})();