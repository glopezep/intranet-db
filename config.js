module.exports = {
  dbName: process.env.DB_NAME || 'intranetdb',
  dbUser: process.env.DB_USER || 'root',
  dbPassword: process.env.DB_PASSWORD || '',
  extra: {
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'mysql',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  }
}
