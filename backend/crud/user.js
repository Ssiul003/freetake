import express from 'express';
import crypto from 'crypto';
import { connectToDatabase } from '../server.js'
import sql from 'mssql'

const router = express.Router();

const hashPassword = (password) => {
    const salt = crypto.randomBytes(4).toString('hex');
    const hashedPassword = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha256').toString('hex');
    return { salt, hashedPassword };
};


// CREATE
router.post('/user', async (req, res) => {
/*  This should be handled in the front end
      - Username is too short
      - Password is too weak, ie short or missing unique characters
      - Email is legitiment (Maybe an external dependency to check this?)

    Furthermore, ensure hashing is done on the front end client so it doesn't send unencrypted data.
*/
    const { username, email, password, firstname, lastname, address } = req.body;

    if (!username || !email || !password || !firstname || !lastname) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
    try {
        const { salt, hashedPassword } = hashPassword(password);
        const pool = await connectToDatabase();

        //CHECK IF USERNAME EXIST
        const usernameExist = await pool.request()
        .input('username', sql.NVarChar, username)
        .query('SELECT 1 FROM [FreeTake].[user] WHERE username = @username');

        if(usernameExist.recordset.length > 0) return res.status(400).json({ message: 'Username already taken.' });

        // There could be one for email
        /* Email here */

       // Create user into database
        const haha = await pool.request()
        .input('username', sql.VarChar, username)
        .input('email', sql.VarChar, email)
        .input('hashedpassword', sql.VarChar, hashedPassword)
        .input('salt', sql.VarChar, salt)
        .input('firstname', sql.VarChar, firstname)
        .input('lastname', sql.VarChar, lastname)
        .input('address', sql.Text, address)
        .input('group_id', sql.Int, null)
        .query(`
          INSERT INTO [FreeTake].[user] (username, email, hashedpassword, salt, firstname, lastname, address, group_id)
          VALUES (@username, @email, @hashedpassword, @salt, @firstname, @lastname, @address, @group_id)
        `);
    } catch (err) {
        console.error('Error creating user:', err);
        return res.status(500).json({ message: 'Server error' });
      }
    
    
    console.log('User successfully created');
    res.send('Hello!');
})

export default router