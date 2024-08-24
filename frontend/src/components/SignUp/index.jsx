import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axiosInstance from '../../axisoInstance';
import loginImage from '../../assets/login.jpg'; // Ensure this path is correct

const Signup = () => {
    const [error, setError] = useState("");
    const [data, setData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/register', data);
            const { message } = response.data;
            
            if (message) {
                toast.success('Registration successful');
                navigate('/login'); // Navigate to the login page after successful registration
            } else {
                setError('Invalid registration response');
            }
        } catch (error) {
            console.error('Registration failed:', error);
            if (error.response && error.response.status >= 400 && error.response.status < 500) {
                setError(error.response.data.message);
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        }
    };
    

    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className="flex flex-col md:flex-row m-auto bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full">
                <div className="w-full md:w-1/2 p-8">
                    <h1 className="text-2xl font-bold mb-2">Paisa Planner</h1>
                    <p className="text-gray-600 mb-6">Create your account and start managing your expenses efficiently.</p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input type='text' placeholder='First Name' name='firstname' value={data.firstname} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                        <input type='text' placeholder='Last Name' name='lastname' value={data.lastname} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                        <input type='email' placeholder='Email' name='email' value={data.email} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                        <input type='password' placeholder='Password' name='password' value={data.password} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                        {error && <div className="text-red-500">{error}</div>}
                        <button type='submit' className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300">Sign Up</button>
                    </form>
                    <p className="mt-4 text-sm text-gray-600">By signing up, you agree to our Terms and Privacy Policy.</p>
                    <p className="mt-2 text-sm text-gray-600">Your data is safe and secure with us.</p>
                    <div className="mt-6 text-center">
                        <p className="text-gray-600">Already have an account?</p>
                        <Link to="/login" className="text-blue-500 hover:underline">
                            Sign In
                        </Link>
                    </div>
                </div>
                <div className="w-full md:w-1/2 hidden md:block">
                    <img
                        src={loginImage}
                        alt="Expense Management"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default Signup;