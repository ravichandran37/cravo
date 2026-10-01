const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../.env') });

async function run() {
  const host = process.env.DB_HOST || 'localhost';
  const port = Number(process.env.DB_PORT) || 3306;
  const user = process.env.DB_USER || 'root';
  const password = process.env.DB_PASSWORD || '';
  const database = process.env.DB_NAME || 'cravo_db';

  console.log(`[DB Init] Connecting to MySQL server at ${host}:${port} as user "${user}"...`);

  try {
    const conn = await mysql.createConnection({
      host,
      port,
      user,
      password,
      multipleStatements: true,
    });

    console.log(`[DB Init] Connected! Executing schema.sql...`);
    const schemaSql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    await conn.query(schemaSql);
    console.log(`[DB Init] Database "${database}" and tables created successfully!`);

    console.log(`[DB Init] Executing seeds.sql...`);
    const seedsSql = fs.readFileSync(path.join(__dirname, 'seeds.sql'), 'utf8');
    await conn.query(seedsSql);
    console.log(`[DB Init] Seed data inserted successfully!`);

    await conn.end();
    console.log(`[DB Init] Finished! Your MySQL database is ready for Cravo Kitchen & Bar.`);
    process.exit(0);
  } catch (err) {
    console.error(`[DB Init Error] Failed to initialize MySQL:`, err.message);
    console.error(`\nPlease ensure that:`);
    console.error(`1. MySQL service is running on ${host}:${port}`);
    console.error(`2. DB_USER and DB_PASSWORD in server/.env are correct`);
    process.exit(1);
  }
}

run();
