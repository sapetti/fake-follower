const mongoose = require('mongoose')

module.exports.connect = function() {
  const dbUsername = process.env.DB_USERNAME
  const dbPassword = process.env.DB_PASSWORD
  const dbHost = process.env.DB_HOST
  const dbPort = process.env.DB_PORT
  const dbName =process.env.DB_NAME
  console.log(`mongodb://${dbUsername}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`)
  return mongoose.connect(`mongodb://${dbUsername}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`,
                          { 
                            useNewUrlParser: true,
                            useUnifiedTopology: true,
                          },
                          () => 'Connected!')
}