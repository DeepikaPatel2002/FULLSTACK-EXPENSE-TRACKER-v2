
const { Expense, User, Category } = require('../models/index.js');

// GET all expenses with associations
const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll({
      include: [

        { model: Category, attributes: ['id', 'name'] }
      ]
    });
    res.status(200).json({ expenses });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST create expense
// expenseController.js
const createExpense = async (req, res) => {
  try {
    const { amount, description, category } = req.body;

    // find or create category
    const categoryRecord = await Category.findOne({ where: { name: category } });
    if (!categoryRecord) {
      return res.status(400).json({ error: "Invalid category" });
    }

    // create expense
    const newExpense = await Expense.create({
      amount,
      description,
      categoryId: categoryRecord.id
    });

    // fetch with category join
    const expenseWithCategory = await Expense.findByPk(newExpense.id, {
      include: [{ model: Category, attributes: ["id", "name"] }]
    });

    res.json({ newExpenseDetail: expenseWithCategory });
  } catch (err) {
    res.status(500).json({ error: "Failed to add expense" });
  }
};


/// expenseController.js
const updateExpense = async (req, res) => {
  try {
    const { amount, description, category } = req.body;
    const { id } = req.params;

    // find category record
    const categoryRecord = await Category.findOne({ where: { name: category } });
    if (!categoryRecord) {
      return res.status(400).json({ error: "Invalid category" });
    }

    // update expense
    await Expense.update(
      { amount, description, categoryId: categoryRecord.id },
      { where: { id } }
    );

    // fetch updated expense with category join
    const updatedExpense = await Expense.findByPk(id, {
      include: [{ model: Category, attributes: ["id", "name"] }]
    });

    res.json(updatedExpense);
  } catch (err) {
    res.status(500).json({ error: "Failed to update expense" });
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
