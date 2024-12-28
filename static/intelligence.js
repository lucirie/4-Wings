function getHighlightedText() {
    document.addEventListener("mouseup", () => {
        const selectedText = window.getSelection().toString().trim();
        if (selectedText) {
            // Create and submit a form to POST the data
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = '/intelligence';
    
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = 'selectedText';
            input.value = selectedText;
    
            form.appendChild(input);
            document.body.appendChild(form);
            form.submit();
        }
    });    
}

getHighlightedText();
