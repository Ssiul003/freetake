import express from 'express';
import sql from 'mssql';
import { connectToDatabase } from '../server.js';

const router = express.Router();
/*
  Don't try this
  This creates a whole new table unrelated to the database
  This will be rewritten to FreeTake.Food_Listing (Which has foreign keys to other information aswell)
  */
  router.post('/donate', async (req, res) => {
    const { foodName, category, quantity, date, imageUrl } = req.body;
  
    try {
      const pool = await connectToDatabase();
      await pool.request()
        .input('Category', sql.NVarChar, category)
        .input('Quantity', sql.Int, parseInt(quantity))
        .input('Date', sql.DateTime, new Date(date))
        .input('Image', sql.NVarChar, imageUrl)
        .input('FoodName', sql.NVarChar, foodName)
        .query(`
          INSERT INTO FreeTake.Food_Listing (Category, Quantity, Date, Image, FoodName)
          VALUES (@Category, @Quantity, @Date, @Image, @FoodName)
        `);
  
      res.status(200).json({ message: "Food listing saved successfully" });
    } catch (err) {
      console.error("Insert error:", err);
      res.status(500).json({ error: "Failed to save food listing" });
    }
  });
  
  //GET route to fetch all food listings
  router.get('/donate', async (req, res) => {
    try {
      const pool = await connectToDatabase();
      const result = await pool.request()
        .query('SELECT * FROM FreeTake.Food_Listing ORDER BY Date DESC');
      res.status(200).json(result.recordset);
    } catch (err) {
      console.error("Fetch error:", err);
      res.status(500).json({ error: "Failed to fetch food listings" });
    }
  });
  
  export default router;
