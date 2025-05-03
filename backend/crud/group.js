import express from 'express';
import { connectToDatabase } from '../server.js'
import sql from 'mssql'

const router = express.Router();

const tableName = 'group';

const fieldTypeMap = {
    name: sql.NVarChar,
    address: sql.NVarChar,
    type: sql.NVarChar,
    contact: sql.NVarChar,
  };
/* 
               TO BE TESTED!!!
*/
/*                CREATE                    */
router.post('/group/new', async (req, res) => {
    const { name, address, type, contact } = req.body;
    if(!name || !address || !type || !contact)
        return res.status(400).json({ message: 'Missing required fields' });

    try {
      const group = await getField(tableName, 'name', name); 
        if(group.length > 0)
          return res.status(400).json({ message: 'Group name already taken.' });
    // Creating group in databases
        const fields = {
            name,
            address,
            type,
            contact
         };
    create(tableName, fields, fieldTypeMap);
    
    return res.send('Group successfully created');

    } catch (error) {
        console.error('Error creating group:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});
  /*          READ            */
router.get('/group/:id', async (req, res) => {
    try {
      const group_id = req.params.id;
      
      var group = await getField(tableName, 'group_id', group_id);
      group = group[0];
      if(!group) {
          return res.status(404).json({ message: 'Group not found.' });
      }

      return res.json(group);
    } catch (error) {
      console.error('Error fetching group:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  });
/*          UPDATE            */
router.put('/group/:id', async(req, res) => {
  const group_id = req.params.id;
  const { name, address, type, contact } = req.body;

  if (!name && !address && !type && !contact) {
    return res.status(400).json({ message: 'No fields provided.' });
  }

  try {    
    const fields = { name, address, type, contact };
    
    // If group name were to be updated: check if it already exist.
    if(name !== undefined) {
      const group = await getField(tableName, 'name', name);
        
      if(group.length > 0) return res.status(400).json({ message: 'Name already taken.' });
    }
    // Update any given parameter
    if(!(await update(tableName, 'group_id', group_id, fields, fieldTypeMap))) {
      return res.status(404).json({ message: 'Group not found.'});
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
    if(!(await crudDelete(tableName, 'group_id', group_id))) {
      return res.status(404).json({ message: 'Group not found.' });
    }
    return res.json({ message: 'Group deleted successfully' });

  } catch (error) {
    console.error('Error deleting group:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router