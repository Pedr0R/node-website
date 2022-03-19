const Sequelize = require('sequelize')
const db = require('../db/connection')

const User = db.define('user', {
  username: {
    type: Sequelize.TEXT
  },
  password: {
    type: Sequelize.TEXT
  },
  email: {
    type: Sequelize.TEXT
  },
  confirmed: {
    type: Sequelize.NUMBER
  }
})

module.exports = User