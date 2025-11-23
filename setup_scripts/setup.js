const fs = require('fs');
const path = require('path');
const mysql = require('mysql2');

const sqlFilePath = path.join(__dirname, '../public/db/menu.sql');

function initializeDatabase() {
    return new Promise((resolve, reject) => {
        const sql = fs.readFileSync(sqlFilePath, 'utf8');

        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '12345',
            multipleStatements: true
        });

        connection.query(sql, (err) => {
            if (err) {
                console.error('Database initialization failed:', err);
                reject(err);
            } else {
                console.log('Database initialized successfully from menu.sql!');
                resolve();
            }
            connection.end();
        });
    });
}

module.exports = initializeDatabase;
