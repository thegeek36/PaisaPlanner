import { Route, Routes, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/SignUp";
import Login from "./components/Login";
import "./index.css";
import AddExpense from "./components/AddExpense";
import Settings from "./components/Settings";
import AddIncome from "./components/AddIncome";
import LandingPage from "./components/LandingPage"
import { ToastContainer } from 'react-toastify';
import AddCategories from "./components/AddCategories";
import AddSubscriptions from "./components/AddSubscriptions";
import ForgetPass from "./components/ForgetPass";
import ResetPass from "./components/ResetPass";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const user = localStorage.getItem("token");
  console.log(user);
  const location = useLocation();

  return (
    <> 
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial="page-enter"
        animate="page-enter-active"
        exit="page-exit"
        variants={{
          "page-enter": { opacity: 0 },
          "page-enter-active": { opacity: 1 },
          "page-exit": { opacity: 0 },
        }}
        className="relative overflow-hidden"
      >
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<Main />} />
              <Route path="/add-expense" element={<AddExpense />} />
              <Route path="/add-income" element={<AddIncome />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/categories" element={<AddCategories />} />
              <Route path="/subscriptions" element={<AddSubscriptions />} />
              <Route path="*" element={<Navigate replace to="/" />} />
            </>
          ) : (
            <>
              <Route path="/" element={<LandingPage />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-pass" element={<ForgetPass />} />
              <Route path="/reset-password/:token" element={<ResetPass/>} />
              <Route path="*" element={<Navigate replace to="/" />} />
            </>
          )}
        </Routes>
      </motion.div>
    </AnimatePresence>
    <ToastContainer />
          </>
  );
}

export default App;