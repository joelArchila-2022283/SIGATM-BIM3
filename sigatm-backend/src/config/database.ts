import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root', 
    password: 'admin', 
    database: 'sigatm_in5cm', 
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});