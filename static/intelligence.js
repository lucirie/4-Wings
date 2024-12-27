function getHighlightedText() {
    document.addEventListener("mouseup", async () => {
        const selectedText = window.getSelection().toString().trim();
        if (selectedText) {
            try {
                const response = await fetch('/intelligence', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ selectedText: selectedText }), // Properly serialize the string
                });

                if (response.ok) {
                    const data = await response.json(); // Assuming Flask returns JSON
                    console.log('Response from Flask:', data);
                } else {
                    console.error('Failed to send data to Flask');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    });
}

getHighlightedText();
