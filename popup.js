// When the popup loads, restore saved input field values
document.addEventListener('DOMContentLoaded', function() {
    // Restore saved values
    chrome.storage.local.get(['link', 'title', 'description', 'image', 'domain'], function(result) {
        document.getElementById('link').value = result.link || '';
        document.getElementById('title').value = result.title || '';
        document.getElementById('description').value = result.description || '';
        document.getElementById('image').value = result.image || '';
        document.getElementById('domain').value = result.domain || '';
    });

    // Add event listeners to save input fields when they change
    ['link', 'title', 'description', 'image', 'domain'].forEach(function(id) {
        document.getElementById(id).addEventListener('input', function() {
            let data = {};
            data[id] = this.value;
            chrome.storage.local.set(data);
        });
    });

    document.getElementById('fillFields').addEventListener('click', fillFields);
    document.getElementById('copyClipboard').addEventListener('click', copyToClipboard);
    document.getElementById('clearFields').addEventListener('click', clearFields);
});

function fillFields() {
    // Get the current active tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        let tab = tabs[0];

        // Inject script into the current tab to extract meta tags
        chrome.scripting.executeScript({
            target: {tabId: tab.id},
            func: getMetaTags,
        }, function(results) {
            if (results && results[0] && results[0].result) {
                let data = results[0].result;
                document.getElementById('link').value = data.link || '';
                document.getElementById('title').value = data.title || '';
                document.getElementById('description').value = data.description || '';
                document.getElementById('image').value = data.image || '';
                document.getElementById('domain').value = data.domain || '';

                // Save the new values to storage
                chrome.storage.local.set({
                    link: data.link || '',
                    title: data.title || '',
                    description: data.description || '',
                    image: data.image || '',
                    domain: data.domain || ''
                });
            }
        });
    });
}
function copyToClipboard() {
    // Retrieve values from input fields
    let link = document.getElementById('link').value;
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let image = document.getElementById('image').value;
    let domain = document.getElementById('domain').value;

    // Fetch the external HTML snippet
    fetch(chrome.runtime.getURL('snippet.html'))
        .then(response => response.text())
        .then(snippet => {
            // Replace placeholders with actual values
            snippet = snippet.replace(/\$\{link\}/g, link)
                             .replace(/\$\{title\}/g, title)
                             .replace(/\$\{description\}/g, description)
                             .replace(/\$\{image\}/g, image)
                             .replace(/\$\{domain\}/g, domain);

            // Copy the snippet to the clipboard
            navigator.clipboard.writeText(snippet).then(function() {
                alert('Snippet copied to clipboard!');
                // Clear fields and storage after successful copy
                clearFields();
            }, function(err) {
                console.error('Could not copy text: ', err);
            });
        })
        .catch(error => {
            console.error('Error fetching snippet:', error);
        });
}

// Function to extract meta tags from the current page
function getMetaTags() {
    let link = window.location.href;
    let title = document.querySelector('meta[property="og:title"]')?.content ||
                document.querySelector('meta[name="twitter:title"]')?.content ||
                document.title || '';
    let description = document.querySelector('meta[property="og:description"]')?.content ||
                      document.querySelector('meta[name="description"]')?.content || '';
    let image = document.querySelector('meta[property="og:image"]')?.content ||
                document.querySelector('meta[name="twitter:image"]')?.content || '';
    let domain = window.location.hostname;

    return { link, title, description, image, domain };
}

function clearFields() {
    // Clear the input fields
    ['link', 'title', 'description', 'image', 'domain'].forEach(function(id) {
        document.getElementById(id).value = '';
    });
    // Clear the stored data
    chrome.storage.local.clear();
}
