const pool = require("../db/postgres");

async function executeSandboxQuery(query, tables) {
  const client = await pool.connect();

  try {
    // =========================
    // Start Isolated Transaction
    // =========================
    await client.query("BEGIN");

    // =========================
    // Prevent Long Running Queries
    // 5 seconds max execution
    // =========================
    await client.query("SET statement_timeout = 5000");

    // =========================
    // Create Temporary Tables
    // =========================
    for (const table of tables) {
      const columnsSQL = table.columns
        .map((c) => `${c.columnName} ${c.dataType}`)
        .join(",");

      await client.query(
        `CREATE TEMP TABLE ${table.tableName} (${columnsSQL})`
      );

      // =========================
      // Insert Sample Rows
      // =========================
      for (const row of table.rows) {
        const keys = Object.keys(row);
        const values = Object.values(row);

        const placeholders = keys
          .map((_, i) => `$${i + 1}`)
          .join(",");

        await client.query(
          `INSERT INTO ${table.tableName}
           (${keys.join(",")})
           VALUES (${placeholders})`,
          values
        );
      }
    }

    // =========================
    // Execute User Query
    // =========================
    const result = await client.query(query);

    // =========================
    // Rollback Everything
    // Removes temp tables automatically
    // =========================
    await client.query("ROLLBACK");

    return result;

  } catch (err) {

    // =========================
    // Always rollback on error
    // =========================
    await client.query("ROLLBACK");

    // Friendly timeout message
    if (err.code === "57014") {
      throw new Error(
        "Query timeout exceeded (5 seconds limit)"
      );
    }

    throw err;

  } finally {

    // =========================
    // Release Connection
    // =========================
    client.release();

  }
}

module.exports = executeSandboxQuery;