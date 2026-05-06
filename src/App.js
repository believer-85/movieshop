import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import {BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Homepage from './components/Homepage';
import Addproduct from './components/Addproduct';
import Mpesapayment from './components/Mpesapayment';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Chatbot from './components/Chatbot';
import Cart from './components/Cart';
import Aboutpage from './components/Aboutpage';


function App() {
  

  return (
    <Router>
    <div className="App">
      <div className='App-header'>
        <h1>MOVIESHOP</h1>
      </div>
     
<Navbar/>
      {/* links */}
      
      <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/addproduct' element={<Addproduct/>}/>
        <Route path="/cart" element={<Cart/>} />
        <Route path='/makepayment' element={<Mpesapayment/>}/>
        <Route path='/about' element={<Aboutpage/>}/>
      </Routes>
      <Chatbot/>
      
    </div>
    </Router>
  );
}

export default App;


