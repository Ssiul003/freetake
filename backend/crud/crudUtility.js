import sql from 'mssql'

/*
            THESE ARE DYNAMICALLY BUILDING QUERIES 
Later implementation must ensure no form of SQL injection can occur!
Test implementation idea is to have a central config of some sort.
List of valid columns per tableName?
*/
export async function getField(pool, tableName, name, value){
    try {
        const fieldExist = await pool.request()
        .input(name, sql.NVarChar, value)
        .query(`SELECT * FROM [FreeTake].[${tableName}] WHERE  ${name} = @${name}`);

        return fieldExist.recordset;
    } catch(err) {
        return [];
    }
}

export async function create(request, tableName, fields, fieldTypeMap){
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