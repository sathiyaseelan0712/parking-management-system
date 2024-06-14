const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    vehicleNumber: {
        type: String,
        required: true,
        unique: true,
    },
    entryTime: {
        type: Date,
        default: Date.now,
    },
    checkoutTime: {
        type: Date,
    },
    fee: {
        type: Number,
    },
    slot: {
        type: Number,
    },
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
