

(async function () {
    let params = new URLSearchParams(document.location.search);
    let id = params.get("id")
    console.log(id)
    fetch(`/api/newsletter/${id}`)
        .then(response => {
            if (!response.ok) {
                var article = document.getElementById("issue-article");
                var missing = document.getElementById("issue-missing");
                article.hidden = true;
                missing.hidden = false;
                console.log("not ok")
                throw new Error("Network response was not ok!")
            }
            return response.json()
        })
        .then(data => {
            console.log(data)
            renderIssue(data.issue[0])
        })
})()

function formatDate(date) {
    return new Date(date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}

function renderIssue(issue) {
    document.title = `${issue.title} — Jet NTNU`;

    document.getElementById("issue-eyebrow").textContent =
        "Jet NTNU Newsletter";

    document.getElementById("issue-title").textContent =
        issue.title;

    document.getElementById("issue-lead").textContent =
        issue.description;

    document.getElementById("issue-author").textContent =
        issue.author;

    document.getElementById("issue-date").textContent =
        formatDate(issue.publishDate);

    renderEditorContent(issue.content);
}

function renderEditorContent(content) {
    const container = document.getElementById("issue-body");

    container.innerHTML = "";

    if (!content || !Array.isArray(content.blocks)) {
        return;
    }

    content.blocks.forEach((block) => {
        let element;

        switch (block.type) {
            case "paragraph": {
                element = document.createElement("p");
                element.innerHTML = block.data.text;
                break;
            }

            case "header": {
                const level = block.data.level || 2;

                element = document.createElement(`h${level}`);
                element.innerHTML = block.data.text;
                break;
            }

            case "quote": {
                element = document.createElement("blockquote");

                const quote = document.createElement("p");
                quote.innerHTML = block.data.text;

                element.appendChild(quote);

                if (block.data.caption) {
                    const caption = document.createElement("cite");
                    caption.textContent = block.data.caption;

                    element.appendChild(caption);
                }

                break;
            }

            case "image": {
                element = document.createElement("figure");

                const image = document.createElement("img");

                image.src = block.data.file.url;
                image.alt = block.data.caption || "";
                image.loading = "lazy";

                element.appendChild(image);

                if (block.data.caption) {
                    const caption = document.createElement("figcaption");
                    caption.textContent = block.data.caption;

                    element.appendChild(caption);
                }

                break;
            }

            case "delimiter": {
                element = document.createElement("hr");
                break;
            }

            case "list": {
                element = renderEditorList(block.data);
                break;
            }

            default: {
                console.warn("Unknown Editor.js block:", block.type);
                return;
            }
        }

        container.appendChild(element);
    });
}

function renderEditorList(data) {
    const list = document.createElement(
        data.style === "ordered" ? "ol" : "ul"
    );

    function addItems(parent, items) {
        items.forEach((item) => {
            const li = document.createElement("li");

            // Støtter både gammel og ny Editor.js List-struktur
            if (typeof item === "string") {
                li.innerHTML = item;
            } else {
                li.innerHTML = item.content || "";

                if (item.items && item.items.length > 0) {
                    const nested = document.createElement(
                        data.style === "ordered" ? "ol" : "ul"
                    );

                    addItems(nested, item.items);

                    li.appendChild(nested);
                }
            }

            parent.appendChild(li);
        });
    }

    addItems(list, data.items || []);

    return list;
}