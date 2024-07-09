const IncomeSchema = require("../models/Income")


exports.addIncome = async (req,res) =>{
    const {title,amount,category,description,date,user} = req.body
    
    const income = IncomeSchema({
        title,
        amount,
        category,
        description,
        user,
        date
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
        console.log("Error");
        res.status(500).json({"message":"An Error Occured"});
    }
    
} 

exports.getIncome = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming you have user ID in req.user.id from authentication middleware

        const incomes = await IncomeSchema.find({ user: userId }).sort({ date: -1 });

        res.status(200).json(incomes);
    } catch (error) {
        console.log("Error", error);
        res.status(500).json({ message: "An Error Occurred" });
    }
};