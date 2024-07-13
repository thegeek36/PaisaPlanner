import SideNav from '../SideNav';

const AddExpense = () => {
    return (
        <SideNav>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add Expense</h2>
            {/* Add your add expense content here */}
            <div className="bg-white p-6 rounded-xl shadow-md">
                <p className="text-gray-600">Form to add expense goes here.</p>
            </div>
        </SideNav>
    );
};

export default AddExpense;
