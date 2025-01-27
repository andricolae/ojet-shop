const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const cors = require('cors');

app.use(bodyParser.json());

app.use(express.static('src'));

app.use(cors());

app.use((req, res, next) => {
    console.log('Request URL:', req.url);
    next();
});

const path = require('path');

app.get('/test', (req, res) => {
    res.json({ message: 'CORS test successful' });
});

app.get('/js/data/books.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'js/data/books.json'));
});

app.post('/delete-book', (req, res) => {
    const { id } = req.body;
    console.log('Book ID', id);
    const bookToDelete = req.body;
    const filePath = path.join(__dirname, 'js/data/books.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read books.json' });
        }

        let books = JSON.parse(data);

        const updatedBooks = books.filter(book => book.id !== id);

        fs.writeFile(filePath, JSON.stringify(updatedBooks, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to update books.json' });
            }
            console.log('Book successfully deleted:', bookToDelete.title);
            res.json({ success: true });
        });
    });
});

app.post('/update-books', (req, res) => {
    const updatedBooks = req.body;

    const filePath = path.join(__dirname, 'js/data/books.json');

    fs.writeFile(filePath, JSON.stringify(updatedBooks, null, 2), (err) => {
        if (err) {
            console.error('Error writing to books.json:', err);
            return res.status(500).json({ error: 'Failed to update books.json' });
        }

        console.log('Books.json successfully updated');
        res.json({ success: true });
    });
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
