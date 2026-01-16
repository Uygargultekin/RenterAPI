const express = require('express');
const router = express.Router();
const kiralamaController = require('../controllers/rentalController');

router.post('/', kiralamaController.kiralamaOlustur);
router.delete('/:id', kiralamaController.kiralamaIptal);

module.exports = router;
