import { useState } from 'react';
import {useLocation} from 'react-router-dom'
import  axios  from 'axios';
import Foooter from './Foooter';
const Mpesapayment = ()=> {
    // Extract the received product using useLocation()
    const { product } = useLocation().state || {}; 
    //Hook to Hold Phone Number
    const [phone, setPhone] = useState("")
    const [message, setMessage] = useState("")
    // img url
    const img_url = "https://macdonaldoryx.alwaysdata.net/static/images/"
    
    //Create a submit Function
    const submit = async(e) =>{
        e.preventDefault(); // prebent default JS actions
     //Update loading Hook with a message
     setMessage("Please wait as we Processs!");

      // Put updated hooks in data variable
      const data = new FormData();
      data.append("phone", phone);
      data.append("amount", product.product_cost);

      //post your data to your Backend API
      const response = await axios.post("https://macdonaldoryx.alwaysdata.net/api/mpesa_payment",data);

      setMessage("Please Complete Payment on Your Phone")
    }   
    
    return (
    <div className='row justify-content-center mt-2' id='mpesa'>
            <h1>LIPA NA MPESA</h1>
            <div className='col-md-6 card shadow card-margin mb-4'> 
            <img src={img_url + product.product_photo} alt={product.product_photo} />
            <p>Product NAME: {product.product_name}</p>  
            <p>Product Cost: {product.product_cost}</p>
      
            <form onSubmit={submit}>
                   <p className='text-info'>{message}</p> <br />
                  <input 
                     type="text" 
                     className='form-control'
                     placeholder='Enter Phone Number'
                     value={phone}
                     onChange={(e)=>setPhone(e.target.value)}/> <br /><br />
                  <button className='btn btn-dark'>
                       Make Payment
                  </button>
                  
            </form>
            <br />
            </div>
            <Foooter/>
        </div>
    )
}



export default Mpesapayment
