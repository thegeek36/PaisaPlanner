// routes/transaction.js
const router = require('express').Router();
const { registerUser, loginUser } = require('../controllers/UserController');
const { addCategory } = require('../controllers/categoryController');
const { addIncome } = require('../controllers/incomeController')
const authMiddleware = require('../middlewares/auth'); // Assuming you have an authentication middleware

// Test route
router.get('/test', (req, res) => {
    res.send('Hello World');
});


// User registration route
router.post('/register', registerUser);

// User login route
router.post('/login', loginUser);

// Add category route (protected route, requires authentication)
router.post('/categories', addCategory);

//Adding Income
router.post('/add-income', addIncome);

module.exports = router;
