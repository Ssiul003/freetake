import express from 'express'
import crypto from 'crypto'
import { getField } from './crudUtility.js'
import jwt from 'jsonwebtoken'

const router = express.Router();
const tableName = 'user';

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        var user = await getField(tableName, 'email', email);
        user = user[0];
        if(!user)
            return res.status(400).json({ message: 'Fields does not match records' });

        const hashAttempt = crypto.pbkdf2Sync(password, user.Salt, 100000, 64, 'sha256').toString('hex');
        if(hashAttempt === user.Hashedpassword) {
            const token = jwt.sign(
                { id: user.id, username: user.username },
                process.env.SECRET_KEY,
                { expiresIn: '1h' } // Token expires in 1 hour
            );
            return res.json({ token });
        } else {
            return res.status(400).json({ message: 'Fields does not match records'});
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
  });