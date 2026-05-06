import React from 'react';
import Foooter from './Foooter';

const Aboutpage = () => {
  return (
    <div className="container mt-5 text-start">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="text-danger mb-4">About MOVIESHOP</h1>
          <p className="lead">
            Welcome to <strong>MOVIESHOP</strong>, your premier destination for the latest 
            and greatest in cinematography. 
          </p>
          <hr className="bg-secondary" />
          
          <h3 className="mt-4">Our Mission</h3>
          <p>
            We aim to provide a seamless experience for movie enthusiasts to discover, 
            track, and acquire their favorite titles. Whether you're into spine-chilling 
            horrors, heart-wrenching dramas, or high-octane action, we have something for you.
          </p>

          <h3 className="mt-4">Why Choose Us?</h3>
          <ul className="list-group list-group-flush">
            <li className="list-group-item bg-transparent text-white border-secondary">
              ✅ High Quality 4K Streaming & Downloads
            </li>
            <li className="list-group-item bg-transparent text-white border-secondary">
              ✅ Secure Payments via M-Pesa
            </li>
            <li className="list-group-item bg-transparent text-white border-secondary">
              ✅ 24/7 AI Chatbot Support
            </li>
          </ul>

          <div className="mt-5 p-4 rounded" style={{ backgroundColor: '#1c1c1c' }}>
            <h4>Contact Support</h4>
            <p>Have questions? Reach out to us at <strong>support@movieshop.com</strong></p>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <Foooter />
      </div>
    </div>
  );
};

export default Aboutpage;