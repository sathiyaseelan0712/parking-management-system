import  { useState } from 'react';
import CheckIn from './CheckIn';
import CheckOut from './CheckOut';
import SlotStatus from './SlotStatus';
import FindVehicleSlot from './FindVehicleSlot';

const Home = () => {
    const [view, setView] = useState('home');

    return (
        <div>
            <h1>Vehicle Parking Management</h1>
            {view === 'home' && (
                <>
                    <button onClick={() => setView('checkin')}>Check In</button>
                    <button onClick={() => setView('checkout')}>Check Out</button>
                    <button onClick={() => setView('status')}>Check Slot Status</button>
                    <button onClick={() => setView('find')}>Find Vehicle Slot</button>
                </>
            )}
            {view === 'checkin' && <CheckIn />}
            {view === 'checkout' && <CheckOut />}
            {view === 'status' && <SlotStatus />}
            {view === 'find' && <FindVehicleSlot />}
            {view !== 'home' && <button onClick={() => setView('home')}>Back</button>}
        </div>
    );
};

export default Home;
