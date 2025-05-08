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
/*          CREATE             */
/*
There's no 'creating' reservation details, they're
generated upon a successful reservation.
*/
/*          READ            */
router.get('/reservation_details/:id', async (req, res) => {
    try {
      const reservation_id = req.params.id;
      
      var reservation = await getField(tableName, 'reservation_id', reservation_id);
      reservation = reservation[0];
      if(!reservation) {
          return res.status(404).json({ message: 'Reservation details not found.' });
      }

      return res.json(reservation);
    } catch (error) {
      console.error('Error fetching group:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  });
/*                UPDATE              */
router.put('/reservation_details/:id', async(req, res) => {
    const reservation_id = req.params.id;
    const { anticipatedDate, status } = req.body;
  
    if (!anticipatedDate || !status) {
      return res.status(400).json({ message: 'No fields provided.' });
    }
  
    try {    
      const fields = { 
        anticipatedDate, 
        status
        };
      
      if(!(await update(tableName, 'reservation_id', reservation_id, fields, fieldTypeMap))) {
        return res.status(404).json({ message: 'Reservation details not found.'});
      }
      return res.json({ message: 'Reservation details updated successfully' });
  
    } catch(error) {
      console.error('Error updating Reservation:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  });

/*          DELETE              */
/*
There's no deleting reservation details, they're like receipts.
Better to hold onto this information.
*/
export default router;