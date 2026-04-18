import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Foooter from './Foooter';

const Signin = () => {
  // declaring variables
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  // status messages
  const [loading,setLoading] = useState("")
  const [error,setError] = useState("")

  // navigation through components
  const navigate = useNavigate()


  // function to submit data to API
  const submit = async (e) => {
    e.preventDefault();
    setLoading("Please wait as we log you in");

    try {
      const data = new FormData();
      data.append("email",email);
      data.append("password",password);

      const response = await axios.post("https:macdonaldoryx.alwaysdata.net/api/signin",data);
      
      
      setLoading("");

      // check if the response has user item 
      if (response.data.user) {
        navigate("/");
      }
      else {
        setError("Login failed");
      }
    } catch (error) {
      setLoading("");
      setError("There is an error");      
    }
  } 


  return (
    <div className='row justify-content-center mt-5 mb-5'>
      <div className='col-md-5 card shadow-lg p-5 text-white bg-dark border-secondary' id='signin'>
        <h2 className='text-center mb-4 fw-bold'>Signin to movieshop</h2>
        <form action="" onSubmit={submit}>
          {loading && <div className='alert alert-info py-2'>{loading}</div>}
          {error && <div className='alert alert-danger py-2'>{error}</div>}
            <input 
              type="email" 
              className='form-control' 
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
            <br />
            <input 
              type="password" 
              className='form-control'
              placeholder='Enter your password' 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
            <br />

            <button type="submit" className='btn btn-danger w-100 fw-bold py-2 mt-3'>Login</button>
        </form>

        <Link to="/signup" className='text-secondary text-decoration-none'>Don't have an account?? Signin</Link>
      </div>
      <Foooter/>
    </div>
  );
};

export default Signin
