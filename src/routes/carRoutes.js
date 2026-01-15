const express = require('express');
const router = express.Router();
const aracController = require('../controllers/carController');

router.get('/', aracController.aracListele);
router.post('/', aracController.aracEkle);
router.delete('/:id', aracController.aracSil);

module.exports = router;
