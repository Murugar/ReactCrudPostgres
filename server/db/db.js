const Sequelize = require('sequelize');

const db = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost/sample', {
  logging: false
  
});

module.exports = db;
