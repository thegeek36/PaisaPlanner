const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    frequency: {
        type: String,
        enum: ['weekly', 'monthly', 'quarterly', 'biannual', 'yearly'],
        required: true
    },
    nextDueDate: {
        type: Date,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    description: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Subscription', SubscriptionSchema);