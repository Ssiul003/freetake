import express from 'express';
import sql from 'mssql';
import {getField, create, update} from './crudUtility.js';

const router = express.Router();

const tableName = 'ReservationDetails';

const fieldTypeMap = {
    reservation_id: sql.Int,
    anticipatedDate: sql.DateTime,
    status: sql.NVarChar
}

router.post('/reservation_details/new', async(req, res) => {
    const { reservation_id, anticipatedDate } = req.body;

    if (!reservation_id || !anticipatedDate ) return res.status(400).json({ message: 'Missing required fields' });
    try {
    } catch(error){
        // Reservation without details sounds dangerous
        console.error('Error creating user:', err);
        return res.status(500).json({ message: 'Server error' });
    }
});