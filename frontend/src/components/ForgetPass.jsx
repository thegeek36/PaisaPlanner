import React, { useState } from 'react';
import axiosInstance from '../axisoInstance';

const ForgetPass = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!email) {
      setError('Email is required');
      return;
    }

    try {
      const response = await axiosInstance.post('/forgot-password', { email });

      setMessage('Password reset link sent to your email. Please check your mailbox and spam folder.');
      setEmail('');
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(error.response.data.error || 'Failed to send password reset link');
      } else if (error.request) {
        // The request was made but no response was received
        setError('No response from server. Please try again later.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className='text-3xl font-bold mb-4 text-center text-gray-800 dark:text-white'>Paisa Planner</h1>
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">Forgot Password</h2>
        {message && <p className="text-green-600 text-center mb-4">{message}</p>}
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPass;