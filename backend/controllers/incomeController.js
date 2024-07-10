const IncomeSchema = require("../models/Income")
const mongoose = require('mongoose')

exports.addIncome = async (req,res) =>{
    const {title,amount,category,description,date,type} = req.body
    
    const income = IncomeSchema({
        title,
        amount,
        category,
        description,
        type,
        date,
        user: req.user._id 
    })
    try{
        if(!title || !category || !description)
            {
                return res.status(404).json({message:'Please Fill all feilds'})
            }
        if(amount <=0 || !amount === 'number')
            {
                return res.status(404).json({message:'Ammount must be a Number'})
            }
            await income.save()
            res.status(200).json({message:"Income Added Successfully"});
    }catch (error){
        console.log("Error",error);
        res.status(500).json({"message":"An Error Occured"});
    }
    
} 

exports.getIncome = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming you have user ID in req.user.id from authentication middleware

        const incomes = await IncomeSchema.find({ user: userId }).sort({ date: -1 });

        res.status(200).json(incomes);
    } catch (error) {
        console.log("Error", error);
        res.status(500).json({ message: "An Error Occurred" });
    }
};

exports.deleteIncome = async (req, res) => {
    try {
        const { id } = req.params; // Assuming the income ID is passed as a URL parameter
        const userId = req.user._id; // Get the user ID from the authenticated user

        // Find the income by ID and user ID, and delete it
        const deletedIncome = await IncomeSchema.findOneAndDelete({ _id: id, user: userId });

        if (!deletedIncome) {
            return res.status(404).json({ message: "Income not found or you don't have permission to delete it" });
        }

        res.status(200).json({ message: "Income deleted successfully", deletedIncome });
    } catch (error) {
        console.error("Error in deleteIncome:", error);
        res.status(500).json({ message: "An error occurred while deleting the income" });
    }
};



exports.updateIncome = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const { title, amount, category, description,type } = req.body;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid income ID format" });
        }

        // Find the existing income
        const income = await IncomeSchema.findOne({ _id: id, user: userId });

        if (!income) {
            return res.status(404).json({ message: "Income not found or you don't have permission to edit it" });
        }

        // Update fields, keeping the original date
        income.title = title || income.title;
        income.amount = amount || income.amount;
        income.category = category || income.category;
        income.description = description || income.description;
        income.type = type || income.type;
        // Save the updated income
        const updatedIncome = await income.save();

        res.status(200).json({ message: "Income updated successfully", income: updatedIncome });
    } catch (error) {
        console.error("Error in updateIncome:", error);
        res.status(500).json({ message: "An error occurred while updating the income" });
    }
};