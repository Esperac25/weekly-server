const Pool = require('pg').Pool;

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    port: process.env.PORT || 5432,
    database: process.env.DATABASE || 'dcm486nsmd43ug',
    password: process.env.PASSWORD,
    URI: 'postgres://gxqwryurhazjnz:7bf8033790cba14a418f2f6c142244a75efabbf5cba678265b6d325a732b3326@ec2-54-160-18-230.compute-1.amazonaws.com:5432/dcm486nsmd43ug'
});

module.exports = pool;