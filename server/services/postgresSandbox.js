const pool = require("../db/postgres");

async function executeSandboxQuery(query, tables) {

  const client = await pool.connect();

  try {

    await client.query("BEGIN");

    for (const table of tables) {

      const columnsSQL = table.columns
        .map(c => `${c.columnName} ${c.dataType}`)
        .join(",");

      await client.query(
        `CREATE TEMP TABLE ${table.tableName} (${columnsSQL})`
      );

      for (const row of table.rows) {

        const keys = Object.keys(row);
        const values = Object.values(row);

        const placeholders = keys
          .map((_,i)=>`$${i+1}`)
          .join(",");

        await client.query(
          `INSERT INTO ${table.tableName}
           (${keys.join(",")})
           VALUES (${placeholders})`,
          values
        );

      }

    }

    const result = await client.query(query);

    await client.query("ROLLBACK");

    return result;

  } catch (err) {

    await client.query("ROLLBACK");

    throw err;

  } finally {

    client.release();

  }

}

module.exports = executeSandboxQuery;