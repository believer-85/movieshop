import React from 'react'
import image1 from '../images/fb.png'
import image2 from '../images/in.png'
import image3 from '../images/x.png'

const Foooter = () => {
  return (
    <div className='row' id='footer'>
        <div className='col-md-6'>
         <h4>Contact us</h4>
         <form action="">
            <input type="email" placeholder='enter your email' className='form-control'/><br />
            <textarea name="" id="" cols="7" rows="7" placeholder='please leave a comment' className='form-control'></textarea><br />
            <input type="submit" value="send message" className='btn btn-outline-danger' />
         </form>
        </div>
        <div className='col-md-6'>
            <h4>Stay Connected</h4>
            <a href="https://www.facebook.com"> <img src={image1} alt="" /></a> 
            <a href="https://www.instagram.com"><img src={image2} alt="" /></a>
            <a href="https://www.x.com"><img src={image3} alt=""></img></a>
        </div>
         <footer class="text-light bg-dark p-2 text-center">
            <h5>Developed by Believer. &copy; 2026. All rights reserved</h5>
         </footer>
    </div>
    
  )
}

export default Foooter