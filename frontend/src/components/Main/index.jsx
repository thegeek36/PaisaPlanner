import { useEffect, useState } from 'react';
import SideNav from '../SideNav';
import Summary from '../Summary';
import Charts from '../Charts';
const Main = () => {
    const userData = {
        name: 'Priyanshu',
        totalExpense: 15000,
        totalIncome: 7000,
        totalRecurringIncome: 2000,
        totalSaving: 2000,
        expenseCategory: {
          food: 2000,
          travel: 1000,
          bills: 2000,
          rent:5000,
          medecines:1200
        },
      };

    return (
        <SideNav data={userData}>
           <Summary data={userData} />
            <Charts data={userData} />
            {/* Toast Message */}
            {/* {showToast && (
                <div className="fixed top-9 right-5 bg-green-500 text-white px-5 py-4 rounded-2xl shadow-lg">
                    Logged in successfully!
                </div>
            )} */}
        </SideNav>
    );
};

export default Main;
