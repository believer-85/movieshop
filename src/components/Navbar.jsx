import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [user, setUser] = useState(null);
    
    const [cartCount, setCartCount] = useState(0);
  
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = savedCart.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(count);
    const storedUser = localStorage.getItem("user");
    console.log(storedUser)
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem("user");
      }
    }
  }, []);

  // logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    // navigate("/signin") // Direct redirect to clear state
    window.location.href = "/signin";
  };
  return (
    <div>
         {/* navigation bar display */}
      <div className='col-md-12'>
        <nav className='navbar navbar-expand-md navbar-dark bg-dark m-2 rounded' id="main-nav">
          
          
            <b className='navbar-brand text-white me-4'>Movie Collections</b>
            <Link to='/' className='btn btn-outline-danger ms-2 nav-link mx-2'>Homepage</Link>
            <Link className="btn btn-outline-danger ms-2 nav-link mx-2 btn-sm px-3 ms-auto" to="/about">About Us</Link>

          {/* the collapse button */}
          <button className='navbar-toggler' data-bs-target="#navbarcollapse"data-bs-toggle="collapse">
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id="navbarcollapse">
            <div className='navbar-nav ms-auto'>

              {/* conditional logic for logout */}
              {user ? (
                <>
                  <span className='nav-link text success fw-bold'>Welcome, {user.username}👋</span>
                  <Link to='/addproduct'className='btn btn-outline-warning ms-2 nav-link mx-2 btn-sm px-3'>AddProduct</Link>
                  {/* the cart link */}
                  <Link to="/cart" className="btn btn-outline-light position-relative">
                    <i className="bi bi-cart3"></i> Cart
                    {cartCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cartCount}
                    </span>
                    )}
                  </Link>
                  <button onClick={handleLogout} className='btn btn-outline-danger ms-2 nav-link'>Logout</button>
                </>
              ) : (
                <>
                  <Link to='/signup' className='btn btn-outline-danger ms-2 nav-link mx-2 btn-sm px-3'>Signup</Link>
                  <Link to='/signin' className='btn btn-outline-danger ms-2 nav-link mx-2 btn-sm px-3'>Signin</Link>
                </>
              )}   
            </div>
          </div>

        </nav>
      </div>
    </div>
  )
}

export default Navbar