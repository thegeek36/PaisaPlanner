// controllers/UserSummaryController.js
const Income = require('../models/Income');
const Expense = require('../models/Expense');
const Category = require('../models/Category');
const Subscription = require('../models/Subscriptions');
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

        // Aggregate total subscriptions
        const totalSubscriptionData = await Subscription.aggregate([
            { $match: { user: userId } },
            { $group: { _id: null, totalSubscription: { $sum: '$amount' } } }
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

        // Get upcoming subscriptions
        const upcomingSubscriptions = await Subscription.find({
            user: userId,
            nextDueDate: { $gte: new Date(), $lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }
        }).populate('category').sort('nextDueDate');

        const totalIncome = totalIncomeData[0]?.totalIncome || 0;
        const totalExpense = totalExpenseData[0]?.totalExpense || 0;
        const totalSubscription = totalSubscriptionData[0]?.totalSubscription || 0;
        const totalExpenseWithSubscriptions = totalExpense + totalSubscription;
        const totalSaving = totalIncome - totalExpenseWithSubscriptions;

        const expenseCategory = expenseByCategoryData.reduce((acc, curr) => {
            acc[curr._id] = curr.totalAmount;
            return acc;
        }, {});

        // Calculate expense breakdown percentages
        const expenseBreakdown = expenseByCategoryData.map(category => ({
            category: category._id,
            amount: category.totalAmount,
            percentage: ((category.totalAmount / totalExpenseWithSubscriptions) * 100).toFixed(2)
        }));

        // Calculate savings rate
        const savingsRate = ((totalSaving / totalIncome) * 100).toFixed(2);

        res.json({
            name: user.firstname,
            totalIncome,
            totalExpense: totalExpenseWithSubscriptions,
            totalSubscription,
            totalSaving,
            savingsRate: parseFloat(savingsRate),
            expenseCategory,
            expenseBreakdown,
            upcomingSubscriptions: upcomingSubscriptions.map(sub => ({
                name: sub.name,
                amount: sub.amount,
                dueDate: sub.nextDueDate,
                category: sub.category.name
            })),
            financialHealth: calculateFinancialHealth(savingsRate, totalExpenseWithSubscriptions, totalIncome)
        });
    } catch (error) {
        console.error('Error fetching user summary:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const calculateFinancialHealth = (savingsRate, totalExpense, totalIncome) => {
    let health = 'Good';
    let advice = '';

    if (savingsRate < 10) {
        health = 'Poor';
        advice = 'Try to increase your savings rate to at least 20% of your income.';
    } else if (savingsRate < 20) {
        health = 'Fair';
        advice = "You're on the right track. Aim to increase your savings rate to 20% or more.";
    } else if (savingsRate >= 20) {
        health = 'Excellent';
        advice = 'Great job! Keep maintaining this savings rate.';
    }

    if (totalExpense > totalIncome) {
        health = 'Critical';
        advice = 'Your expenses exceed your income. Review your budget and cut unnecessary expenses.';
    }

    return { status: health, advice };
};

module.exports = {
    getUserSummary
};