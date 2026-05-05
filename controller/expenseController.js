
const { Expense, User, Category } = require('../models/index.js');

// GET all expenses with associations
const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll({
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: Category, attributes: ['id', 'name'] }
      ]
    });
    res.status(200).json({ expenses });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST create expense
const createExpense = async (req, res) => {
  try {
    const { amount, description, category, userId } = req.body;

    // Find or create category dynamically
    const [categoryRecord] = await Category.findOrCreate({ where: { name: category } });

    const expense = await Expense.create({
      amount,
      description,
      categoryId: categoryRecord.id,
      userId
    });

    res.status(201).json({ newExpenseDetail: expense });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT update expense
const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findByPk(req.params.id);
    if (!expense) return res.status(404).json({ error: 'Expense not found' });

    const { amount, description, category } = req.body;

    // Update category dynamically
    const [categoryRecord] = await Category.findOrCreate({ where: { name: category } });

    await expense.update({
      amount,
      description,
      categoryId: categoryRecord.id
    });

    res.status(200).json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE expense
const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findByPk(req.params.id);
    if (!expense) return res.status(404).json({ error: 'Expense not found' });

    await expense.destroy();
    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllExpenses,
  createExpense,
  updateExpense,
  deleteExpense
};
