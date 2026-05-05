

const User = require('./user.js');
const Category = require('./category.js');
const Expense = require('./expense.js');

// Associations
User.hasMany(Expense, { foreignKey: 'userId' });
Expense.belongsTo(User, { foreignKey: 'userId' });

Category.hasMany(Expense, { foreignKey: 'categoryId' });
Expense.belongsTo(Category, { foreignKey: 'categoryId' });

module.exports = { User, Category, Expense };

