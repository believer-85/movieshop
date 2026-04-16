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

  // adding the search state
  const [searchTerm, setSearchTerm] = useState("");

  // adding filtering logic
  const filteredProducts = products.filter((product) => product.product_name.toLowerCase().includes(searchTerm.toLowerCase()));


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

      {/* setting the search bar */}
      <div className='row justify-content-center mb-5'>
      <div className='col-md-6 search-container'>
        <input 
          type="text" 
          className='form-control search-input' 
          placeholder='Search for a movie...' 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          id="searchterm"
        />
        <button className='search-btn'>🔍</button>
      </div>
    </div>
      {/* setting the carousel */}
       <section className="row  w-50 mx-auto">
      <div className="col-md-10 mx-auto">
        {/* carousel starts here */}
        <div className="carousel slide peeking-carousel" id="mycarousel" data-bs-ride="carousel">
          {/* image wrapper */}
          <div className="carousel-inner overflow-visible">
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
            <a href="#mycarousel" className="carousel-control-prev" data-bs-slide="prev" style={{width: '5' }}>
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
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
      

      <div className="col-md-3 jusify-content-center mb-4" id='home'>
        
        


        <div className='card movie-card shadow-1g image-wrapper' id="card-color">
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
      ))
    ) : ( 
      <p>No Movies Found</p>
    )}
      <div className='row'>
        <div className='col-md-4'>
          
        </div>
      </div>
      <Foooter/>
    </div>
  )
}

export default Homepage




