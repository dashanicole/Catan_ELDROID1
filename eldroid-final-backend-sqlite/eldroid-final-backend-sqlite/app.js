const express = require('express');
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./users.db');

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL,
            password TEXT NOT NULL,
            image TEXT NOT NULL
        )
    `);
    db.get('SELECT COUNT(*) AS count FROM users', (err, row) => {
        if (err) {
            console.error('Error checking user count:', err.message);
            return;
        }
        if (row.count === 0) {
            const defaultUsers = [
                { email: 'user1@example.com', password: 'password1', image: '/default-user-icon.jpg' },
                { email: 'user2@example.com', password: 'password2', image: '/default-user-icon.jpg' },
                { email: 'user3@example.com', password: 'password3', image: '/default-user-icon.jpg' },
            ];
            const insertStmt = db.prepare('INSERT INTO users (email, password, image) VALUES (?, ?, ?)');
            defaultUsers.forEach(user => {
                insertStmt.run(user.email, user.password, user.image);
            });
            insertStmt.finalize();
            console.log('Default users initialized.');
        }
    });
});
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, 'public/uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    },
});
const upload = multer({ storage });

app.get('/api/users', (req, res) => {
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});
app.post('/api/users', upload.single('image'), (req, res) => {
    const { email, password } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : '/default-user-icon.jpg';

    db.run(
        'INSERT INTO users (email, password, image) VALUES (?, ?, ?)',
        [email, password, image],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({
                message: 'User added successfully',
                user: { id: this.lastID, email, password, image },
            });
        }
    );
});
app.put('/api/users/:id', upload.single('image'), (req, res) => {
    const { id } = req.params;
    const { email, password } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const updates = [];
    if (email) updates.push('email = ?');
    if (password) updates.push('password = ?');
    if (image) updates.push('image = ?');

    if (updates.length === 0) {
        return res.status(400).json({ error: 'No fields to update' });
    }

    const query = `UPDATE users SET ${updates.join(', ')} WHERE id = ?`;
    const params = [];
    if (email) params.push(email);
    if (password) params.push(password);
    if (image) params.push(image);
    params.push(id);

    db.run(query, params, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'User updated successfully' });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
