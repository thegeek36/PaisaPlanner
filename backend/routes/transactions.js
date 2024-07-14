// routes/transaction.js
const router = require('express').Router();
const { registerUser, loginUser } = require('../controllers/UserController');
const { addCategory, getCategories } = require('../controllers/categoryController');
const { addExpense, getExpenses, deleteExpense, updateExpense } = require('../controllers/expenseController');
const { addIncome, getIncome, deleteIncome, updateIncome } = require('../controllers/incomeController')
const authMiddleware = require('../middlewares/auth'); // Assuming you have an authentication middleware
const UserSummaryController = require('../controllers/UserSummaryController')
const {forgotPassword,resetPassword} = require('../controllers/PasswordController')
// Test route
router.get('/test', (req, res) => {
    res.send('Hello World');
});


// User registration route
router.post('/register', registerUser);

// User login route
router.post('/login', loginUser);



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
router.delete('/delete-expense/:id',authMiddleware, deleteExpense);
//Update Expense
router.put('/update-expense/:id', authMiddleware, updateExpense);


// Add category route (protected route, requires authentication)
router.post('/add-category',authMiddleware, addCategory);
//Get Categories
router.get('/get-category',authMiddleware,getCategories);
//Put categories

router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);


//User Summary
router.get('/summary', authMiddleware, UserSummaryController.getUserSummary);
module.exports = router;
