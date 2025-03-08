const express = require('express');
const router = express.Router();
const serverController = require('../controllers/serverController');

router.get('/servers', serverController.getAllServers);
router.get('/servers/:kodeServer', serverController.getServerByKodeServer);
router.post('/servers', serverController.createServer);
router.put('/servers/:kodeServer', serverController.updateServer);
router.delete('/servers/:kodeServer', serverController.deleteServer);

module.exports = router;
