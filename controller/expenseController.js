

// const addExpense = async (req, res) => {
//   const { amount, description, category } = req.body;

//   try {
//     const newExpense = await Expense.create({
//       amount,
//       description,
//       category,
//     });

//     res.status(201).json({ message: 'successfully', newExpenseDetail:newExpense});
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


// const getExpense = async (req, res) => {
//   try {
//     const getAllExpense = await Expense.findAll();
//       res.status(200).json(getAllExpense)
   
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


// const editExpense = async (req, res) => {
//   try {
//     const expenseId = req.params.id;
//     const { amount, description, category } = req.body;

//     await Expense.update(
//       { amount, description, category },
//       {
//         where: {
//           id: expenseId,
//         },
//       }
//     );

//     res.status(200).json({ message: 'successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// const deleteExpense = async (req, res) => {

//       const expenseId = req.params.id;
//   try {
  

//     await Expense.destroy({
//       where: {
//         id: expenseId,
//       },
//     });

//     res.status(200).json({ message: 'successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// module.exports = {
//   addExpense,
//   getExpense,
//   editExpense,
//   deleteExpense,
// };

import Expense from '../models/expense.js';

// GET all expenses
const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    res.status(200).json({expenses});
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
};


// GET single expense by ID
const getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findByPk(req.params.id);
    if (!expense) return res.status(404).json({ error: 'Expense not found' });
    res.status(200).json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST create expense 
const createExpense = async (req, res) => {
  try {
    const { amount, description, category } = req.body;
    const expense = await Expense.create({ 
      amount, 
      description, 
      category,
      
    });
    res.status(201).json({newExpenseDetail:expense});
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message });
  }
};

// PUT update expense
const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findByPk(req.params.id);
    if (!expense) return res.status(404).json({ error: 'Expense not found' });
    const { amount, description, category } = req.body;
    await expense.update({ amount, description, category });
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

export default {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense
};