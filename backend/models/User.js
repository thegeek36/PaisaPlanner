// models/User.js

const mongoose = require('mongoose'); // Importing mongoose for creating schema and model
const bcrypt = require('bcryptjs'); // Importing bcrypt for password hashing
require('dotenv').config(); // Load environment variables from .env file
const jwt = require('jsonwebtoken'); // Importing jsonwebtoken for generating JWT tokens
const Joi = require('joi'); // Importing Joi for schema validation
const passwordComplexity = require('joi-password-complexity'); // Importing passwordComplexity for password validation

// Defining the schema for User
const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true // First name is required
    },
    lastname: {
        type: String,
        required: true // Last name is required
    },
    email: {
        type: String,
        required: true, // Email is required
        unique: true // Email must be unique
    },
    password: {
        type: String,
        required: true // Password is required
    },
    avatar: {
        type: String,
        default: '' // Default value for avatar
    }
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields

// Method to generate an authentication token
UserSchema.methods.generateAuthToken = function () {
    // Generate a JWT token with user ID and secret key
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return token;
};

// Middleware to hash the password before saving the user
// UserSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) return next(); // If password is not modified, skip hashing
//     const salt = await bcrypt.genSalt(10); // Generate salt for hashing
//     this.password = await bcrypt.hash(this.password, salt); // Hash the password
//     next(); // Move to the next middleware
// });

// Function to validate user data using Joi
const validate = (data) => {
    const schema = Joi.object({
        firstname: Joi.string().required().label("First Name"),
        lastname: Joi.string().required().label("Last Name"),
        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password")
    });
    return schema.validate(data); // Validate the data and return the result
}

// Export the User model and the validate function
module.exports = {
    User: mongoose.model('User', UserSchema),
    validate
};
