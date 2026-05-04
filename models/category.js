import { DataTypes } from 'sequelize';
import sequelize from '../utils/db-connection.js';

const Category = sequelize.define('category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

export default Category;
