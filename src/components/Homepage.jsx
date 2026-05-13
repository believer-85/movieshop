import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Foooter from './Foooter';

import slide1 from '../images/originals.jpg';
import slide2 from '../images/prison break.jpeg';
import slide3 from '../images/legacy.jpg';
import slide4 from '../images/vampire diaries.webp';
import slide5 from '../images/lucifer.jpg';

const Homepage = () => {

  // =========================
  // LOCAL PRODUCTS
  // =========================
  const [products, setProducts] = useState([]);

  // =========================
  // TMDB MOVIES
  // =========================
  const [tmdbMovies, setTmdbMovies] = useState([]);

  // =========================
  // STATES
  // =========================
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");

  // =========================
  // SEARCH
  // =========================
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  // =========================
  // IMAGE URLS
  // =========================
  const img_url = "https://macdonaldoryx.alwaysdata.net/static/images/";

  const TMDB_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

  // =========================
  // TMDB CONFIG
  // =========================
  const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMGFkZGRkN2QwMTYwNjZhYzNjMzI3MWRhYmQzYzVhYiIsIm5iZiI6MTc3Nzk4OTUyMC45MjcsInN1YiI6IjY5ZjlmNzkwNDcxYmM1MDAxZjY0NjhlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gRuOFSJslvoXiYTEsjcthjx_o6WCBgdMIF12viRDA6Y";

  const TMDB_HEADERS = {
    Authorization: `Bearer ${TMDB_TOKEN}`,
    accept: "application/json"
  };

  // =========================
  // CART LOGIC
  // =========================
  const handleAddToCart = (product) => {

    const existingCart =
      JSON.parse(localStorage.getItem('cart')) || [];

    const itemIndex =
      existingCart.findIndex(item => item.id === product.id);

    if (itemIndex > -1) {
      existingCart[itemIndex].quantity += 1;
    } else {

      existingCart.push({
        id: product.product_id,
        title: product.product_name,
        price: product.product_cost,
        image: img_url + product.product_photo,
        quantity: 1
      });
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));

    alert(`${product.product_name} has been added to your cart!`);
  };

  // =========================
  // FILTER PRODUCTS
  // =========================
  const filteredProducts = products.filter((product) =>
    product.product_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // =========================
  // FILTER TMDB MOVIES
  // =========================
  const filteredTMDBMovies = tmdbMovies.filter((movie) =>
    movie.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // =========================
  // VOICE SEARCH
  // =========================
  const handleVoiceSearch = () => {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Browser does not support voice search");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = 'en-US';

    setLoading("Listening...");

    recognition.onresult = (event) => {

      const transcript =
        event.results[0][0].transcript;

      setSearchTerm(transcript);

      setLoading("");
    };

    recognition.onerror = (event) => {

      setError("Voice Error: " + event.error);

      setLoading("");
    };

    recognition.start();
  };

  // =========================
  // FETCH LOCAL PRODUCTS
  // =========================
  const fetchProducts = async () => {

    try {

      setLoading("Loading products...");

      const response = await axios.get(
        "https://macdonaldoryx.alwaysdata.net/api/get_product_details"
      );

      setProducts(response.data);

      setLoading("");

    } catch (error) {

      console.log(error);

      setError("Error fetching products");
    }
  };

  // =========================
  // FETCH TMDB MOVIES
  // =========================
 // =========================
// FETCH TMDB MOVIES
// =========================
const fetchTMDBMovies = async () => {

  try {

    setLoading("Loading TMDB movies...");

    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/popular",
      {
        headers: TMDB_HEADERS
      }
    );

    setTmdbMovies(response.data.results);

    setLoading("");

  } catch (error) {

    console.log(error);

    setError("Error fetching TMDB movies");
  }
};

// =========================
// SEARCH TMDB MOVIES
// =========================
const searchTMDBMovies = async (query) => {

  if (!query.trim()) {

    fetchTMDBMovies();

    return;
  }

  try {

    setLoading("Searching movies...");

    const response = await axios.get(
      "https://api.themoviedb.org/3/search/movie",
      {
        headers: TMDB_HEADERS,

        params: {
          query: query
        }
      }
    );

    setTmdbMovies(response.data.results);

    setLoading("");

  } catch (error) {

    console.log(error);

    setError("Error searching movies");
  }
};
  
  
  // =========================
  // USE EFFECT
  // =========================
  useEffect(() => {

    fetchProducts();

    fetchTMDBMovies();

  }, []);

  return (

    <div className='row' id="homepage-root">

      {/* SEARCH BAR */}

      <div className='row justify-content-center mt-3'>

        <div className='col-md-6 search-container d-flex align-items-center'>

          <input
            type="text"
            className='form-control search-input'
            placeholder='Search for a movie...'
            value={searchTerm}
            onChange={(e) => {

              const value = e.target.value;

              setSearchTerm(value);

              searchTMDBMovies(value);
            }}
          />

          <button
            type="button"
            className='btn border-0 bg-transparent'
            onClick={handleVoiceSearch}
            style={{ fontSize: '1.5rem' }}
          >
            🎙️
          </button>

          <button className='search-btn'>
            🔍
          </button>

        </div>
      </div>

      {/* CAROUSEL */}

      <section className="row w-50 mx-auto mt-4">

        <div className="col-md-10 mx-auto">

          <div
            className="carousel slide peeking-carousel"
            id="mycarousel"
            data-bs-ride="carousel"
          >

            <div className="carousel-inner overflow-visible">

              <div className="carousel-item active">
                <img src={slide1} alt="" className="d-block w-100 carousel-img" />
              </div>

              <div className="carousel-item">
                <img src={slide2} alt="" className="d-block w-100 carousel-img" />
              </div>

              <div className="carousel-item">
                <img src={slide3} alt="" className="d-block w-100 carousel-img" />
              </div>

              <div className="carousel-item">
                <img src={slide4} alt="" className="d-block w-100 carousel-img" />
              </div>

              <div className="carousel-item">
                <img src={slide5} alt="" className="d-block w-100 carousel-img" />
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* PRODUCTS */}

      <h1 className='mt-5' id='movie-title'>
        Available Movies
      </h1>

      {loading}
      {error}

      {filteredProducts.map((product) => (

        <div className="col-md-3 mb-4" key={product.id}>

          <div className='card movie-card shadow-lg'>

            <img
              src={img_url + product.product_photo}
              alt=""
              className='product_img'
              style={{
                height: '350px',
                objectFit: 'cover'
              }}
            />

            <div className='card-body'>

              <h4>{product.product_name}</h4>

              <p>{product.product_description}</p>

              <b className='text-warning'>
                {product.product_cost} KES
              </b>

              <button
                className="btn btn-outline-danger mt-2 w-100"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>

              <button
                className="btn btn-dark mt-2 w-100"
                onClick={() =>
                  navigate('/makepayment',
                    { state: { product } })
                }
              >
                Purchase now
              </button>

            </div>

          </div>

        </div>
      ))}

      {/* ========================= */}
      {/* TMDB SECTION */}
      {/* ========================= */}

      <h1 className='mt-5 text-center'>
        Trending Movies From TMDB
      </h1>

      {filteredTMDBMovies.map((movie) => (

        <div className="col-md-3 mb-4" key={movie.id}>

          <div className="card shadow-lg h-100">

            <img
              src={`${TMDB_IMAGE_URL}${movie.poster_path}`}
              alt={movie.title}
              className="card-img-top"
              style={{
                height: '350px',
                objectFit: 'cover'
              }}
            />

            <div className="card-body">

              <h5>{movie.title}</h5>

              <p>
                {movie.overview.slice(0, 100)}...
              </p>

              <p className="text-warning">
                ⭐ {movie.vote_average}
              </p>

              <button
                className="btn btn-danger w-100"
                onClick={() =>
                  navigate(`/movie/${movie.id}`)
                }
              >
                Watch Details
              </button>

            </div>

          </div>

        </div>
      ))}

      <Foooter />

    </div>
  );
};

export default Homepage;