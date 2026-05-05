

import express from 'express';
import expenseController from '../controller/expenseController.js';

const router = express.Router();


router.get('/get-expense', expenseController.getAllExpenses);
router.get('/get-expense/:id', expenseController.getExpenseById);

router.post('/add-expense', expenseController.createExpense);

router.put('/edit-expense/:id', expenseController.updateExpense);

router.delete('/delete-expense/:id', expenseController.deleteExpense);

export default router;