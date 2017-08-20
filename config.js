module.exports = {
  dbName: process.env.DB_NAME || 'intranetdb',
  dbUser: process.env.DB_USER || 'glopezep',
  dbPassword: process.env.DB_PASSWORD || 'Guillermo@0525',
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
