// controllers/categoryController.js
const Category = require('../models/Category');

// utils/defaultCategories.js
const defaultCategories = [
    { name: 'Salary', type: 'income' },
    { name: 'Freelance', type: 'income' },
    { name: 'Investments', type: 'income' },
    { name: 'Groceries', type: 'expense' },
    { name: 'Rent', type: 'expense' },
    { name: 'Utilities', type: 'expense' },
    { name: 'Transportation', type: 'expense' },
  ];

// Add a custom category
exports.addCategory = async (req, res) => {
    const { name, type } = req.body;
    const userId = req.user.id; // Assuming user is authenticated

    try {
        // Check if category already exists for this user
        const existingCategory = await Category.findOne({ name, type, user: userId });
        if (existingCategory) {
            return res.status(400).json({ msg: 'Category already exists' });
        }

        // Create new category
        const category = new Category({
            name,
            type,
            user: userId
        });

        // Save category to database
        await category.save();
        res.json(category);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Add default categories for a new user
exports.addDefaultCategories = async (userId) => {
    try {
        const categories = defaultCategories.map(category => ({
            ...category,
            user: userId
        }));

        await Category.insertMany(categories);
    } catch (err) {
        console.error('Error adding default categories:', err);
    }
};

// Get all categories for a user
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find({ user: req.user.id });
        res.json(categories);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};