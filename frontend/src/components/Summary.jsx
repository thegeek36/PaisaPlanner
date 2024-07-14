import React from 'react';
import { FaMoneyBillWave, FaReceipt, FaPiggyBank } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";

const Summary = ({ data }) => {
  return (
    <div className="flex flex-wrap mb-6 gap-4">
      {/* Total Income */}
      <div className="bg-green-300 p-4 rounded-lg text-green-800 text-xl font-bold shadow-md w-full sm:w-1/5 lg:w-1/5 mb-4 sm:mb-0 relative">
        <div className='flex items-center justify-center gap-2 text-black'>
          <span>Income</span>
          <FaMoneyBillTrendUp/>
        </div>
        <div className="flex items-center justify-center mt-4">
          <span>{data.totalIncome}</span>
        </div>
      </div>

      {/* Total Expense */}
      <div className="bg-red-300 p-4 rounded-lg text-red-800 text-xl font-bold shadow-md w-full sm:w-1/5 lg:w-1/5 mb-4 sm:mb-0 relative">
        <div className='flex items-center justify-center gap-2 text-black'>
          <span>Expense</span>
          <FaMoneyBillWave />
        </div>
        <div className="flex items-center justify-center mt-4">
          <span>{data.totalExpense}</span>
        </div>
      </div>

      {/* Total Subscriptions */}
      <div className="bg-blue-300 p-4 rounded-lg text-blue-600 text-xl font-bold shadow-md w-full sm:w-1/5 lg:w-1/5 mb-4 sm:mb-0 relative">
        <div className='flex items-center justify-center gap-2 text-black'>
          <span>Subscriptions</span>
          <FaReceipt />
        </div>
        <div className="flex items-center justify-center mt-4">
          <span>{data.totalRecurringIncome}</span>
        </div>
      </div>

      {/* Total Savings */}
      <div className="bg-pink-300 p-4 rounded-lg text-purple-600 text-xl font-bold shadow-md w-full sm:w-1/5 lg:w-1/5 relative">
        <div className='flex items-center justify-center gap-2 text-black'>
          <span>Savings</span>
          <FaPiggyBank />
        </div>
        <div className="flex items-center justify-center mt-4">
          <span>{data.totalSaving}</span>
        </div>
      </div>
    </div>
  );
};

export default Summary;
