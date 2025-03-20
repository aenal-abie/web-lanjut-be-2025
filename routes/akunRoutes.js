const express = require('express');
const router = express.Router();
const akunController = require('../controllers/akunController');

router.get('/akun', akunController.getAllAkun);
router.get('/akun/:id', akunController.getAkunById);
router.post('/akun', akunController.createAkun);
router.put('/akun/:id', akunController.updateAkun);
router.delete('/akun/:id', akunController.deleteAkun);

module.exports = router;
