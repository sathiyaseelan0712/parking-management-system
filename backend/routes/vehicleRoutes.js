const express = require('express');
const { createVehicle, checkoutVehicle } = require('../controllers/vehicleController');
const router = express.Router();

router.post('/', createVehicle);
router.patch('/checkout', checkoutVehicle);

module.exports = router;
