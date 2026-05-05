
import User from './user.js';
import Category from './category.js';
import Expense from './expense.js';

User.hasMany(Expense, { foreignKey: 'userId' });
Expense.belongsTo(User, { foreignKey: 'userId'});

Category.hasMany(Expense,   { foreignKey: 'categoryId', as: 'expenses' });
Expense.belongsTo(Category, { foreignKey: 'categoryId', as: 'expenseCategory' });

export {
  User,
  Category,
  Expense
};
