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
  const { name, category, quantity, expiration, pickupTime, imageUrl } = req.body;

  if (!name || !category || !quantity || !expiration || !pickupTime || !imageUrl) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const pool = await connectToDatabase();
    const expirationDateTime = new Date(`${expiration.split('T')[0]}T${pickupTime}`);

    let imageBuffer = null;
    if (imageUrl.startsWith("data:image/")) {
      const base64Data = imageUrl.split(",")[1];
      imageBuffer = Buffer.from(base64Data, 'base64');
    }

    await pool.request()
      .input('name', fieldTypeMap.name, name)
      .input('category', fieldTypeMap.category, category)
      .input('quantity', fieldTypeMap.quantity, parseInt(quantity))
      .input('expiration', fieldTypeMap.expiration, expirationDateTime)
      .input('ImageData', fieldTypeMap.ImageData, imageBuffer)
      .query(`
        INSERT INTO FreeTake.Food_Listing (Name, Category, Quantity, ExpirationDate, ImageData)
        VALUES (@name, @category, @quantity, @expiration, @ImageData)
      `);

    res.status(200).json({ message: "Food listing saved successfully" });
  } catch (err) {
    console.error("Insert error:", err);
    res.status(500).json({ error: "Failed to save food listing" });
  }
});

router.get('/donate', async (req, res) => {
  try {
    const pool = await connectToDatabase();
    const result = await pool.request()
      .query('SELECT Listing_ID, Name, Category, Quantity, ExpirationDate, ImageData FROM FreeTake.Food_Listing ORDER BY ExpirationDate DESC');

    const listings = result.recordset.map((row) => {
      let base64Image = null;
      if (row.ImageData) {
        base64Image = Buffer.from(row.ImageData).toString('base64');
      }

      return {
        id: row.Listing_ID,
        name: row.Name,
        category: row.Category,
        quantity: row.Quantity,
        expiration: row.ExpirationDate?.toISOString().split("T")[0],
        pickupTime: row.ExpirationDate?.toISOString().split("T")[1]?.slice(0, 5), // "HH:mm"
        image: base64Image ? `data:image/jpeg;base64,${base64Image}` : null,
        date: row.ExpirationDate?.toLocaleString()
      };
    });

    res.status(200).json(listings);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: "Failed to fetch food listings" });
  }
});

router.put('/donate/:id', async (req, res) => {
  const { id } = req.params;
  const { name, category, quantity, expiration, pickupTime, imageUrl } = req.body;

  if (!name || !category || !quantity || !expiration || !pickupTime || !imageUrl) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const pool = await connectToDatabase();
    const expirationDateTime = new Date(`${expiration.split('T')[0]}T${pickupTime}`);

    let imageBuffer = null;
    if (imageUrl.startsWith("data:image/")) {
      const base64Data = imageUrl.split(",")[1];
      imageBuffer = Buffer.from(base64Data, 'base64');
    }

    await pool.request()
      .input('group_Id', fieldTypeMap.group_Id, parseInt(id))
      .input('name', fieldTypeMap.name, name)
      .input('category', fieldTypeMap.category, category)
      .input('quantity', fieldTypeMap.quantity, parseInt(quantity))
      .input('expiration', fieldTypeMap.expiration, expirationDateTime)
      .input('ImageData', fieldTypeMap.ImageData, imageBuffer)
      .query(`
        UPDATE FreeTake.Food_Listing 
        SET Name = @name, Category = @category, Quantity = @quantity, ExpirationDate = @expiration, ImageData = @ImageData 
        WHERE Listing_ID = @group_Id
      `);

    res.status(200).json({ message: "Food listing updated successfully" });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update food listing" });
  }
});

router.delete('/donate/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await connectToDatabase();
    await pool.request()
      .input('group_Id', fieldTypeMap.group_Id, parseInt(id))
      .query('DELETE FROM FreeTake.Food_Listing WHERE Listing_ID = @group_Id');

    res.status(200).json({ message: "Food listing deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Failed to delete food listing" });
  }
});
 export default router;
