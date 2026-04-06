import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Foooter from './Foooter';


const Signup = () => {
    // declaring state variables
    const[username,setUsername] = useState("")
    const[email,setEmail] = useState("")
    const[password,setPassword] = useState("")
    const[phone,setPhone] = useState("")

    // status messages
    const[loading,setLoading] = useState("")
    const[error,setError] = useState("")
    const[success,setSuccess] = useState("")


    // function to signup
    const submitSignupDetails = async (e) => {
        e.preventDefault();
        setLoading("Please wait.....")
        try {
            const formData = new FormData();
            formData.append("username",username);
            formData.append("email",email);
            formData.append("password",password);
            formData.append("phone",phone);
            

            // adding based url
            const response = await axios.post("https://macdonaldoryx.alwaysdata.net/api/signup",formData);

            setSuccess(response.data.success);
            setLoading("");

            // reset values
            setPhone("");
            setUsername("");
            setPassword("");
            setEmail("") ;   

            
        } catch (error) {
          setError(error.message);
            
        }
    }


  return (
    <div className='row justify-content-center mt-4'>
        <div className='col-md-6 card shadow p-4' id='signup'>
            <h1>Sign Up to Movieshop</h1>

            {/* binding variables */}
            {loading}<br/>
            {error}<br/>
            {success}<br/>



            {/* signup form */}
            <form action="" onSubmit={submitSignupDetails}>
                <input type="text" 
                className='form-control' 
                placeholder='Enter Username' 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                />
                <br />
                <input 
                type="email" 
                className='form-control' 
                placeholder='Enter email' 
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                required 
                />
                <br />
                <input 
                type="password" 
                className='form-control' 
                placeholder='Enter password' 
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                required 
                />
                <br />
                <input 
                type="tel" 
                className='form-control' 
                placeholder='Enter Phone number' 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                required 
                />
                <br />
                <button type="submit" className='btn btn-outline-primary w-100'>Signup</button>
            </form>

            <Link to='/signin'>Already have an account? Sign in</Link>
        </div>
        <Foooter/>

      
    </div>
  )
}

export default Signup
