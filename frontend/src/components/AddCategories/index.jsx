import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';
import { toast } from 'react-toastify';
import SideNav from '../SideNav';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axiosInstance from '../../axisoInstance';


const AddCategories = () => {
    const [formData, setFormData] = useState({
        name: '',
        type: ''
    });
    const [categories, setCategories] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

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
                await axiosInstance.put(`update-category/${editId}`, formData);
                toast.success('Category updated successfully');
            } else {
                await axiosInstance.post('add-category', formData);
                toast.success('Category added successfully');
            }
            setFormData({ name: '', type: '' });
            setIsEditing(false);
            setEditId(null);
            fetchCategories();
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error submitting category:', error);
            toast.error('Failed to submit category');
        }
    };

    const handleEdit = (category) => {
        setFormData({
            name: category.name,
            type: category.type
        });
        setIsEditing(true);
        setEditId(category._id);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`delete-category/${id}`);
            toast.success('Category deleted successfully');
            fetchCategories();
        } catch (error) {
            console.error('Error deleting category:', error);
            toast.error('Failed to delete category');
        }
    };

    const columns = React.useMemo(
        () => [
            { Header: 'Name', accessor: 'name' },
            { Header: 'Type', accessor: 'type' },
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
    } = useTable({ columns, data: categories });

    return (
        <SideNav>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add Categories</h2>
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md mb-6 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                Add Category
            </button>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-xl shadow-md max-w-md w-full">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold">{isEditing ? 'Edit Category' : 'Add Category'}</h3>
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
                                <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-700">Type</label>
                                <select
                                    id="type"
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select a type</option>
                                    <option value="income">Income</option>
                                    <option value="expense">Expense</option>
                                </select>
                            </div>
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full">
                                {isEditing ? 'Update Category' : 'Add Category'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
            <div className="overflow-x-auto">
                <table {...getTableProps()} className="w-full border-collapse rounded-md">
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

export default AddCategories;