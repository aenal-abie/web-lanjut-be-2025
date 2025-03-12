const express = require('express');
const router = express.Router();
const pelangganController = require('../controllers/pelangganController');

router.get('/pelanggan', pelangganController.getAllPelanggan);
router.get('/pelanggan/:kode_pelanggan', pelangganController.getPelangganById);
router.post('/pelanggan', pelangganController.createPelanggan);
router.put('/pelanggan/:kode_pelanggan', pelangganController.updatePelanggan);
router.delete('/pelanggan/:kode_pelanggan', pelangganController.deletePelanggan);

module.exports = router;
