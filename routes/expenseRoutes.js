

import express from 'express';
import expenseController from '../controller/expenseController.js';

import authenticate from '../middleware/auth.js';

const router = express.Router();


router.get('/get-expense', authenticate, expenseController.getAllExpenses);

router.get('/get-expense/:id',authenticate, expenseController.getExpenseById);

router.post('/add-expense', authenticate,expenseController.createExpense);

router.put('/edit-expense/:id', authenticate,expenseController.updateExpense);

router.delete('/delete-expense/:id', authenticate,expenseController.deleteExpense);

export default router;