require('dotenv').config();

module.exports = {
  "migrationsDirectory": "migrations",
  "driver": "pg",
  "connectionString": process.env.DATABASE_URL || 'postgres://hgedvcbsviqevj:4613af01a407bee5aa4e99e1e6341decd272eb6c2acc431d87ea4d8677942681@ec2-50-19-32-202.compute-1.amazonaws.com:5432/d5vqr0ims776po'
};