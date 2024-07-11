import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiPlusCircle, FiDollarSign, FiSettings, FiUser, FiMenu, FiX } from 'react-icons/fi';
import { HiOutlineLogout } from "react-icons/hi";

const Main = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showToast, setShowToast] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowToast(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex h-screen bg-gradient-to-br from-blue-200 to-indigo-300 p-4">
            {/* Sidebar */}
            <aside className={`bg-gradient-to-b from-blue-600 to-blue-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 space-y-6 py-7 px-2 ease-in-out z-20 rounded-2xl`}>
                <nav className="space-y-2 mt-4">
                    <button onClick={toggleSidebar} className="absolute top-2 right-2 text-white md:hidden">
                        <FiX size={24} />
                    </button>
                    <Link to="/" className="block py-2.5 px-4 rounded-lg transition duration-200 hover:bg-blue-700 hover:text-white">
                        <FiHome className="inline-block mr-2" /> Home
                    </Link>
                    <Link to="/add-expense" className="block py-2.5 px-4 rounded-lg transition duration-200 hover:bg-blue-700 hover:text-white">
                        <FiPlusCircle className="inline-block mr-2" /> Add Expense
                    </Link>
                    <Link to="/add-income" className="block py-2.5 px-4 rounded-lg transition duration-200 hover:bg-blue-700 hover:text-white">
                        <FiDollarSign className="inline-block mr-2" /> Add Income
                    </Link>
                    <Link to="/settings" className="block py-2.5 px-4 rounded-lg transition duration-200 hover:bg-blue-700 hover:text-white">
                        <FiSettings className="inline-block mr-2" /> Settings
                    </Link>
                    <Link to="/profile" className="block py-2.5 px-4 rounded-lg transition duration-200 hover:bg-blue-700 hover:text-white">
                        <FiUser className="inline-block mr-2" /> User Profile
                    </Link>
                </nav>
            </aside>

            <div className="flex-1 flex flex-col overflow-hidden px-2">
                    {/* Navbar */}
                    <header className="bg-white shadow-md rounded-t-2xl">
                        <div className="flex items-center justify-between px-6 py-4">
                            <button onClick={toggleSidebar} className="text-gray-500 focus:outline-none focus:text-gray-700 md:hidden">
                                <FiMenu size={24} />
                            </button>
                            <h1 className="text-xl font-semibold text-gray-800">Welcome to Paisa Planner</h1>
                            <button 
								
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 text-white px-5 py-5  rounded-full transition duration-300"
                            >
							<HiOutlineLogout className='text-xl font-bold'></HiOutlineLogout>
                                
                            </button>
                        </div>
                    </header>

                    {/* Main content */}
                    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6 rounded-b-2xl">
                        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Dashboard</h2>
                        {/* Add your dashboard content here */}
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <p className="text-gray-600">Your dashboard content goes here.</p>
                        </div>
                    </main>
            </div>

            {/* Toast Message */}
            {showToast && (
                <div className="fixed top-9 right-5 bg-green-500 text-white px-5 py-4 rounded-2xl shadow-lg">
                    Logged in successfully!
                </div>
            )}
        </div>
    );
};

export default Main;