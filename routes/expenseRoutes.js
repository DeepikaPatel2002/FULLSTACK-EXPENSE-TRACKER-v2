
const express = require('express');
const {
  getAllExpenses,
  createExpense,
  deleteExpense,
  updateExpense
} = require('../controller/expenseController.js');

const router = express.Router();

router.get('/get-expense', getAllExpenses);
router.post('/add-expense', createExpense);
router.delete('/delete-expense/:id', deleteExpense);
router.put('/edit-expense/:id', updateExpense); // bonus

module.exports = router;
