import express from 'express';
import crypto from 'crypto';
import { connectToDatabase } from '../server.js'
import sql from 'mssql'
import {getField, create} from './crudUtility.js'

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

// CREATE
router.post('/user/new', async (req, res) => {
/*  This should be handled in the front end
      - Username is too short
      - Password is too weak, ie short or missing unique characters
      - Email is legitiment (Maybe an external dependency to check this?)
      - Hashing (To not send unencrypted data)
*/
    const { username, email, password, firstname, lastname, address } = req.body;

    if (!username || !email || !password || !firstname || !lastname || !address) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
    try {
      // This should be in front-end
        const { salt, hashedPassword } = hashPassword(password);
        
        const pool = await connectToDatabase();

      // CHECK IF USERNAME EXIST
      const user = await getField(pool, tableName, 'username', username);
        if(user.length > 0)
          return res.status(400).json({ message: 'Username already taken.' });
      // There could be one for email
        /* Email here */

      // Create user request into database
        const request = await pool.request();

        const fields = {
          username,
          email,
          hashedpassword: hashedPassword,
          salt,
          firstname,
          lastname,
          address,
          group_id: null, // User creates an account without a group
        };
    
        create(request, tableName, fields, fieldTypeMap);

        return res.send('User successfully created');
    } catch (err) {
        console.error('Error creating user:', err);
        return res.status(500).json({ message: 'Server error' });
      }
})

router.get('/user/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const pool = await connectToDatabase();
    
    var user = await getField(pool, tableName, 'user_id', id);
    user = user[0];
    if (!user) 
      return res.status(404).json({ message: 'User not found.' });

    delete user.Hashedpassword;
    delete user.Salt;
    delete user.Address;
    
    return res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});


router.put('/user/:id', async(req, res) => {
  const userId = req.params.id;
  const { username, email, firstname, lastname, address } = req.body;

  if (!username && !email && !firstname && !lastname && !address) {
    return res.status(400).json({ message: 'No fields provided.' });
  }

  try {    
    const fields = { username, email, firstname, lastname, address };
    
    const pool = await connectToDatabase();
    const request = pool.request();

    request.input('user_id', sql.Int, userId);
    const updateFields = [];
    
    //CHECK IF USERNAME EXIST
    if(username !== undefined) {
      const usernameExist = await pool.request()
      .input('username', sql.NVarChar, username)
      .query('SELECT 1 FROM [FreeTake].[user] WHERE username = @username');
        
      if(usernameExist.recordset.length > 0) return res.status(400).json({ message: 'Username already taken.' });
    }

    // Update any given parameter
    for (const [key, value] of Object.entries(fields)) {
      if (value !== undefined) {
        updateFields.push(`${key} = @${key}`);
        const fieldType = fieldTypeMap[key];
        request.input(key, fieldType, value);
      }
    }

    const query = `UPDATE [FreeTake].[user] 
      SET ${updateFields.join(', ')}
      WHERE user_id = @user_id`;

    const result = await request.query(query);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.json({ message: 'User updated successfully' });

  } catch(error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/user/:id', async (req, res) => {
  const userId = req.params.id;
  if (!userId) return res.status(400).json({ message: 'User ID is required.' });

  try {
    const pool = await connectToDatabase();

    const result = await pool.request()
    .input('user_id', sql.Int, userId).query(`DELETE FROM [FreeTake].[user] WHERE user_id = @user_id`);

    if (result.rowsAffected[0] === 0)
      return res.status(404).json({ message: 'User not found.' });


    return res.json({ message: 'User deleted successfully' });

  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router