import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Foooter from './Foooter';

const Cart = () => {

  const [cartItems, setCartItems] = useState([]);

  const navigate = useNavigate();

  // =========================
  // LOAD CART
  // =========================
  useEffect(() => {

    const cart =
      JSON.parse(localStorage.getItem('cart')) || [];

    setCartItems(cart);

  }, []);

  // =========================
  // TOTAL
  // =========================
  const getTotalAmount = () => {

    return cartItems.reduce(

      (total, item) =>

        total + (item.price * item.quantity),

      0
    );
  };

  // =========================
  // REMOVE
  // =========================
  const removeItem = (id) => {

    const updatedCart =
      cartItems.filter(item => item.id !== id);

    localStorage.setItem(
      'cart',
      JSON.stringify(updatedCart)
    );

    setCartItems(updatedCart);
  };

  // =========================
  // INCREASE
  // =========================
  const increaseQuantity = (id) => {

    const updatedCart = cartItems.map(item => {

      if (item.id === id) {

        return {
          ...item,
          quantity: item.quantity + 1
        };
      }

      return item;
    });

    localStorage.setItem(
      'cart',
      JSON.stringify(updatedCart)
    );

    setCartItems(updatedCart);
  };

  // =========================
  // DECREASE
  // =========================
  const decreaseQuantity = (id) => {

    const updatedCart = cartItems.map(item => {

      if (
        item.id === id &&
        item.quantity > 1
      ) {

        return {
          ...item,
          quantity: item.quantity - 1
        };
      }

      return item;
    });

    localStorage.setItem(
      'cart',
      JSON.stringify(updatedCart)
    );

    setCartItems(updatedCart);
  };

  return (

    <div className="container-fluid mt-4">

      <h1
        className="text-center mb-5"
        style={{
          color: "white",
          fontWeight: "bold"
        }}
      >
        Your Cart
      </h1>

      <div className="row">

        {cartItems.length === 0 ? (

          <h3 className="text-center">
            Your cart is empty
          </h3>

        ) : (

          cartItems.map(item => (

            <div
              className="col-md-3 mb-4"
              key={item.id}
            >

              <div

                className="card h-100 shadow-lg"

                style={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  transition: "0.4s ease",
                  background: "#111",
                  color: "white",
                  cursor: "pointer"
                }}

                onMouseEnter={(e) => {

                  e.currentTarget.style.transform =
                    "translateY(-10px) scale(1.03)";

                  e.currentTarget.style.boxShadow =
                    "0px 15px 30px rgba(255,0,0,0.4)";
                }}

                onMouseLeave={(e) => {

                  e.currentTarget.style.transform =
                    "translateY(0px) scale(1)";

                  e.currentTarget.style.boxShadow =
                    "0px 5px 15px rgba(0,0,0,0.3)";
                }}
              >

                {/* IMAGE */}

                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    height: "320px",
                    objectFit: "cover"
                  }}
                />

                {/* BODY */}

                <div className="card-body">

                  <h4>{item.title}</h4>

                  <p className="text-warning">
                    {item.price} KES
                  </p>

                  {/* QUANTITY */}

                  <div className="d-flex justify-content-between align-items-center mb-3">

                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        decreaseQuantity(item.id)
                      }
                    >
                      -
                    </button>

                    <h5>{item.quantity}</h5>

                    <button
                      className="btn btn-success"
                      onClick={() =>
                        increaseQuantity(item.id)
                      }
                    >
                      +
                    </button>

                  </div>

                  <h5>

                    Total:

                    <span className="text-warning">

                      {" "}
                      {item.price * item.quantity} KES

                    </span>

                  </h5>

                  <button
                    className="btn btn-outline-danger w-100 mt-3"
                    onClick={() =>
                      removeItem(item.id)
                    }
                  >
                    Remove
                  </button>

                </div>

              </div>

            </div>
          ))
        )}

      </div>

      {/* ========================= */}
      {/* GRAND TOTAL */}
      {/* ========================= */}

      {cartItems.length > 0 && (

        <div

          className="text-center mt-5 p-4"

          style={{
            background: "#111",
            borderRadius: "20px",
            color: "white"
          }}
        >

          <h2>

            Grand Total:

            <span className="text-warning">

              {" "}
              {getTotalAmount()} KES

            </span>

          </h2>

          <button

            className="btn btn-danger btn-lg mt-3 px-5"

            onClick={() =>

              navigate('/makepayment', {

                state: {

                  cartItems: cartItems,

                  totalAmount: getTotalAmount()
                }
              })
            }
          >
            Proceed To Payment
          </button>

        </div>
      )}

      <Foooter />

    </div>
  );
};

export default Cart;