import { Link,useNavigate} from 'react-router-dom'
import styles from './styles.module.css'
import { useState } from 'react';
import axios from "axios";
const Signup = () => {

    const [error,setError] = useState("");
    const [data,setData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:""
    })
     
    const navigate = useNavigate();
    const handleChange = ({currentTarget:input}) => {
        setData({...data,[input.name]:input.value});
      
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const url = "http://localhost:5000/api/register";
            const {data:res} = await axios.post(url,data);
            navigate('/login')
            console.log(res.message);
        }
        catch(err){
            if(err.response && err.response.status >= 400 && err.response.status == 500)
            {
                setError(err.response.data.message)
            }
            
        }
    }
    return(
        <div className={styles.signup_container}>
            <div className={styles.signup_form_container}>
                <div className={styles.left}>
                    <h1>Welcome Back</h1>
                    <Link to = "/login">
                        <button type='button' className={styles.white_btn} >
                            Sign In
                        </button>
                    </Link>
                </div>
                <di className={styles.right}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>Create  Account</h1>
                        <input type='text' placeholder='First Name' name='firstName' value = {data.firstName} onChange={handleChange} className={styles.input} required></input>
                        <input type='text' placeholder='Last Name' name='lastName' value = {data.lastName} onChange={handleChange} className={styles.input} required></input>
                        <input type='email' placeholder='Email' name='email' value = {data.email} onChange={handleChange} className={styles.input} required></input>
                        <input type='password' placeholder='Password' name='password' value = {data.password} onChange={handleChange} className={styles.input} required></input>
                        {error && <div className={styles.error_message}>{error} </div>}
                        <button type='Subit' className={styles.green_btn}>Sign Up</button>
                    </form>
                </di>
            </div>
        </div>
    )
}

export default Signup;