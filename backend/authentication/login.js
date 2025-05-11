// backend/routes/login.js
import express from 'express';
import crypto from 'crypto';
import { getField } from '../crud/crudUtility.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const tableName = 'user';

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await getField(tableName, 'email', email);
        user = user[0];
        if (!user)
            return res.status(400).json({ message: 'Fields do not match records' });

        const hashAttempt = crypto.pbkdf2Sync(password, user.Salt, 100000, 64, 'sha256').toString('hex');
        if (hashAttempt === user.Hashedpassword) {
            const token = jwt.sign(
                { id: user.id, username: user.username },
                process.env.SECRET_KEY,
                { expiresIn: '1h' }
            );
            return res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 3600000
            }).json({ success: true });
        } else {
            return res.status(400).json({ message: 'Fields do not match records' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
});

export default router;
