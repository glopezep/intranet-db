module.exports = {
  dbName: process.env.DB_NAME || 'intranetdb',
  dbUser: process.env.DB_USER || 'guillermo',
  dbPassword: process.env.DB_PASSWORD || 'Nilcia0525',
  extra: {
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'postgres',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  }
}
