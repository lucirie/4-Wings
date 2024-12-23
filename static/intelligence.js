function getSelectionTextOnMouseUp() {
    document.addEventListener("mouseup", async () => {
    const selectedText = window.getSelection().toString().trim();
        if (selectedText) {
            const containerElement = document.getElementById('container');
            const response = document.getElementById('response')
            containerElement.classList.remove('hidden');

            const apiResponse = await fetchOpenAIResponse(selectedText);
            response.textContent = apiResponse;
        }
    });
}

// API Call
async function fetchOpenAIResponse(prompt) {
  // TODO
}


// Call the function to start listening
getSelectionTextOnMouseUp();