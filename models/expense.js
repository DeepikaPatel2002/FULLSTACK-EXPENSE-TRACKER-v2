
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db-connection.js');

const Expense = sequelize.define('Expense', {

  id: { type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true
   },

  amount: { type: DataTypes.DECIMAL(10,2), 
    allowNull: false
   },

  description: { type: DataTypes.STRING, 
    allowNull: false
   },

  categoryId: { type: DataTypes.INTEGER, 
    allowNull: false 
  }
}, {
  tableName: 'expenses',
  timestamps: true,
});

module.exports = Expense;
