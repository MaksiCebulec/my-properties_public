const Pool = require('pg').Pool;

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    port: '5432',
    password: 'Geslo2023',
    database: 'myproperties'
});

module.exports = pool;