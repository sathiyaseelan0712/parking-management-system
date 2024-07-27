# Vehicle Parking Management System

This is a Vehicle Parking Management System built with a Node.js/Express backend and a React frontend. The system allows users to check in and check out vehicles, view slot status, and find the slot of a parked vehicle.

## Features

- Check in a vehicle and assign a parking slot
- Check out a vehicle and calculate the parking fee
- View the status of parking slots
- Find the slot number of a parked vehicle

## Prerequisites

- Node.js
- MongoDB
- npm (Node Package Manager)

## Getting Started

### Backend Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/vehicle-parking-management-system.git
   cd vehicle-parking-management-system/backend

2. **Install dependencies**:

    ```bash
    npm install

3. **Start MongoDB**:

    ```bash
    mongod

4. **Start the server**:

    ```bash
    node index.js

### Frontend SetUp

1. **Navigate to the frontend directory**:

    ```bash
    cd ../frontend
2. **Install dependencies**:

    ```bash
    npm install
3. **Start the development server**:

    ```bash
    npm start
    
The frontend development server will start on http://localhost:3000.
## API Endpoints
### Vehicle Routes
#### Check In: POST /api/vehicles/checkin
- Request Body: { "vehicleNumber": "ABC1234" }
- Response: { "slot": 1 }
#### Check Out: PATCH /api/vehicles/checkout
- Request Body: { "vehicleNumber": "ABC1234" }
- Response: { "vehicleNumber": "ABC1234", "fee": 10, "slot": 1, "entryTime": "...", "checkoutTime": "..." }
#### Find Vehicle Slot: GET /api/vehicles/find/:vehicleNumber
- Response: { "slotNumber": 1 }
### Slot Routes
#### Initialize Slots: POST /api/slots/initialize
- Request Body: { "slotCount": 10 }
- Response: { "message": "Slots initialized" }
#### Delete All Slots: DELETE /api/slots/deleteAll
- Response: { "message": "All slots deleted" }
## Usage
- Check In a Vehicle: Enter the vehicle number and click "Check In".
- Check Out a Vehicle: Enter the vehicle number and click "Check Out" to see the fee and other details.
- View Slot Status: Click "Check Slot Status" to see the current status of all slots.
- Find Vehicle Slot: Enter the vehicle number and click "Find Slot" to see the slot number of the parked vehicle.
