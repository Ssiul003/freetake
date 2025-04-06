import express from 'express';
const router = express.Router();

router.get('/users', (req, res) => {
    console.log('Hello!');
    res.send('Hello!');
})

export default router