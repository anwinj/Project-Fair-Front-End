import React from 'react'
import { Link } from 'react-router-dom'


function Footer() {
  return (
    <div  style={{backgroundColor:'#90ee90'}} className='pb-2' >
      <div className="footer-content mt-4 d-flex justify-content-between p-5">

        <div className="media w-25 text-light">
          <div className='text-success d-flex align-items-center'>
            <Link to={'/'}><img style={{width:'100px'}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Stack_Overflow_icon.svg/768px-Stack_Overflow_icon.svg.png" alt="" />
            </Link> 
            <h2 className='text-decoration-none text-light mt-4'>Project Fair</h2>
          </div>
          <span>Designed and build with all the love in the world by Bootstrap Team with the help of our contributors</span> <br />
          <span>Code Licensed by MIT, docs CC by 3.0</span> <br />
          <span>Currently v5.3.2</span>
        </div>

        <div className="links d-flex flex-column mt-5">
          <h4 className='text-success'>Links</h4>
          <Link to={'/'} style={{color:'white'}} className='text-decoration-none'>Home</Link>
          <Link to={'/wishlist'} style={{color:'white'}} className='text-decoration-none'>WishList</Link>
          <Link to={'/cart'} style={{color:'white'}} className='text-decoration-none'>Cart</Link>
        </div>

        <div className="guides d-flex flex-column mt-5">
        <h4 className='text-success'>Guides</h4>
          <a style={{color:'white'}} target='_blank' className='text-decoration-none' href="https://react.dev/">React</a>
          <a style={{color:'white'}} target='_blank' className='text-decoration-none' href="https://react-bootstrap.netlify.app/">React Bootstrap</a>
          <a style={{color:'white'}} target='_blank' className='text-decoration-none' href="https://www.w3schools.com/react/react_router.asp">React Routing</a>
        </div>

        <div className="contact mt-5">
          <h4 className='text-success'>Contact Us</h4>
          
          <div className ='contact-form'>
            <input className='btn btn-light rounded'placeholder='Enter Your Email' type="text" />
            <div className='btn btn-info ms-2 rounded'><i class="fa-solid fa-arrow-right"></i></div>
          </div>

          <div className="contact-links mt-4">
            <a href='#' style={{color:'white'}}><i class="fa-solid fa-envelope fa-2xl me-3"></i></a>
            <a href='#' style={{color:'white'}}><i class="fa-brands fa-twitter fa-2xl me-3"></i></a>
            <a href='#' style={{color:'white'}}><i class="fa-brands fa-github fa-2xl me-3"></i></a>
            <a href='#' style={{color:'white'}}><i class="fa-brands fa-facebook fa-2xl me-3"></i></a>
            <a href='#' style={{color:'white'}}><i class="fa-brands fa-instagram fa-2xl me-3"></i></a>
            <a href='#' style={{color:'white'}}><i class="fa-brands fa-linkedin fa-2xl"></i></a>
          </div>
        </div>
      </div>
      <p className='text-center' style={{color:'white'}} >Copyright &copy; 2023 Project fair. Build with React</p>
      
    </div>
  )
}

export default Footer