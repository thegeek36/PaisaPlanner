// components/FinancialHealth.js
import React from 'react';

const FinancialHealth = ({ data }) => {
    const { financialHealth, savingsRate, totalIncome, totalExpense } = data;

    const getHealthColor = (status) => {
        switch (status.toLowerCase()) {
            case 'excellent':
                return 'bg-green-200';
            case 'good':
                return 'bg-blue-200';
            case 'fair':
                return 'bg-yellow-200';
            case 'poor':
            case 'critical':
                return 'bg-red-200';
            default:
                return 'bg-gray-300';
        }
    };

    return (
        <div className={`${getHealthColor(financialHealth.status)} shadow-md rounded-lg p-6 mb-6`}>
            <h2 className="text-2xl font-bold mb-4">Financial Health</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <p className="font-semibold">Status: <span className={getHealthColor(financialHealth.status)}>{financialHealth.status}</span></p>
                    <p className="mt-2">{financialHealth.advice}</p>
                </div>
                <div>
                    <p className="font-semibold">Savings Rate: <span className={savingsRate >= 20 ? 'text-green-600' : 'text-yellow-600'}>{savingsRate}%</span></p>
                    <p className="font-semibold mt-2">Income to Expense Ratio: <span className={totalIncome > totalExpense ? 'text-green-600' : 'text-red-600'}>{(totalIncome / totalExpense).toFixed(2)}</span></p>
                </div>
            </div>
        </div>
    );
};

export default FinancialHealth;