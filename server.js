const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// раздача статических файлов (html, css, js)
app.use(express.static(path.join(__dirname, 'public')));

// API для тестов
app.get('/api/rates/:currency', (req, res) => {
    const rates = {
        USD: 3.2,
        EUR: 3.4,
        RUB: 0.034,
        BYN: 1
    };

    const currency = req.params.currency;

    res.json({
        rate: rates[currency] || 1
    });
});

// fallback (чтобы "/" не падал)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

app.get('/api/test', (req, res) => {
    res.status(200).json({
        message: "API works"
    });
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});