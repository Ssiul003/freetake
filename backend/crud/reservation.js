import express from 'express';
import sql from 'mssql';
import {getField, create, update, crudDelete} from './crudUtility.js';

const router = express.Router();

const tableName = 'Reservation';

const fieldTypeMap = {
    group_id: sql.Int,
    listing_id: sql.Int,
    accepted: sql.Bit,
    datetime: sql.DateTime,
    status: sql.NVarChar
}
/*
                TO BE TESTED
*/
/*                CREATE                    */
router.post('/reservation/new', async (req, res) => {
    const{ group_id, listing_id } = req.body;
    if(!group_id || !listing_id) return res.status(400).json({ message: 'Missing required fields' });
    try {
        const fields = {
            group_id,
            listing_id,
            accepted: 0
        }
        await create(tableName, fields, fieldTypeMap);
        return res.json({message: 'Reservation successfully created'});
    } catch (error) {
        console.error('Error creating reservation:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

/*                READ                   */
router.get('/reservation/:id', async (req, res) => {
    try {
        const reservation_id = req.params.id;

        var reservation = await getField(tableName, 'reservation_id', reservation_id);
        reservation = reservation[0];
        if (!reservation) {
          return res.status(404).json({ message: 'Reservation not found.' });
        }

        return res.json(reservation);
    } catch(error) {
        console.error('Error fetching reservation:', error);
        return res.status(500).json({ message: 'Server error' });
    }  
});

/*                UPDATE                  */
/*
Should only modify the accepted status.
Can either be accepted, or be unaccepted due to outside reasons. (Relisted)

*/
router.post('/reservation/:id', async(req, res) => {
    const reservation_id = req.params.id;
    const { accepted, datetime } = req.body;
    if(!accepted) return req.status(400).json({ message: 'No fields provided.'});
    try {
        const fields = { accepted };
        if (!(await update(tableName, 'reservation_id', reservation_id, fields, fieldTypeMap))) {
            return res.status(404).json({ message: 'reservation not found.' });
          }
          // Reservation details are generated.
          if(accepted){
            if(!datetime) return req.status(400).json({ message: 'Accepted reservation without enlisted date. Please define a date.'});
            const reservation_details = {
                reservation_id,
                datetime,
                status: "Undelivered"
            }
            create('ReservationDetails', reservation_details, fieldTypeMap)
            return res.json({ message: 'Reservation updated successfully. Generated reservation details.' });
          }
          return res.json({ message: 'Reservation updated successfully.' });
    } catch(error) {
        console.error('Error updating reservation:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

/*                DELETE                  */
router.delete('/reservation/:id', async (req, res) => {
    const reservation_id = req.params.id;
    if (!reservation_id) return res.status(400).json({ message: 'Reservation ID is required.' });
  
    try {
      if (!(await crudDelete(tableName, 'reservation_id', reservation_id))) {
        return res.status(404).json({ message: 'Reservation not found.' });
      }
      return res.json({ message: 'Reservation deleted successfully' });
  
    } catch (error) {
      console.error('Error deleting reservation:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  });
  
  export default router