// Charts.js
import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Charts = ({ data }) => {
  const expenseData = Object.entries(data.expenseCategory).map(([name, value]) => ({ name, value }));

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-4">
      <div className="w-full lg:w-1/2">
        <h2 className="text-2xl font-semibold mb-4">Income vs Expense</h2>
        <div className='backdrop-blur-md bg-gray-300 rounded-lg p-4 shadow-xl'>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[data]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalExpense" fill="#8884d8" />
              <Bar dataKey="totalIncome" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="w-full lg:w-1/2">
        <h2 className="text-2xl font-semibold mb-4">Expense by Category</h2>
        <div className='backdrop-blur-md bg-gray-300 rounded-lg p-4 shadow-xl'>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expenseData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {expenseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042','#FFAB28'][index % 4]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Charts;