// src/lib/db.ts
import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost',         // Your database host
  user: 'root',              // Your MySQL username
  password: '',              // Your MySQL password
  database: 'login_app',     // The database name
  port: 3307,                // MySQL default port as a number
});

export default db;
