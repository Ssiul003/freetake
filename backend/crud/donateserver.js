import express from 'express';
import sql from 'mssql';
import { connectToDatabase } from '../server.js';
import { getField, create, update, crudDelete } from './crudUtility.js';

const router = express.Router();
const tableName = 'Food_Listing';
const primaryKey = 'Listing_ID';

const fieldTypeMap = {
    name: sql.NVarChar,
    category: sql.NVarChar,
    quantity: sql.Int,
    expiration: sql.DateTime,
    ImageData: sql.VarBinary
};

router.post('/donate', async (req, res) => {
    const { name, category, quantity, expiration, pickupTime, imageUrl } = req.body;

    if (!name || !category || !quantity || !expiration || !pickupTime || !imageUrl) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const expirationDateTime = new Date(`${expiration.split('T')[0]}T${pickupTime}`);
        const imageBuffer = imageUrl?.startsWith("data:image/")
            ? Buffer.from(imageUrl.split(",")[1], 'base64')
            : null;

        const fields = {
            Name: name,
            Category: category,
            Quantity: parseInt(quantity),
            ExpirationDate: expirationDateTime,
            ImageData: imageBuffer
        };

        await create(tableName, fields, {
            Name: fieldTypeMap.name,
            Category: fieldTypeMap.category,
            Quantity: fieldTypeMap.quantity,
            ExpirationDate: fieldTypeMap.expiration,
            ImageData: fieldTypeMap.ImageData
        });

        res.status(200).json({ message: "Food listing saved successfully" });
    } catch (err) {
        console.error("Create error:", err);
        res.status(500).json({ error: "Failed to save food listing" });
    }
});

router.get('/donate', async (req, res) => {
    try {
        const pool = await connectToDatabase();
        const result = await pool.request().query(`
            SELECT Listing_ID, Name, Category, Quantity, ExpirationDate, ImageData
            FROM FreeTake.Food_Listing
            ORDER BY ExpirationDate DESC
        `);

        const listings = result.recordset.map(row => {
            const base64Image = row.ImageData
                ? Buffer.from(row.ImageData).toString('base64')
                : null;

            return {
                id: row.Listing_ID,
                name: row.Name,
                category: row.Category,
                quantity: row.Quantity,
                expiration: row.ExpirationDate?.toISOString().split("T")[0],
                pickupTime: row.ExpirationDate?.toISOString().split("T")[1]?.slice(0, 5),
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
        const expirationDateTime = new Date(`${expiration.split('T')[0]}T${pickupTime}`);
        const imageBuffer = imageUrl?.startsWith("data:image/")
            ? Buffer.from(imageUrl.split(",")[1], 'base64')
            : null;

        const fields = {
            Name: name,
            Category: category,
            Quantity: parseInt(quantity),
            ExpirationDate: expirationDateTime,
            ImageData: imageBuffer
        };

        const success = await update(
            tableName,
            primaryKey,
            parseInt(id),
            fields,
            {
                Name: fieldTypeMap.name,
                Category: fieldTypeMap.category,
                Quantity: fieldTypeMap.quantity,
                ExpirationDate: fieldTypeMap.expiration,
                ImageData: fieldTypeMap.ImageData
            }
        );

        if (!success) {
            return res.status(404).json({ message: "Listing not found" });
        }

        res.status(200).json({ message: "Food listing updated successfully" });
    } catch (err) {
        console.error("Update error:", err);
        res.status(500).json({ error: "Failed to update food listing" });
    }
});

router.delete('/donate/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const success = await crudDelete(tableName, primaryKey, parseInt(id));
        if (!success) {
            return res.status(404).json({ message: "Listing not found" });
        }

        res.status(200).json({ message: "Food listing deleted successfully" });
    } catch (err) {
        console.error("Delete error:", err);
        res.status(500).json({ error: "Failed to delete food listing" });
    }
});

export default router;