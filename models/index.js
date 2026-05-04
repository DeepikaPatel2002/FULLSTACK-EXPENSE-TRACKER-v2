
import User from './user.js';
import Category from './category.js';
import Expense from './expense.js';

User.hasMany(Expense, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Expense.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Expense.belongsToMany(Category, { through: 'ExpenseCategories' });
Category.belongsToMany(Expense, { through: 'ExpenseCategories' });

export {
  User,
  Category,
  Expense
};