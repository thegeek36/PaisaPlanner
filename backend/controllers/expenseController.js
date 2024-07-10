const ExpenseSchema = require("../models/Expense");
const mongoose = require('mongoose');

exports.addExpense = async (req, res) => {
    const { amount, category, description, date } = req.body;

    const expense = new ExpenseSchema({
        amount,
        category,
        description,
        date,
        user: req.user._id,
        type: 'expense'
    });

    try {
        if (!category || !description) {
            return res.status(404).json({ message: 'Please fill all fields' });
        }
        if (amount <= 0 || typeof amount !== 'number') {
            return res.status(404).json({ message: 'Amount must be a positive number' });
        }
        await expense.save();
        res.status(200).json({ message: "Expense added successfully" });
    } catch (error) {
        console.error("Error", error);
        res.status(500).json({ message: "An error occurred" });
    }
};

exports.getExpenses = async (req, res) => {
    try {
        const userId = req.user._id;

        const expenses = await ExpenseSchema.find({ user: userId }).sort({ date: -1 });

        res.status(200).json(expenses);
    } catch (error) {
        console.error("Error", error);
        res.status(500).json({ message: "An error occurred" });
    }
};

exports.updateExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const { amount, category, description } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid expense ID format" });
        }

        const expense = await ExpenseSchema.findOne({ _id: id, user: userId });

        if (!expense) {
            return res.status(404).json({ message: "Expense not found or you don't have permission to edit it" });
        }

        expense.amount = amount || expense.amount;
        expense.category = category || expense.category;
        expense.description = description || expense.description;

        const updatedExpense = await expense.save();

        res.status(200).json({ message: "Expense updated successfully", expense: updatedExpense });
    } catch (error) {
        console.error("Error in updateExpense:", error);
        res.status(500).json({ message: "An error occurred while updating the expense" });
    }
};

exports.deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const deletedExpense = await ExpenseSchema.findOneAndDelete({ _id: id, user: userId });

        if (!deletedExpense) {
            return res.status(404).json({ message: "Expense not found or you don't have permission to delete it" });
        }

        res.status(200).json({ message: "Expense deleted successfully", deletedExpense });
    } catch (error) {
        console.error("Error in deleteExpense:", error);
        res.status(500).json({ message: "An error occurred while deleting the expense" });
    }
};
