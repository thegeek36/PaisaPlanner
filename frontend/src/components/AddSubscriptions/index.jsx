import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';
import { toast } from 'react-toastify';
import SideNav from '../SideNav';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axiosInstance from '../../axisoInstance';

const AddSubscriptions = () => {
    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        frequency: '',
        nextDueDate: '',
        category: '',
        description: ''
    });
    const [subscriptions, setSubscriptions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchSubscriptions();
        fetchCategories();
    }, []);

    const fetchSubscriptions = async () => {
        try {
            const response = await axiosInstance.get('get-subscriptions');
            setSubscriptions(response.data);
        } catch (error) {
            console.error('Error fetching subscriptions:', error);
            toast.error('Failed to fetch subscriptions');
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axiosInstance.get('get-category');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
            toast.error('Failed to fetch categories');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await axiosInstance.put(`update-subscription/${editId}`, formData);
                toast.success('Subscription updated successfully');
            } else {
                await axiosInstance.post('/add-subscription', formData);
                toast.success('Subscription added successfully');
            }
            setFormData({ name: '', amount: '', frequency: '', nextDueDate: '', category: '', description: '' });
            setIsEditing(false);
            setEditId(null);
            fetchSubscriptions();
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error submitting subscription:', error);
            toast.error('Failed to submit subscription');
        }
    };

    const handleEdit = (subscription) => {
        setFormData({
            name: subscription.name,
            amount: subscription.amount,
            frequency: subscription.frequency,
            nextDueDate: subscription.nextDueDate.split('T')[0], // Format date for input
            category: subscription.category._id,
            description: subscription.description
        });
        setIsEditing(true);
        setEditId(subscription._id);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`delete-subscription/${id}`);
            toast.success('Subscription deleted successfully');
            fetchSubscriptions();
        } catch (error) {
            console.error('Error deleting subscription:', error);
            toast.error('Failed to delete subscription');
        }
    };

    const columns = React.useMemo(
        () => [
            { Header: 'Name', accessor: 'name' },
            { Header: 'Amount', accessor: 'amount' },
            { Header: 'Frequency', accessor: 'frequency' },
            { Header: 'Next Due Date', accessor: row => new Date(row.nextDueDate).toLocaleDateString() },
            { Header: 'Category', accessor: 'category.name' },
            {
                Header: 'Actions',
                Cell: ({ row }) => (
                    <div>
                        <button onClick={() => handleEdit(row.original)} className="text-blue-500 mr-2"><FaRegEdit className="text-2xl" /></button>
                        <button onClick={() => handleDelete(row.original._id)} className="text-red-500"><MdDelete className='text-2xl' /></button>
                    </div>
                ),
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data: subscriptions });

    // Calculate totals
    const totalSubscriptions = subscriptions.length;
    const totalAmount = subscriptions.reduce((acc, subscription) => acc + subscription.amount, 0);

    return (
        <SideNav>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Manage Subscriptions</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-300 p-4 rounded-md shadow-md">
                    <h3 className="text-lg font-medium">Total Subscriptions</h3>
                    <p className="text-2xl font-bold">{totalSubscriptions}</p>
                </div>
                <div className="bg-green-300 p-4 rounded-md shadow-md">
                    <h3 className="text-lg font-medium">Total Amount</h3>
                    <p className="text-2xl font-bold">₹{totalAmount.toFixed(2)}</p>
                </div>
            </div>
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md mb-6 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                Add Subscription
            </button>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-xl shadow-md max-w-md w-full">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold">{isEditing ? 'Edit Subscription' : 'Add Subscription'}</h3>
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                &times;
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-700">Amount</label>
                                <input
                                    type="number"
                                    id="amount"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="frequency" className="block mb-2 text-sm font-medium text-gray-700">Frequency</label>
                                <select
                                    id="frequency"
                                    name="frequency"
                                    value={formData.frequency}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select frequency</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="monthly">Monthly</option>
                                    <option value="quarterly">Quarterly</option>
                                    <option value="biannual">Every 6 months</option>
                                    <option value="yearly">Yearly</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="nextDueDate" className="block mb-2 text-sm font-medium text-gray-700">Next Due Date</label>
                                <input
                                    type="date"
                                    id="nextDueDate"
                                    name="nextDueDate"
                                    value={formData.nextDueDate}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-700">Category</label>
                                <select
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select category</option>
                                    {categories.map(category => (
                                        <option key={category._id} value={category._id}>{category.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    {isEditing ? 'Update' : 'Add'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <table {...getTableProps()} className="w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-200">
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()} className="px-4 py-2 text-left text-sm font-medium text-gray-800">
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} className="border-b">
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()} className="px-4 py-2 text-sm text-gray-700">
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </SideNav>
    );
};

export default AddSubscriptions;
