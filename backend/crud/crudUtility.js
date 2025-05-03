import sql from 'mssql'
import { connectToDatabase } from '../server.js'

/*
            THESE ARE DYNAMICALLY BUILDING QUERIES 
Later implementation must ensure no form of SQL injection can occur!
Test implementation idea is to have a central config of some sort.
List of valid columns per tableName?
*/
export async function getField(tableName, name, value){
    try {
        const pool = await connectToDatabase();

        const fieldExist = await pool.request()
        .input(name, sql.NVarChar, value)
        .query(`SELECT * FROM [FreeTake].[${tableName}] WHERE ${name} = @${name}`);

        return fieldExist.recordset;
    } catch(err) {
        return [];
    }
}

export async function create(tableName, fields, fieldTypeMap){
    const pool = await connectToDatabase();
    const request = await pool.request();

    const fieldNames = [];
    const fieldParams = [];

    for (const [key, value] of Object.entries(fields)) {
      if (value !== undefined) {
        fieldNames.push(key);
        fieldParams.push(`@${key}`);
        const fieldType = fieldTypeMap[key] || sql.NVarChar;
        request.input(key, fieldType, value);
      } else { return res.status(500).json({ message: 'New parameter not defined.' }); }
    }

    const query = `INSERT INTO [FreeTake].[${tableName}] (${fieldNames.join(', ')})
      VALUES (${fieldParams.join(', ')})`;

    await request.query(query);
}

// This is excessive amount of parameters, will be refactored soon
export async function update(tableName, name, value, fields, fieldTypeMap){
    const pool = await connectToDatabase();
    const request = await pool.request();

    const updateFields = [];
    for (const [key, value] of Object.entries(fields)) {
      if (value !== undefined) {
        updateFields.push(`${key} = @${key}`);
        const fieldType = fieldTypeMap[key];
        request.input(key, fieldType, value);
      }
    }
    
    request.input(name, sql.Int, value);
    const query = `UPDATE [FreeTake].[${tableName}] SET ${updateFields.join(', ')} WHERE ${name} = @${name}`;

    const result = await request.query(query);

    if (result.rowsAffected[0] === 0) {
      return false;
    } else return true;
}

export async function crudDelete(tableName, name, value){
    const pool = await connectToDatabase();
    
    const result = await pool.request()
    .input(`${name}`, sql.Int, value)
    .query(`DELETE FROM [FreeTake].[${tableName}] WHERE ${name} = @${name}`);

    if (result.rowsAffected[0] === 0) {
        return false;
      } else return true;
}