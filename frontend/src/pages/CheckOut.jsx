import  { useState } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';

const CheckOut = () => {
    const [vehicleNumber, setVehicleNumber] = useState('');
    const [message, setMessage] = useState('');
    const [vehicleData, setVehicleData] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch('http://localhost:5000/api/vehicles/checkout', { vehicleNumber });
            if (response.data) {
                setMessage(`Vehicle checked out successfully! Fee: $${response.data.fee}`);
                setVehicleData(response.data);
            } else {
                setMessage('Invalid data received from server');
            }
        } catch (error) {
            console.error('Error checking out vehicle:', error);
            setMessage('Error checking out vehicle');
        }
    };

    const generateInvoice = () => {
        if (!vehicleData || !vehicleData.entryTime || !vehicleData.checkoutTime) {
            console.error('Invalid vehicle data:', vehicleData);
            return;
        }
        const entryDate = new Date(vehicleData.entryTime).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
        const exitDate = new Date(vehicleData.checkoutTime).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
        const doc = new jsPDF();
        doc.text(`Vehicle Number: ${vehicleData.vehicleNumber}`, 10, 10);
        doc.text(`Entry Time: ${entryDate}`, 10, 20);
        doc.text(`Exit Time: ${exitDate}`, 10, 30);
        doc.text(`Slot Number: ${vehicleData.slot}`, 10, 40);
        doc.text(`Fee: $${vehicleData.fee}`, 10, 50);
        doc.save('checkout_invoice.pdf');
    };

    return (
        <div>
            <h2>Check Out</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Vehicle Number"
                    value={vehicleNumber}
                    onChange={(e) => setVehicleNumber(e.target.value)}
                    required
                />
                <button type="submit">Check Out</button>
            </form>
            {message && <p>{message}</p>}
            {vehicleData && <button onClick={generateInvoice}>Generate Invoice</button>}
        </div>
    );
};

export default CheckOut;
