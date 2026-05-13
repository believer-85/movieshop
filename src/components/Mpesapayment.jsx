import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Foooter from './Foooter';

const Mpesapayment = () => {

  const location = useLocation();

  // SINGLE PRODUCT
  const product = location.state?.product;

  // CART PAYMENT
  const cartItems = location.state?.cartItems || [];

  const totalAmount =
    location.state?.totalAmount ||
    product?.product_cost;

  // STATES
  const [phone, setPhone] = useState("");

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  // IMAGE URL
  const img_url =
    "https://macdonaldoryx.alwaysdata.net/static/images/";

  // =========================
  // PAYMENT
  // =========================
  const submit = async (e) => {

    e.preventDefault();

    setMessage("Please wait...");

    try {

      const data = new FormData();

      data.append("phone", phone);

      data.append("amount", totalAmount);

      const response = await axios.post(

        "https://macdonaldoryx.alwaysdata.net/api/mpesa_payment",

        data
      );

      setMessage(response.data.message);

      // CLEAR CART AFTER PAYMENT
      localStorage.removeItem('cart');

    } catch (error) {

      console.log(error);

      setError(error.message);
    }
  };

  return (

    <div className='container mt-4' id='mpesa'>

      <h1 className='text-center mb-4'>
        LIPA NA MPESA
      </h1>

      {error && (

        <div className='alert alert-danger'>
          {error}
        </div>
      )}

      <div
        className='card shadow-lg p-4 mb-5'
        style={{
          borderRadius: "20px",
          background: "#111",
          color: "white"
        }}
      >

        {/* SINGLE PRODUCT */}

        {product && (

          <div className='text-center mb-4'>

            <img

              src={img_url + product.product_photo}

              alt={product.product_name}

              style={{
                width: "250px",
                borderRadius: "20px"
              }}
            />

            <h3 className='mt-3'>
              {product.product_name}
            </h3>

            <h4 className='text-warning'>
              {product.product_cost} KES
            </h4>

          </div>
        )}

        {/* CART PRODUCTS */}

        {cartItems.length > 0 && (

          <div>

            <h3 className='mb-4'>
              Order Summary
            </h3>

            {cartItems.map(item => (

              <div

                key={item.id}

                className='d-flex justify-content-between border-bottom py-3'
              >

                <div>

                  <h5>{item.title}</h5>

                  <small>
                    Quantity: {item.quantity}
                  </small>

                </div>

                <h5 className='text-warning'>

                  {item.price * item.quantity} KES

                </h5>

              </div>
            ))}
          </div>
        )}

        {/* TOTAL */}

        <div className='mt-4 text-center'>

          <h2>

            Total:

            <span className='text-warning'>

              {" "}
              {totalAmount} KES

            </span>

          </h2>

        </div>

        {/* FORM */}

        <form onSubmit={submit} className='mt-4'>

          <p className='text-info'>
            {message}
          </p>

          <input

            type="text"

            className='form-control'

            placeholder='Enter Mpesa Number'

            value={phone}

            onChange={(e) =>
              setPhone(e.target.value)
            }
          />

          <button
            className='btn btn-danger w-100 mt-4'
          >
            Make Payment
          </button>

        </form>

      </div>

      <Foooter />

    </div>
  );
};

export default Mpesapayment;