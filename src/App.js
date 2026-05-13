import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Homepage from './components/Homepage';
import Addproduct from './components/Addproduct';
import Mpesapayment from './components/Mpesapayment';
import Navbar from './components/Navbar';
import Chatbot from './components/Chatbot';
import Cart from './components/Cart';
import Aboutpage from './components/Aboutpage';
import MovieDetails from './components/MovieDetails';
import banner from './images/banner.png';

function App() {
  

  return (
    <Router>
    <div className="App">
      <div
        style={{
          width: "100%",
          overflow: "hidden",
          background: "#000"
        }}
      >

        <img
          src={banner}
          alt="MovieShop Banner"
          className="img-fluid"
          style={{
            width: "100%",
            height: "120px",
            objectFit: "cover",
            borderTop: "3px solid crimson"
          }}
        />

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
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
      <Chatbot/>
      
    </div>
    </Router>
  );
}

export default App;


