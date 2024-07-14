import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import loginImage from '../../assets/login.jpg';
const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000/api/login";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      window.location = "/";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-300">
      <div className="flex flex-col md:flex-row m-auto bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full">
        <div className="w-full md:w-1/2 p-8">
          <h1 className="text-4xl font-bold text-purple-800 mb-4">Paisa Planner.</h1>
          <p className="text-gray-600 mb-6">
            Master your money, master your life.
          </p>
		  <h2 className="text-xl font-bold text-neutral-800 mb-4">Login.</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className="w-full px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className="w-full px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <Link to="/forgetpass"> 
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Sign In
            </button>
            </Link>
          </form>
          <div className="mt-4 text-center">
            <Link to="/forgot-pass" className="text-blue-500 hover:underline">
              Forgot Password?
            </Link>
          </div>
          <div className="mt-4 text-center">
            <p className="text-gray-600">Don't have an account?</p>
            <Link to="/signup">
              <button className="mt-2 w-full bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition duration-300">
                Sign Up
              </button>
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
};;

export default Login;