const db = require('../db');

// Ambil semua pelanggan
exports.getAllPelanggan = (req, res) => {
    db.query('SELECT * FROM pelanggan', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Ambil pelanggan berdasarkan kode_pelanggan
exports.getPelangganById = (req, res) => {
    const { kode_pelanggan } = req.params;
    db.query('SELECT * FROM pelanggan WHERE kode_pelanggan = ?', [kode_pelanggan], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Pelanggan tidak ditemukan' });
        }
        res.json(result[0]);
    });
};

// Tambah pelanggan baru
exports.createPelanggan = (req, res) => {
    const { kode_pelanggan, nama_pelanggan, alamat, no_hp, kode_server } = req.body;

    db.query(
        'INSERT INTO pelanggan (kode_pelanggan, nama_pelanggan, alamat, no_hp, kode_server) VALUES (?, ?, ?, ?, ?)',
        [kode_pelanggan, nama_pelanggan, alamat, no_hp, kode_server],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: 'Pelanggan berhasil ditambahkan', kode_pelanggan });
        }
    );
};

// Update pelanggan berdasarkan kode_pelanggan
exports.updatePelanggan = (req, res) => {
    const { kode_pelanggan } = req.params;
    const { nama_pelanggan, alamat, no_hp, kode_server } = req.body;

    db.query(
        'UPDATE pelanggan SET nama_pelanggan = ?, alamat = ?, no_hp = ?, kode_server = ? WHERE kode_pelanggan = ?',
        [nama_pelanggan, alamat, no_hp, kode_server, kode_pelanggan],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'Pelanggan berhasil diperbarui' });
        }
    );
};

// Hapus pelanggan berdasarkan kode_pelanggan
exports.deletePelanggan = (req, res) => {
    const { kode_pelanggan } = req.params;

    db.query('DELETE FROM pelanggan WHERE kode_pelanggan = ?', [kode_pelanggan], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Pelanggan berhasil dihapus' });
    });
};
