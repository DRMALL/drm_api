'use strict'

module.exports = {
  env: 'production',
  db: process.env.MONGOHQ_URL || process.env.MONGODB_URL,
  port: process.env.PORT || 4000,
}