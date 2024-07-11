import { Link, useNavigate } from 'react-router-dom';
//import styles from './styles.module.css';
import { useState } from 'react';
import axios from 'axios';

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
            const url = "http://localhost:5000/api/register";
            const { data: res } = await axios.post(url, data, {
              headers: {
                'Content-Type': 'application/json'
              }
            });
            console.log(res.message);
            navigate('/login');
          } catch (err) {
            console.error("Error: ", err); // Log error to debug
            if (err.response && err.response.status >= 400 && err.response.status < 500) {
                setError(err.response.data.message);
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        }
    };

    return (
        <div className={styles.signup_container}>
            <div className={styles.signup_form_container}>
                <div className={styles.left}>
                    <h1>Welcome Back</h1>
                    <Link to="/login">
                        <button type='button' className={styles.white_btn}>
                            Sign In
                        </button>
                    </Link>
                </div>
                <div className={styles.right}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>Create Account</h1>
                        <input type='text' placeholder='First Name' name='firstname' value={data.firstName} onChange={handleChange} className={styles.input} required />
                        <input type='text' placeholder='Last Name' name='lastname' value={data.lastName} onChange={handleChange} className={styles.input} required />
                        <input type='email' placeholder='Email' name='email' value={data.email} onChange={handleChange} className={styles.input} required />
                        <input type='password' placeholder='Password' name='password' value={data.password} onChange={handleChange} className={styles.input} required />
                        {error && <div className={styles.error_message}>{error}</div>}
                        <button type='submit' className={styles.green_btn}>Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
