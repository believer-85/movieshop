import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Foooter from './Foooter';
import slide1 from '../images/originals.jpg'
import slide2 from '../images/prison break.jpeg'
import slide3 from '../images/legacy.jpg'
import slide4 from '../images/vampire diaries.webp'
import slide5 from '../images/lucifer.jpg'


const Homepage = () => {

  // Initialize Hooks
  const [products, setProducts] = useState([]);  
  const [loading, setLoading] = useState(""); 
  const [error, setError] = useState(""); 


  const navigate = useNavigate();
    // Specify image location URL
    const img_url = "https://macdonaldoryx.alwaysdata.net/static/images/";


    const fetchProducts = async() => {
        setLoading("Please wait, We are retrieving the products .."); // Set loading message when fetching starts
        try {
            const response = await axios.get("https://macdonaldoryx.alwaysdata.net/api/get_product_details")
            setProducts(response.data);
            setLoading("");
        }
        catch(error) {            
            setError("There was an Error")    
        }
    }

     useEffect(() => {
       fetchProducts();
       }, []);

  return (
    <div className='row' id="homepage-root">
      {/* setting the carousel */}
       <section className="row">
      <div className="col-md-12">
        {/* carousel starts here */}
        <div className="carousel slide" id="mycarousel" data-bs-ride="carousel">
          {/* image wrapper */}
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={slide1} alt="slide1" className="d-block w-100 carousel-img"/>
            </div>

            <div className="carousel-item">
              <img src={slide2} alt="slide2" className="d-block w-100 carousel-img"/>
            </div>

            <div className="carousel-item">
              <img src={slide3} alt="slide3" className="d-block w-100 carousel-img"/>
            </div>
            <div className="carousel-item">
              <img src={slide4} alt="slide4" className="d-block w-100 carousel-img"/>
            </div>
            <div className="carousel-item">
              <img src={slide5} alt="slide5" className="d-block w-100 carousel-img"/>
            </div>
          </div>

          {/* controls */}
          <div>
            <a href="#mycarousel" className="carousel-control-prev" data-bs-slide="prev">
              <span className="carousel-control-prev-icon bg-danger"></span>
            </a>

            <a href="#mycarousel" className="carousel-control-next"data-bs-slide="next">
              <span className="carousel-control-next-icon bg-danger"></span>
            </a>
          </div>
        </div>
      </div>
    </section>




      <h1 className='mt-5' id='movie-title'>Available movies</h1>
      {loading}
      {error}

      

      {/* product card design */}
      {products.map((product)=>(

      <div className="col-md-3 jusify-content-center mb-4" id='home'>
        
        


        <div className='card movie-card shadow-1g'>
          <img 
            src={img_url + product.product_photo} 
            alt={product.product_photo} 
            className='product_img'
            style={{ height: '350px', objectFit:'cover' }}
          />
          <div className='card-body'>
            <h4 className='mt-2'>{product.product_name}</h4>
            <p className='text-muted'>{product.product_description}</p>
            <b className='text-warning'>{product.product_cost} KES</b> <br />
            <button
              className="btn btn-dark mt-2 w-100"
              onClick={() => navigate('/makepayment', { state: { product } })}>
              Purchase now
            </button>
          </div>
        </div>

      </div>
      ))}
      <div className='row'>
        <div className='col-md-4'>
          
        </div>
      </div>
      <Foooter/>
    </div>
  )
}

export default Homepage




