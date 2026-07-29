(function () {
    const searchInput = document.getElementById('search-input');
    const snippets = Array.from(document.querySelectorAll('.snippet'));
    const noResults = document.getElementById('no-results');

    function updateLastUpdated() {
        const el = document.getElementById('last-updated');
        if (!el) return;
        const now = new Date();
        el.textContent = now.toISOString().slice(0, 10); // YYYY-MM-DD
    }

    function filterSnippets() {
        const query = searchInput.value.trim().toLowerCase();

        let visibleCount = 0;

        snippets.forEach(snippet => {
            const text = (snippet.dataset.text || "").toLowerCase();
            const tags = (snippet.dataset.tags || "").toLowerCase();
            const category = (snippet.dataset.category || "").toLowerCase();
            const fullText = [
                snippet.innerText.toLowerCase(),
                text,
                tags,
                category
            ].join(" ");

            const matches = query === "" || fullText.includes(query);

            snippet.style.display = matches ? "" : "none";

            if (matches) visibleCount++;
        });

        noResults.style.display = visibleCount === 0 ? "block" : "none";
    }

    searchInput.addEventListener('input', filterSnippets);

    // Initialize
    updateLastUpdated();
    filterSnippets();
})();
