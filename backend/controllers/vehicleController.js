const Vehicle = require('../models/vehicleModel');
const Slot = require('../models/slotModel');

// @desc    Create a new vehicle
// @route   POST /api/vehicles
// @access  Public
const createVehicle = async (req, res) => {
    const { vehicleNumber } = req.body;

    if (!vehicleNumber) {
        return res.status(400).json({ message: 'Vehicle number is required' });
    }

    try {
        const availableSlot = await Slot.findOne({ isOccupied: false });
        if (!availableSlot) {
            return res.status(400).json({ message: 'No available slots' });
        }

        const newVehicle = new Vehicle({ vehicleNumber, slot: availableSlot.slotNumber });
        await newVehicle.save();

        availableSlot.isOccupied = true;
        await availableSlot.save();

        res.status(201).json(newVehicle);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// @desc    Checkout a vehicle and calculate fee
// @route   PATCH /api/vehicles/checkout
// @access  Public
const checkoutVehicle = async (req, res) => {
    const { vehicleNumber } = req.body;

    if (!vehicleNumber) {
        return res.status(400).json({ message: 'Vehicle number is required' });
    }

    try {
        const vehicle = await Vehicle.findOne({ vehicleNumber });
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        vehicle.checkoutTime = Date.now();
        const duration = (vehicle.checkoutTime - vehicle.entryTime) / 1000 / 60 / 60; // duration in hours

        const rate = 10; // Define your rate per hour
        vehicle.fee = Math.ceil(duration) * rate;

        await vehicle.save();

        const slot = await Slot.findOne({ slotNumber: vehicle.slot });
        slot.isOccupied = false;
        await slot.save();

        res.status(200).json({ vehicleNumber: vehicle.vehicleNumber, fee: vehicle.fee, slot: vehicle.slot });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

module.exports = { createVehicle, checkoutVehicle };
