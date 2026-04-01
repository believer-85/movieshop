import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Foooter from './Foooter';

const Addproducts = () => {
  // declaring state variables
  const[productname,setMovieName] = useState('');
  const[productdescription,setMovieDescription] = useState('');
  const[productcost,setMovieCost] = useState('')
  const[product_photo,setProductPhoto] = useState('')
  
  // status messages
  const[loading,setLoading] = useState("")
  const[error,setError] = useState("")
  const[success,setSuccess] = useState("")

  // function to add product
  const handleSubmit = async (e)=>{
    e.preventDefault();
    setLoading("Please wait...")
    try {
      // retrieving product details
      const formData = new FormData();
      formData.append("product_name",productname);
      formData.append("product_description",productdescription);
      formData.append("product_cost",productcost);
      formData.append("product_photo",product_photo);

      // posting data to base url(api)
      const response = await axios.post("http://macdonaldoryx.alwaysdata.net/api/add_product",formData)

      setLoading("")
      setSuccess(response.data.success)
    } catch (error) {
      setLoading("");
      setError(error.message);
      
    }
  }

  return (
    <div className='row justify-content-center mt-4' id='editing'>
      <nav>
        <Link to="/" className='btn btn-dark'>Get all Movies</Link>
      </nav>
      {error}
      {success}
      {loading}
      <div className='col-md-6 card shadow p-4 m-2' id='addproducts'>
        <form action="" onSubmit={handleSubmit}>
          <h3>Upload movies</h3>
          <input 
            type="text"
            placeholder='Movie name'
            className='form-control'
            value={productname}
            onChange={(e)=>setMovieName(e.target.value)}
            required
          />
          <br />
          <textarea 
            name="" 
            id=""
            placeholder='Movie description'
            cols="20"
            className='form-control'
            value={productdescription}
            onChange={(e)=>setMovieDescription(e.target.value)}
            required
          ></textarea>
          <br />
          <input 
            type="number"
            placeholder='movie cost'
            className='form-control'
            value={productcost}
            onChange={(e)=>setMovieCost(e.target.value)}
            required
          />
          <br />
          <input 
            type="file"
            placeholder='Product image'
            className='form-control'
            accept="image/*" 
            onChange={(e)=>setProductPhoto(e.target.files[0])}
            required
          />
          <br />
          <input 
            type="submit"
            value="submit product" 
            className='btn btn-outline-danger w-100'
          />
          <br />


          <Link to='/signup'>Dont have an account?? Signup</Link>

        </form>
      </div>
      <Foooter/>
    </div>
  )
}

export default Addproducts
