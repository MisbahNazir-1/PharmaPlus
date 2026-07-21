const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
    medicineName: { 
        type: String, 
        required: true,
        unique: true
    },
    quantity: { 
        type: Number, 
        default: 0 
    },
    threshold: { 
        type: Number, 
        default: 5 
    },
    expiryDate: { 
        type: Date 
    }
});

module.exports = mongoose.model('Inventory', InventorySchema);