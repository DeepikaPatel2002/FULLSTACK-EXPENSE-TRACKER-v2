

const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('expense_tracker', 'root', '987654', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
