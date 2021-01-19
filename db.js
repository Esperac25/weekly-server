const Pool = require('pg').Pool;

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    port: process.env.PORT || 5432,
    database: process.env.DATABASE || 'dcm486nsmd43ug',
    password: process.env.PASSWORD 
});

module.exports = pool;