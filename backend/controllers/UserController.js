
const {User,validate} = require('../models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const Joi = require('joi'); 
// Register a new user
exports.registerUser = async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    try {
        // Validate the input data
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(409).send({ message: "User with given email already exists" });
        }

        // Generate a salt and hash the password
        const salt = await bcrypt.genSalt(Number(process.env.SALT) || 10); // Default to 10 if SALT is not defined
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Save the new user
        const newUser = new User({ ...req.body, password: hashedPassword });
        await newUser.save();

        res.status(201).send({ message: "User created successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ message: 'Server error' });
    }
};

// Login user
// Validation function
const validateLogin = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password")
    });
    return schema.validate(data);
};

// Login user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validate user input
        const { error } = validateLogin(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        // Find user by email
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid Credentials' });
        }

        // Generate JWT token
        const token = user.generateAuthToken();
        res.status(200).send({ data: token, message: "Logged in Successfully" });

    } catch (err) {
        console.error(err.message);
        res.status(500).send({ message: 'Server Error' });
    }
};

// Middleware to verify JWT token
exports.authMiddleware = async (req, res, next) => {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if not token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
