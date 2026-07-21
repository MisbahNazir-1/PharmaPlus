const Queue = require('../models/Queue');

// GET
exports.getQueue = async (req, res) => {
    try {
        const queue = await Queue.find();
        res.status(200).json(queue);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST 
exports.addPatient = async (req, res) => {
    const newPatient = new Queue(req.body);
    try {
        const savedPatient = await newPatient.save();
        res.status(201).json(savedPatient);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// DELETE: 
exports.deletePatient = async (req, res) => {
    try {
        await Queue.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Patient dispensed successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};