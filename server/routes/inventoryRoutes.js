const express = require('express');
const router = express.Router();
const { getInventory, addMedicine, updateQuantity } = require('../controllers/inventoryController');

router.get('/', getInventory);
router.post('/', addMedicine);
router.put('/:id', updateQuantity);

module.exports = router;