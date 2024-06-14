import  { useState } from 'react';
import axios from 'axios';

const SlotStatus = () => {
    const [status, setStatus] = useState(null);
    const [error, setError] = useState('');

    const fetchStatus = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/slots/status');
            setStatus(response.data);
            setError('');
        } catch (error) {
            setError('Error fetching slot status');
        }
    };

    return (
        <div>
            <h2>Slot Status</h2>
            <button onClick={fetchStatus}>Check Slot Status</button>
            {status && (
                <div>
                    <p>Total Slots: {status.totalSlots}</p>
                    <p>Occupied Slots: {status.occupiedSlots}</p>
                    <p>Remaining Slots: {status.remainingSlots}</p>
                </div>
            )}
            {error && <p>{error}</p>}
        </div>
    );
};

export default SlotStatus;
