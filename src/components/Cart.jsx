import React, { useState, useEffect } from 'react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  // Load items
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
  }, []);

  // Remove item
  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item.product_id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // FIX: Ensure we use parseFloat to avoid NaN errors
  const total = cartItems.reduce((acc, item) => {
    const price = parseFloat(item.product_cost) || 0;
    const qty = parseInt(item.quantity) || 1;
    return acc + (price * qty);
  }, 0);

  const img_url = "https://macdonaldoryx.alwaysdata.net/static/images/";

  return (
    <div className="container mt-5 text-light pt-5">
      <h2 className="mb-4">Your Shopping Cart</h2>
      
      <div className="row">
        <div className="col-md-8">
          {cartItems.length === 0 ? (
            <div className="alert alert-info">Your cart is empty.</div>
          ) : (
            cartItems.map((item) => (
              <div key={item.product_id} className="card bg-dark border-secondary mb-3 p-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    {/* FIX: Using the correct image path */}
                    <img 
                      src={img_url + item.product_photo} 
                      alt="" 
                      className="rounded"
                      style={{ width: '80px', height: '100px', objectFit: 'cover', marginRight: '15px' }} 
                    />
                    <div>
                      <h5 className="mb-0 text-white">{item.product_name}</h5>
                      <small className="text-muted">Qty: {item.quantity}</small>
                    </div>
                  </div>
                  <div className="text-end text-white">
                    <p className="mb-1 fw-bold">{parseFloat(item.product_cost) * item.quantity} KES</p>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => removeItem(item.product_id)}>Remove</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Order Summary Side */}
        <div className="col-md-4">
          <div className="card bg-dark border-secondary p-3 text-white">
            <h4>Order Summary</h4>
            <hr className="border-secondary" />
            <div className="d-flex justify-content-between">
              <span>Shipping:</span>
              <span className="text-success">FREE</span>
            </div>
            <div className="d-flex justify-content-between mt-3">
              <span className="h5">Total:</span>
              <span className="h5 text-primary">{total} KES</span>
            </div>
            <button className="btn btn-success w-100 mt-3 fw-bold">CHECKOUT NOW</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;