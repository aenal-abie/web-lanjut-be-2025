const db = require('../db');
const bcrypt = require('bcrypt');
const Joi = require('joi'); //tambahkan pada bagian awal kode
// Ambil semua pengguna
exports.getAllPengguna = (req, res) => {
    db.query('SELECT * FROM pengguna', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Ambil pengguna berdasarkan ID
exports.getPenggunaById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM pengguna WHERE id = ?', [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
        }
        res.json(result[0]);
    });
};

// Tambah pengguna baru
exports.createPengguna = async (req, res) => {
    const { username, password, repassword } = req.body;

    const schema = Joi.object().keys({
        username: Joi.string().min(4).required().messages({
            'string.min': 'Username harus terdiri dari minimal 4 karakter',
            'any.required': 'Username harus diisi'
        }),
        password: Joi.string().min(6).required().messages({
            'string.min': 'Password harus terdiri dari minimal 6 karakter',
            'any.required': 'Password harus diisi'
        }),
        repassword: Joi.string().valid(Joi.ref('password')).required().messages({
            'any.only': 'Repassword harus sama dengan password',
            'any.required': 'Repassword harus diisi'
        })
    });

    const { error } = schema.validate({ username, password, repassword });
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    db.query('SELECT * FROM pengguna WHERE username = ?', [username], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length > 0) {
            return res.status(400).json({ error: 'Username sudah digunakan' });
        }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        db.query(
            'INSERT INTO pengguna (username, password) VALUES (?, ?)',
            [username, hashedPassword],
            (err, result) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.status(201).json({ message: 'Pengguna berhasil ditambahkan', id: result.insertId });
            }
        );
    } catch (error) {
        res.status(500).json({ error: 'Gagal mengenkripsi password' });
    }
};

// Update pengguna berdasarkan ID
exports.updatePengguna = async (req, res) => {
    const { id } = req.params;
    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        db.query(
            'UPDATE pengguna SET username = ?, password = ? WHERE id = ?',
            [username, hashedPassword, id],
            (err, result) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.json({ message: 'Pengguna berhasil diperbarui' });
            }
        );
    } catch (error) {
        res.status(500).json({ error: 'Gagal mengenkripsi password' });
    }
};

// Hapus pengguna berdasarkan ID
exports.deletePengguna = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM pengguna WHERE id = ?', [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Pengguna berhasil dihapus' });
    });
};

