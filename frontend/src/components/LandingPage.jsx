import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaSignInAlt, FaUserPlus, FaChartLine, FaMoneyBillWave, FaCalendarAlt, FaDatabase } from 'react-icons/fa';
import { SiMongodb, SiExpress, SiReact, SiNodedotjs, SiTailwindcss } from 'react-icons/si';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-5">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Paisa Planner</h1>
          <div>
            <Link to="/login" className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors mr-2">
              <FaSignInAlt className="inline mr-2" /> Sign In
            </Link>
            <Link to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition-colors">
              <FaUserPlus className="inline mr-2" /> Sign Up
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <section className="text-center py-12">
          <h2 className="text-6xl font-bold mb-4">Welcome to Paisa Planner.</h2>
          <p className="text-2xl text-fuchsia-800 font-bold mb-8">Your trusted companion for financial wellness.</p>
          <Link to="/signup" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg">
            Get Started
          </Link>
        </section>

        <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6 text-center">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <FeatureCard icon={<FaChartLine />} title="Attractive Dashboard" description="Visualize your finances at a glance" />
            <FeatureCard icon={<FaMoneyBillWave />} title="Easy Expense Management" description="Track and categorize your spending effortlessly" />
            <FeatureCard icon={<FaDatabase />} title="Financial Tracking" description="Keep a close eye on your financial health" />
            <FeatureCard icon={<FaCalendarAlt />} title="Subscription Management" description="Never forget a subscription payment again" />
        </div>
        </section>

        <section className="mb-12 bg-blue-50 p-8 rounded-lg text-center">
          <h2 className="text-3xl font-semibold mb-4">Get Started Today</h2>
          <p className="mb-6 text-lg">Join thousands of users who are taking control of their finances with Paisa Planner.</p>
          <Link to="/signup" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg">
            Create Your Account
          </Link>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-center">Tech Stack</h2>
          <div className="flex justify-center space-x-8">
            <TechIcon icon={<SiMongodb className = "text-green-800" />} name="MongoDB" />
            <TechIcon icon={<SiExpress className = "text-gray-800"/>} name="Express.js" />
            <TechIcon icon={<SiReact className = "text-violet-800" />} name="React" />
            <TechIcon icon={<SiNodedotjs  className = "text-green-600"/>} name="Node.js" />
            <TechIcon icon={<SiTailwindcss className = "text-cyan-800" />} name="Tailwind CSS" />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 text-center">How to Use</h2>
          <ol className="list-decimal list-inside space-y-2 max-w-md mx-auto">
            <li>Sign up for a new account</li>
            <li>Log in to your personalized dashboard</li>
            <li>Add your income, expenses, and subscriptions</li>
            <li>Use the intuitive interface to manage your finances seamlessly</li>
          </ol>
        </section>

        <section className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-4">Support Open Source</h2>
          <p className="mb-4">Paisa Planner is an open-source project. If you find it useful, please consider contributing and giving it a star on GitHub!</p>
          <a href="https://github.com/thegeek36/PaisaPlanner" target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors">
            <FaGithub className="mr-2" /> Star on GitHub
          </a>
        </section>
      </main>

      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; 2024 Paisa Planner. Developed by Priyashu Panda. All rights reserved.</p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:bg-gray-200">
    <div className="text-4xl text-blue-600 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p>{description}</p>
  </div>
);

const TechIcon = ({ icon, name }) => (
  <div className="text-center">
    <div className="text-4xl mb-2">{icon}</div>
    <p>{name}</p>
  </div>
);

export default LandingPage;