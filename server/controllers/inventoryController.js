const Inventory = require('../models/Inventory');

exports.getInventory = async (req, res) => {
    try {
        const inventory = await Inventory.find();
        res.status(200).json(inventory);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addMedicine = async (req, res) => {
    const { medicineName, quantity, threshold, expiryDate } = req.body;
    const newMedicine = new Inventory({ medicineName, quantity, threshold, expiryDate });
    
    try {
        const savedMedicine = await newMedicine.save();
        res.status(201).json(savedMedicine);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateQuantity = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;
        
        const updatedMedicine = await Inventory.findByIdAndUpdate(
            id, 
            { quantity }, 
            { new: true }
        );
        res.status(200).json(updatedMedicine);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};