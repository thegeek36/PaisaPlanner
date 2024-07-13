// Summary.js
import React from 'react';
import { FaMoneyBillWave, FaReceipt, FaPiggyBank } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";

const Summary = ({ data }) => {
  return (
    <div className="flex flex-wrap justify-between p-4 mb-6">
      <div className="bg-gray-100 p-4 rounded-lg text-green-800 text-xl font-bold shadow-md  w-full sm:w-1/2 lg:w-1/4 mb-4 sm:mb-0 relative">
        <span className="absolute top-1 left-1 text-sm text-gray-600">Total Income</span>
        <div className="flex items-center justify-center mt-4">
          <FaMoneyBillTrendUp className="mr-2" />
          <span>{data.totalIncome}</span>
        </div>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg text-red-600 text-xl font-bold shadow-md w-full sm:w-1/2 lg:w-1/4 mb-4 sm:mb-0 relative">
        <span className="absolute top-1 left-1 text-sm text-gray-600">Total Expense</span>
        <div className="flex items-center justify-center mt-4">
          <FaMoneyBillWave className="mr-2" />
          <span>{data.totalExpense}</span>
        </div>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg text-blue-600 text-xl font-bold shadow-md w-full sm:w-1/2 lg:w-1/4 mb-4 sm:mb-0 relative">
        <span className="absolute top-1 left-1 text-sm text-gray-600">Total Recurring Expense</span>
        <div className="flex items-center justify-center mt-4">
          <FaReceipt className="mr-2" />
          <span>{data.totalRecurringIncome}</span>
        </div>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg text-purple-600 text-xl font-bold shadow-md w-full sm:w-1/2 lg:w-1/4 relative">
        <span className="absolute top-1 left-1 text-sm text-gray-600">Total Saving</span>
        <div className="flex items-center justify-center mt-4">
          <FaPiggyBank className="mr-2" />
          <span>{data.totalSaving}</span>
        </div>
      </div>
    </div>
  );
};

export default Summary;