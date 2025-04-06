import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

const router = express.Router();

router.get('/users', (req, res) => {
    console.log('Hello!');
    res.send('Hello!');
})

export default router