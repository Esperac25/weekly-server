require('dotenv').config();

module.exports = {
	migrationsDirectory: 'migrations',
	driver: 'pg',
	connectionString:
		process.env.DATABASE_URL ||
		'postgres://eftbqwnnkwmvqr:99d0fbc9702b4adfab80bf1258fea5fe2046df17984266561dfe3344f6c5c38a@ec2-3-226-231-4.compute-1.amazonaws.com:5432/daqaosql6qj2q7'
};
