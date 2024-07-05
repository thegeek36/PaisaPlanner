// controllers/categoryController.js
const Category = require('../models/Category');

// Add a new category
exports.addCategory = async (req, res) => {
    const { name, type,user } = req.body;
    //const userId = req.user.id; // Assuming user is authenticated and user ID is available in req.user

    try {
        // Create new category
        const category = new Category({
            name,
            type,
            user
        });

        // Save category to database
        await category.save();
        res.json(category);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
