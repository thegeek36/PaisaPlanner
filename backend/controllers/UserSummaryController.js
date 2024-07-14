// controllers/UserSummaryController.js
const Income = require('../models/Income');
const Expense = require('../models/Expense');
const Category = require('../models/Category');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const getUserSummary = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).select('firstname');
        // Aggregate total income
        const totalIncomeData = await Income.aggregate([
            { $match: { user: userId } },
            { $group: { _id: null, totalIncome: { $sum: '$amount' } } }
        ]);

        // Aggregate total expense
        const totalExpenseData = await Expense.aggregate([
            { $match: { user: userId } },
            { $group: { _id: null, totalExpense: { $sum: '$amount' } } }
        ]);

        // Aggregate expense by category
        const expenseByCategoryData = await Expense.aggregate([
            { $match: { user: userId } },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'category',
                    foreignField: '_id',
                    as: 'categoryDetails'
                }
            },
            { $unwind: '$categoryDetails' },
            { $group: { _id: '$categoryDetails.name', totalAmount: { $sum: '$amount' } } }
        ]);

        const totalIncome = totalIncomeData[0]?.totalIncome || 0;
        const totalExpense = totalExpenseData[0]?.totalExpense || 0;
        const totalSaving = totalIncome - totalExpense;

        const expenseCategory = expenseByCategoryData.reduce((acc, curr) => {
            acc[curr._id] = curr.totalAmount;
            return acc;
        }, {});

        res.json({
            name:user.firstname,
            totalIncome,
            totalExpense,
            totalSaving,
            expenseCategory
        });
    } catch (error) {
        console.error('Error fetching user summary:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getUserSummary
};
