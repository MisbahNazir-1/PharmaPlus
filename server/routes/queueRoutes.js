const express = require('express');
const router = express.Router();
const { getQueue, addPatient, deletePatient } = require('../controllers/queueController');

router.get('/', getQueue);
router.post('/', addPatient);
router.delete('/:id', deletePatient);

module.exports = router;