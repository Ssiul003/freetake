import sql from 'mssql'

export async function fieldExist(pool, tableName, name, value){
    const fieldExist = await pool.request()
    .input(name, sql.NVarChar, value)
    .query('SELECT 1 FROM [FreeTake].['+ tableName +'] WHERE ' + name + ' = @' + name);

    return fieldExist.recordset.length > 0?true:false;
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

    const query = `INSERT INTO [FreeTake].[`+ tableName +`] (${fieldNames.join(', ')})
      VALUES (${fieldParams.join(', ')})`;

    await request.query(query);
}