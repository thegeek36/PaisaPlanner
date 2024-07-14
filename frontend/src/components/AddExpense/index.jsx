import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';
import { toast } from 'react-toastify';
import SideNav from '../SideNav';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axiosInstance from '../../axisoInstance';
const AddExpense = () => {
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        category: '',
        description: ''
    });
    const [categories, setCategories] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const authHeader = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchExpenses();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axiosInstance.get('get-category');
            setCategories(response.data.filter(cat => cat.type === 'expense'));
        } catch (error) {
            console.error('Error fetching categories:', error);
            toast.error('Failed to fetch categories');
        }
    };

    const fetchExpenses = async () => {
        try {
            const response = await axiosInstance.get('get-expense', authHeader);
            setExpenses(response.data);
            calculateTotals(response.data);
        } catch (error) {
            console.error('Error fetching expenses:', error);
            toast.error('Failed to fetch expenses');
        }
    };

    const calculateTotals = (expenses) => {
        const totalExpenses = expenses.length;
        const totalAmount = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
        setTotalExpenses(totalExpenses);
        setTotalAmount(totalAmount);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await axiosInstance.put(`update-expense/${editId}`, formData, authHeader);
                toast.success('Expense updated successfully');
            } else {
                await axiosInstance.post('add-expense', formData, authHeader);
                toast.success('Expense added successfully');
            }
            setFormData({ title: '', amount: '', category: '', description: '' });
            setIsEditing(false);
            setEditId(null);
            fetchExpenses();
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error submitting expense:', error);
            toast.error('Failed to submit expense');
        }
    };

    const handleEdit = (expense) => {
        setFormData({
            ...expense,
            category: expense.category._id
        });
        setIsEditing(true);
        setEditId(expense._id);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`delete-expense/${id}`, authHeader);
            toast.success('Expense deleted successfully');
            fetchExpenses();
        } catch (error) {
            console.error('Error deleting expense:', error);
            toast.error('Failed to delete expense');
        }
    };

    const columns = React.useMemo(
        () => [
            { Header: 'Title', accessor: 'title' },
            { Header: 'Amount', accessor: 'amount' },
            { Header: 'Category', accessor: 'category.name' },
            { Header: 'Description', accessor: 'description' },
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
    } = useTable({ columns, data: expenses });

    return (
        <SideNav>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add Expense</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-red-300 p-4 rounded-md shadow-md">
                    <h3 className="text-lg font-medium">Total Expenses</h3>
                    <p className="text-2xl font-bold">{totalExpenses}</p>
                </div>
                <div className="bg-orange-300 p-4 rounded-md shadow-md">
                    <h3 className="text-lg font-medium">Total Amount</h3>
                    <p className="text-2xl font-bold">₹{totalAmount.toFixed(2)}</p>
                </div>
            </div>
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-red-500 text-white px-4 py-2 rounded-md mb-6 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
                Add Expense
            </button>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-xl shadow-md max-w-md w-full">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold">{isEditing ? 'Edit Expense' : 'Add Expense'}</h3>
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                &times;
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
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
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
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
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                >
                                    <option value="">Select a category</option>
                                    {categories.map((category) => (
                                        <option key={category._id} value={category._id}>
                                            {category.name}
                                        </option>
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
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                ></textarea>
                            </div>
                            <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 w-full">
                                {isEditing ? 'Update Expense' : 'Add Expense'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
            <div className="overflow-x-auto">
                <table {...getTableProps()} className="w-full border-collapse">
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()} className="border p-2 bg-gray-500 text-left text-sm font-medium text-black uppercase tracking-wider">
                                        {column.render('Header')}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map(row => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()} className="bg-gray-300">
                                    {row.cells.map(cell => {
                                        return (
                                            <td {...cell.getCellProps()} className="border p-2 text-sm text-gray-700">
                                                {cell.render('Cell')}
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </SideNav>
    );
};

export default AddExpense;