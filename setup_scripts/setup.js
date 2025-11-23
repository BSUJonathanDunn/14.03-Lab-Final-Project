const fs = require('fs');
const path = require('path');
const mysql = require('mysql2');

const menuFilePath = path.join(__dirname, '../public/db/menu.sql');
const commFilePath = path.join(__dirname, '../public/db/comments.sql');

function initializeDatabase() {
    return new Promise((resolve, reject) => {
        const menuSql = fs.readFileSync(menuFilePath, 'utf8');
        const commSql = fs.readFileSync(commFilePath, 'utf8');

        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '12345',
            multipleStatements: true
        });

        connection.query(menuSql, (err) => {
            if (err) {
                console.error('Database initialization failed (menu.sql):', err);
                connection.end();
                return reject(err);
            }

            console.log('Database initialized successfully from menu.sql!');

            // Run second SQL ONLY after first completes
            connection.query(commSql, (err) => {
                if (err) {
                    console.error('Database initialization failed (comments.sql):', err);
                    connection.end();
                    return reject(err);
                }

                console.log('Database initialized successfully from comments.sql!');

                connection.end();
                resolve();
            });
        });
    });
}

module.exports = initializeDatabase;
