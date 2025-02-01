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

app.post('/update-book', (req, res) => {
    const { id, title, author, category, image } = req.body;
    const filePath = path.join(__dirname, 'js/data/books.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read books.json' });
        }

        let books = JSON.parse(data);
        let bookIndex = books.findIndex(book => book.id === id);

        if (bookIndex === -1) {
            return res.status(404).json({ error: 'Book not found' });
        }

        // Update book details
        books[bookIndex] = { id, title, author, category, image };

        fs.writeFile(filePath, JSON.stringify(books, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to update book in books.json' });
            }
            console.log(`Book ID ${id} updated successfully`);
            res.json({ success: true });
        });
    });
});




const ordersFile = path.join(__dirname, 'js/data/orders.json');

app.get('/orders', (req, res) => {
    res.sendFile(ordersFile);
});

app.post('/update-order', (req, res) => {
    const { id, status } = req.body;

    fs.readFile(ordersFile, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Failed to read orders.json' });

        let orders = JSON.parse(data);
        let orderIndex = orders.findIndex(order => order.id === id);

        if (orderIndex === -1) return res.status(404).json({ error: 'Order not found' });

        orders[orderIndex].status = status;

        fs.writeFile(ordersFile, JSON.stringify(orders, null, 2), (err) => {
            if (err) return res.status(500).json({ error: 'Failed to update orders.json' });

            console.log(`Order ${id} updated to ${status}`);
            res.json({ success: true });
        });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
