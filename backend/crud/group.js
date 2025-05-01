import express from 'express';
import { connectToDatabase } from '../server.js'
import sql from 'mssql'

const router = express.Router();
const fieldTypeMap = {
    name: sql.NVarChar,
    address: sql.NVarChar,
    type: sql.NVarChar,
    contact: sql.NVarChar,
  };

  /*           CREATE             */
router.post('/group/new', async (req, res) => {
    const { name, address, type, contact } = req.body;
    if(!name || !address || !type || !contact)
        return res.status(400).json({ message: 'Missing required fields' });

    try {
        const pool = await connectToDatabase();

        const nameExist = await pool.request()
        .input('name', sql.NVarChar, name)
        .query('SELECT 1 FROM [FreeTake].[Group] WHERE name = @name');
 
        if(nameExist.recordset.length > 0) 
          return res.status(400).json({ message: 'Group name already taken.' });

    // Creating group in database
        const request = await pool.request();

        const fields = {
            name,
            address,
            type,
            contact
         };

        const fieldNames = [];
        const fieldParams = [];

        for (const [key, value] of Object.entries(fields)) {
        // Failsafe
            if (value !== undefined) {
                fieldNames.push(key);
                fieldParams.push(`@${key}`);
                const fieldType = fieldTypeMap[key] || sql.NVarChar;
                request.input(key, fieldType, value);
            } else { return res.status(500).json({ message: 'New parameter not defined.' }); }
        }

    const query = `INSERT INTO [FreeTake].[Group] (${fieldNames.join(', ')})
      VALUES (${fieldParams.join(', ')})`;

    await request.query(query);

    return res.send('Group successfully created');

    } catch (error) {
        console.error('Error creating group:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});
  /*          READ            */
router.get('/group/:id', async (req, res) => {
    try {
      const id = req.params.id;
  
      const pool = await connectToDatabase();
      const result = await pool.request()
      .input('group_id', sql.NVarChar, id)
      .query('SELECT * FROM [FreeTake].[Group] WHERE group_id = @group_id');
      
      var group = result.recordset[0];
      if (!group) 
        return res.status(404).json({ message: 'Group not found.' });

      return res.json(result.recordset[0]);
    } catch (error) {
      console.error('Error fetching group:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  });
/*          UPDATE            */
router.put('/group/:id', async(req, res) => {
  const id = req.params.id;
  const { name, address, type, contact } = req.body;

  if (!name && !address && !type && !contact) {
    return res.status(400).json({ message: 'No fields provided.' });
  }

  try {    
    const fields = { name, address, type, contact };
    
    const pool = await connectToDatabase();
    const request = pool.request();

    request.input('group_id', sql.Int, id);
    const updateFields = [];
    
    //CHECK IF GROUPNAME
    if(name !== undefined) {
      const nameExist = await pool.request()
      .input('name', sql.NVarChar, name)
      .query('SELECT 1 FROM [FreeTake].[Group] WHERE name = @name');
        
      if(nameExist.recordset.length > 0) return res.status(400).json({ message: 'Name already taken.' });
    }

    // Update any given parameter
    for (const [key, value] of Object.entries(fields)) {
      if (value !== undefined) {
        updateFields.push(`${key} = @${key}`);
        const fieldType = fieldTypeMap[key];
        request.input(key, fieldType, value);
      }
    }

    const query = `UPDATE [FreeTake].[Group] 
      SET ${updateFields.join(', ')}
      WHERE group_id = @group_id`;

    const result = await request.query(query);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: 'Group not found.' });
    }

    return res.json({ message: 'Group updated successfully' });

  } catch(error) {
    console.error('Error updating group:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/group/:id', async (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).json({ message: 'Group ID is required.' });

  try {
    const pool = await connectToDatabase();

    const result = await pool.request()
    .input('group_id', sql.Int, id).query(`DELETE FROM [FreeTake].[group] WHERE group_id= @group_id`);

    if (result.rowsAffected[0] === 0)
      return res.status(404).json({ message: 'Group not found.' });


    return res.json({ message: 'Group deleted successfully' });

  } catch (error) {
    console.error('Error deleting group:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router