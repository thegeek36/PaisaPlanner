// routes/transaction.js
const router = require('express').Router();
const { registerUser, loginUser } = require('../controllers/UserController');
const { addCategory } = require('../controllers/categoryController');
const { addExpense, getExpenses, deleteExpense, updateExpense } = require('../controllers/expenseController');
const { addIncome, getIncome, deleteIncome, updateIncome } = require('../controllers/incomeController')
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
router.post('/categories',authMiddleware, addCategory);

//Adding Income
router.post('/add-income',authMiddleware, addIncome);

//Getting Income
router.get('/get-income',authMiddleware, getIncome);

//Delete Income
router.delete('/delete-income/:id',authMiddleware,deleteIncome);
//Update Income
router.put('/update-income/:id', authMiddleware, updateIncome);

//Add Expense
router.post('/add-expense',authMiddleware, addExpense);
//Get Expense
router.get('/get-expense',authMiddleware, getExpenses);
//Delete Expense
router.delete('/delete-income/:id',authMiddleware, deleteExpense);
//Update Expense
router.put('/update-expense/:id', authMiddleware, updateExpense);

module.exports = router;
