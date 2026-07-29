(function () {
    const searchInput = document.getElementById('search-input');
    const snippets = Array.from(document.querySelectorAll('.snippet'));
    const noResults = document.getElementById('no-results');
    const meta = document.getElementById('meta');

    const DEFAULT_META = 'Type to filter snippets. Matching is case-insensitive.';

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

        // Update the meta live region with result count when actively filtering
        if (query === "") {
            meta.textContent = DEFAULT_META;
        } else {
            meta.textContent = visibleCount === 0
                ? 'No snippets match your search.'
                : visibleCount === 1
                    ? '1 snippet matches your search.'
                    : visibleCount + ' snippets match your search.';
        }
    }

    // Inject a Copy button into every .snippet pre element
    function addCopyButtons() {
        document.querySelectorAll('.snippet pre').forEach(pre => {
            // Wrap pre in a relative-positioned div so the button can be
            // positioned absolute without affecting the snippet layout
            const wrapper = document.createElement('div');
            wrapper.className = 'code-block';
            pre.parentNode.insertBefore(wrapper, pre);
            wrapper.appendChild(pre);

            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'copy-btn';
            btn.textContent = 'Copy';
            btn.setAttribute('aria-label', 'Copy code to clipboard');
            wrapper.appendChild(btn);

            btn.addEventListener('click', function () {
                const code = pre.textContent;

                function onSuccess() {
                    btn.textContent = 'Copied!';
                    btn.classList.add('copied');
                    btn.setAttribute('aria-label', 'Code copied to clipboard');
                    setTimeout(function () {
                        btn.textContent = 'Copy';
                        btn.classList.remove('copied');
                        btn.setAttribute('aria-label', 'Copy code to clipboard');
                    }, 2000);
                }

                if (navigator.clipboard && window.isSecureContext) {
                    navigator.clipboard.writeText(code).then(onSuccess).catch(function () {
                        fallbackCopy(code, onSuccess);
                    });
                } else {
                    fallbackCopy(code, onSuccess);
                }
            });
        });
    }

    // execCommand fallback for environments without Clipboard API
    function fallbackCopy(text, callback) {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        try {
            document.execCommand('copy');
            callback();
        } catch (e) {
            // Show a brief error message when copy is unavailable
            const errDiv = document.createElement('div');
            errDiv.textContent = 'Copy unavailable — please select and copy manually.';
            errDiv.style.cssText = 'position:fixed;bottom:1rem;left:50%;transform:translateX(-50%);background:#fff3cd;border:1px solid #ffc107;border-radius:6px;padding:0.5rem 1rem;font-size:0.85rem;z-index:9999;box-shadow:0 2px 8px rgba(0,0,0,0.15)';
            document.body.appendChild(errDiv);
            setTimeout(function () { document.body.removeChild(errDiv); }, 3000);
        }
        document.body.removeChild(ta);
    }

    searchInput.addEventListener('input', filterSnippets);

    // Initialize
    updateLastUpdated();
    addCopyButtons();
    filterSnippets();
})();
