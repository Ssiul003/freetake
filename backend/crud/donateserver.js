
import express from 'express';
import sql from 'mssql';
import { connectToDatabase } from '../server.js'; 

const router = express.Router();

router.post('/donate', async (req, res) => {
  const { foodName, donorName, phone, location, imageUrl, donationDate } = req.body;
  
  try {
    const pool = await connectToDatabase();
    await pool.request()
      .input('foodName', sql.NVarChar, foodName)
      .input('donorName', sql.NVarChar, donorName)
      .input('phone', sql.NVarChar, phone)
      .input('location', sql.NVarChar, location)
      .input('imageUrl', sql.NVarChar, imageUrl)
      .input('donationDate', sql.DateTime, new Date(donationDate)) // Ensure it's a Date object
      .query(`
        INSERT INTO FoodDonations (foodName, donorName, phone, location, imageUrl, donationDate)
        VALUES (@foodName, @donorName, @phone, @location, @imageUrl, @donationDate)
      `);

    res.status(200).json({ message: "Donation saved successfully" });
  } catch (err) {
    console.error("Insert error:", err);
    res.status(500).json({ error: "Failed to save donation" });
  }
});

// Get all food donations
router.get('/donate', async (req, res) => {
  try {
    const pool = await connectToDatabase();
    const result = await pool.request().query('SELECT * FROM FoodDonations ORDER BY donationDate DESC');
    res.status(200).json(result.recordset);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: "Failed to fetch donations" });
  }
});

export default router;
