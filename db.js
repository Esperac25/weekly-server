const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'gxqwryurhazjnz',
    host: 'ec2-54-160-18-230.compute-1.amazonaws.com',
    port: 5432,
    database: 'dcm486nsmd43ug',
    password: '7bf8033790cba14a418f2f6c142244a75efabbf5cba678265b6d325a732b3326'
});

module.exports = pool;