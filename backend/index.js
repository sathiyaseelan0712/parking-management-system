const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const vehicleRoutes = require('./routes/vehicleRoutes');
const slotRoutes = require('./routes/slotRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); 
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/parking')
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

app.use('/api/vehicles', vehicleRoutes);
app.use('/api/slots', slotRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
