import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import {BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Homepage from './components/Homepage';
import Addproduct from './components/Addproduct';
import Mpesapayment from './components/Mpesapayment';

function App() {
  return (
    <Router>
    <div className="App">
      <div className='App-header'>
        <h1>MOVIESHOP</h1>
      </div>
      {/* navigation bar display */}
      <div className='col-md-12'>
        <nav className='navbar navbar-expand-md navbar-dark bg-dark m-2 rounded' id="main-nav">
          
          
            <b className='navbar-brand text-white me-4'>Movie Collections</b>
            <Link to='/' className='btn btn-outline-danger ms-2 nav-link mx-2'>Homepage</Link>
          

          {/* the collapse button */}
          <button className='navbar-toggler' data-bs-target="#navbarcollapse"data-bs-toggle="collapse">
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id="navbarcollapse">
            <div className='navbar-nav ms-auto'>
             
              <Link to='/signup' className='btn btn-outline-danger ms-2 nav-link mx-2 btn-sm px-3'>Signup</Link>
              <Link to='/signin' className='btn btn-outline-danger ms-2 nav-link mx-2 btn-sm px-3'>Signin</Link>
              <Link to='/addproduct'className='btn btn-outline-warning ms-2 nav-link mx-2 btn-sm px-3'>AddProduct</Link>
              
            </div>
          </div>

        </nav>
      </div>

      {/* links */}
      
      <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/addproduct' element={<Addproduct/>}/>
        <Route path='/makepayment' element={<Mpesapayment/>}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;


