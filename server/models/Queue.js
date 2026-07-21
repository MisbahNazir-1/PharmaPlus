const mongoose = require('mongoose');

const QueueSchema = new mongoose.Schema({
    patient: { type: String, required: true },
    medication: { type: String, required: true },
    status: { type: String, default: 'Pending' } // Pending or Dispensed
});

module.exports = mongoose.model('Queue', QueueSchema);