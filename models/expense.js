
import { DataTypes } from 'sequelize';
import sequelize from '../utils/db-connection.js';

const Expense = sequelize.define('Expense', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true, 
  },
  amount: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'expenses',
  timestamps: true,
});

export default Expense;

