const Subscription = require('../models/Subscriptions');
const mongoose = require('mongoose');
exports.addSubscription = async (req, res) => {
    try {
        const { name, amount, frequency, nextDueDate, category, description } = req.body;
        const newSubscription = new Subscription({
            name,
            amount,
            frequency,
            nextDueDate,
            category,
            description,
            user: req.user.id
        });
        await newSubscription.save();
        res.status(201).json(newSubscription);
    } catch (error) {
        res.status(500).json({ message: 'Error adding subscription', error: error.message });
    }
};

exports.getSubscriptions = async (req, res) => {
    try {
        const subscriptions = await Subscription.find({ user: req.user.id }).populate('category');
        res.status(200).json(subscriptions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching subscriptions', error: error.message });
    }
};

exports.updateSubscription = async (req, res) => {
    try {
        const { name, amount, frequency, nextDueDate, category, description } = req.body;
        const updatedSubscription = await Subscription.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            { name, amount, frequency, nextDueDate, category, description },
            { new: true }
        );
        if (!updatedSubscription) {
            return res.status(404).json({ message: 'Subscription not found' });
        }
        res.status(200).json(updatedSubscription);
    } catch (error) {
        res.status(500).json({ message: 'Error updating subscription', error: error.message });
    }
};

exports.deleteSubscription = async (req, res) => {
    try {
        const deletedSubscription = await Subscription.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        if (!deletedSubscription) {
            return res.status(404).json({ message: 'Subscription not found' });
        }
        res.status(200).json({ message: 'Subscription deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting subscription', error: error.message });
    }
};