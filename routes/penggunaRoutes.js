const express = require('express');
const router = express.Router();
const penggunaController = require('../controllers/penggunaController');

router.get('/pengguna', penggunaController.getAllPengguna);
router.get('/pengguna/:id', penggunaController.getPenggunaById);
router.post('/pengguna', penggunaController.createPengguna);
router.put('/pengguna/:id', penggunaController.updatePengguna);
router.delete('/pengguna/:id', penggunaController.deletePengguna);

module.exports = router;

