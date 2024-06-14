import { useState } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';

const CheckIn = () => {
    const [vehicleNumber, setVehicleNumber] = useState('');
    const [message, setMessage] = useState('');
    const [vehicleData, setVehicleData] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/vehicles', { vehicleNumber });
            setMessage(`Vehicle checked in successfully! Slot number: ${response.data.slot}`);
            setVehicleData(response.data);
        } catch (error) {
            setMessage('Error checking in vehicle');
        }
    };

    const generateInvoice = () => {
        if (!vehicleData) return;

        const doc = new jsPDF();
        const date = new Date(vehicleData.entryTime).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

        doc.text(`Vehicle Number: ${vehicleData.vehicleNumber}`, 10, 10);
        doc.text(`Entry Time: ${date}`, 10, 20);
        doc.text(`Slot Number: ${vehicleData.slot}`, 10, 30);
        doc.save('checkin_invoice.pdf');
    };

    return (
        <div>
            <h2>Check In</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Vehicle Number"
                    value={vehicleNumber}
                    onChange={(e) => setVehicleNumber(e.target.value)}
                    required
                />
                <button type="submit">Check In</button>
            </form>
            {message && <p>{message}</p>}
            {vehicleData && <button onClick={generateInvoice}>Generate Invoice</button>}
        </div>
    );
};

export default CheckIn;
