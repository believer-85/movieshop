import React from 'react'

const footer = () => {
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
            <a href="https://www.facebook.com"></a>
            <a href="https://www.instagram.com"></a>
            <a href="https://www.x.com"></a>
        </div>

    </div>
  )
}

export default footer