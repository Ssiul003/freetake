import express from 'express';
import crypto from 'crypto';
import sql from 'mssql'
import {getField, create, update, crudDelete} from './crudUtility.js'

const router = express.Router();

const tableName = 'user';

const fieldTypeMap = {
  username: sql.NVarChar,
  email: sql.NVarChar,
  hashpassword: sql.NVarChar,
  salt: sql.NVarChar,
  firstname: sql.NVarChar,
  lastname: sql.NVarChar,
  address: sql.Text,
  group_id: sql.Int,
};

const hashPassword = (password) => {
    const salt = crypto.randomBytes(4).toString('hex');
    const hashedPassword = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha256').toString('hex');
    return { salt, hashedPassword };
};

/*                CREATE                    */
router.post('/user/new', async (req, res) => {
/*  This should be handled in the front end
      - Username is too short
      - Password is too weak, ie short or missing unique characters
      - Email is legitiment (Maybe an external dependency to check this?)
      - Hashing (To not send unencrypted data)
*/

/*
Group_ID here is total ad-hoc, supposed to join a group to make a listing
However, it's clear that it's outside the scope of this
*/
    const { username, email, password, firstName, lastName, address, group_id } = req.body;
    console.log(req.body);
    if (!username || !email || !password || !firstName || !lastName || !address || !group_id)
        return res.status(400).json({ message: 'Missing required fields' });
  console.log('Request body:', req.body);
    try {
        const { salt, hashedPassword } = hashPassword(password); // Move to front-end

      // Does username already exist?
      const user = await getField(tableName, 'username', username); 
        if(user.length > 0)
          return res.status(400).json({ message: 'Username already taken.' });
      // Does email already exist?
        /* Email check here */

      // Create user request into database
        const fields = {
          username,
          email,
          hashedpassword: hashedPassword,
          salt,
          firstName,
          lastName,
          address,
          group_id
        };
        create(tableName, fields, fieldTypeMap);

        return res.json({ message: 'User successfully created'});
    } catch (err) {
        console.error('Error creating user:', err);
        return res.status(500).json({ message: 'Server error' });
      }
})
/*                READ                   */
router.get('/user/:id', async (req, res) => {
  try {
    const user_id = req.params.id;
    
    // Does username exist?
    var user = await getField(tableName, 'user_id', user_id);
    user = user[0];
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    delete user.Hashedpassword;
    delete user.Salt;
    delete user.Address;
    
    return res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

/*                UPDATE                  */
router.put('/user/:id', async(req, res) => {
  const user_id = req.params.id;
  const { username, email, firstname, lastname, address, group_id } = req.body;

  if (!username && !email && !firstname && !lastname && !address && !group_id) {
    return res.status(400).json({ message: 'No fields provided.' });
  }

  try {    
    const fields = { username, email, firstname, lastname, address };
    
    // If username were to be upated: Check if it already exist.
    if(username !== undefined) {
      const user = await getField(tableName, 'username', username);
        
      if(user.length > 0) return res.status(400).json({ message: 'Username already taken.' });
    }

    // Update given parameters
    if (!(await update(tableName, 'user_id', user_id, fields, fieldTypeMap))) {
      return res.status(404).json({ message: 'User not found.' });
    }
    return res.json({ message: 'User updated successfully' });

  } catch(error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

/*                DELETE                  */
router.delete('/user/:id', async (req, res) => {
  const user_id = req.params.id;
  if (!user_id) return res.status(400).json({ message: 'User ID is required.' });

  try {
    // Attempt to delete
    if (!(await crudDelete(tableName, 'user_id', user_id))) {
      return res.status(404).json({ message: 'User not found.' });
    }
    return res.json({ message: 'User deleted successfully' });

  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router