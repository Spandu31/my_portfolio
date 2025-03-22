const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

// Handle form submission
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    console.log('Form data received:', { name, email, message });

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    res.status(200).json({ message: `Thank you, ${name}! Your message has been received.` });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
