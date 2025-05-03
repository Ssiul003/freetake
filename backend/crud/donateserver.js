import express from 'express';
import sql from 'mssql';
import { connectToDatabase } from '../server.js';

const router = express.Router();

const fieldTypeMap = {
  name: sql.NVarChar,
  group_Id: sql.Int,
  category: sql.NVarChar,
  quantity: sql.Int,
  expiration: sql.DateTime,
  ImageData: sql.VarBinary
}

  router.post('/donate', async (req, res) => {
    const { name, group_Id, category, quantity, expiration, ImageData } = req.body;
    if(!name || !group_Id || !category || !quantity || !expiration)
        return res.status(400).json({message: "Missing required fields"});
  
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
