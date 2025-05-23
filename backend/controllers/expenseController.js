// backend/controllers/expenseController.js
const Expense = require('../models/Expense');

exports.addExpense = async (req, res) => {
  const { userId, name, amount } = req.body;
  try {
    const expense = await Expense.create({ userId, name, amount });
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ message: 'Error adding expense' });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.params.userId });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching expenses' });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting expense' });
  }
};
