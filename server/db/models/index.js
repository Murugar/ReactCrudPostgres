const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    phone: Sequelize.STRING
})


module.exports = {User}