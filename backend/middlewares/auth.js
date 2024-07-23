const jwt = require('jsonwebtoken');
const { User } = require('../models/User'); // Adjust the path as necessary
const mongoose = require('mongoose');
require('dotenv').config();

const authMiddleware = async (req, res, next) => {
    try {
        // Attempt to extract the token from the Authorization header
        const authHeader = req.header('Authorization');
        
        // Log the raw Authorization header for debugging purposes
        //console.log("Raw Auth Header:", authHeader);

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authorization header is missing or invalid' });
        }
        
        // Extract the token by removing the 'Bearer ' prefix
        const token = authHeader.replace('Bearer ', '');

        // Log the extracted token for debugging purposes
        //console.log(`Extracted token: ${token}`);

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //console.log('User model:', User);
        //console.log("Decoded",decoded)
        // Find the user by id
        const user = await User.findById(decoded._id);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Attach the user to the request object
        req.user = user;
        req.token = token;

        next();
    } catch (error) {
        console.error('Error in authentication middleware:', error);

        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: 'Invalid token' });
        } else if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: 'Token expired' });
        }

        res.status(500).json({ message: 'Internal server error during authentication' });
    }
};

module.exports = authMiddleware;
