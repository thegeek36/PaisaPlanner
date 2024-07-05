// Import Mongoose
const mongoose = require('mongoose');

// Define the Expense Schema
const expenseSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
        min: 0, // Ensure the expense amount is not negative
    },
    description: {
        type: String,
        trim: true, // Remove leading and trailing whitespace
    },
    date: {
        type: Date,
        default: Date.now, // Default to the current date
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Reference to the Category model
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
}, { timestamps: true }); // Add createdAt and updatedAt fields

// Export the Expense Model
module.exports = mongoose.model('Expense', expenseSchema);
