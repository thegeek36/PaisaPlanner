// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming you have a User model
const dotenv = require('dotenv');
const mongoose = require('mongoose');


const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Authentication token is missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        //console.log(decoded._id)
        //console.log(typeof decoded._id, decoded._id);
        const user = await mongoose.model('User').findById(decoded._id);  // Find user by ID in token
        //console.log(user)
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user; // Attach user information to req object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Error in authentication middleware:', error);
        res.status(401).json({ message: 'Invalid authentication token auth.js' });
    }
};

module.exports = authMiddleware;

