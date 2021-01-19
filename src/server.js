const knex = require('knex');
// const pg = require('pg');
const app = require('./app');
const { PORT, DATABASE_URL } = require('./config');

// pg.defaults.ssl = true;

const db = knex({
	client: 'pg',
	connection: DATABASE_URL
});

app.set('db', db);

app.listen(PORT, () => {
	console.log(`Express server is listening at http://localhost:${PORT}`);
});
