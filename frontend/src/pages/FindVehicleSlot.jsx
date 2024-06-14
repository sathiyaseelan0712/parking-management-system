import { useState } from 'react';
import axios from 'axios';

const FindVehicleSlot = () => {
    const [vehicleNumber, setVehicleNumber] = useState('');
    const [slot, setSlot] = useState(null);
    const [error, setError] = useState('');

    const handleFind = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/slots/find/${vehicleNumber}`);
            setSlot(response.data.slotNumber);
            setError('');
        } catch (error) {
            setError('Vehicle not found');
        }
    };

    return (
        <div>
            <h2>Find Vehicle Slot</h2>
            <input
                type="text"
                placeholder="Vehicle Number"
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
                required
            />
            <button onClick={handleFind}>Find Slot</button>
            {slot && <p>Vehicle is in slot number: {slot}</p>}
            {error && <p>{error}</p>}
        </div>
    );
};

export default FindVehicleSlot;
