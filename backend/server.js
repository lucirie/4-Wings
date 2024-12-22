const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const apiKey = process.env.OPENAI_API_KEY;


const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Serve static files (if needed)
app.use(express.static('public'));

// Example Route to Handle Requests from Frontend
app.post('/api/openai', async (req, res) => {
    const { prompt } = req.body;
    // Replace with your OpenAI API call logic
    const openaiResponse = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`, // API key
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            prompt: prompt,
            max_tokens: 250,
        }),
    });

    const data = await openaiResponse.json();
    res.json({ response: data.choices[0].text });
});

// Start the Server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
