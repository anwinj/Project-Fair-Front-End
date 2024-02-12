import React, { useContext } from 'react'
import {Navbar, Container} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { tokenAuthenticationContext } from '../../Context API/TokenAuth'

function Header({insideDashboard}) {

  // get context
  const {isAuthorised,setIsAuthorised} = useContext(tokenAuthenticationContext)

  const navigate = useNavigate()

  const handleLogout =()=>{
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("username")
    setIsAuthorised(false)
    navigate('/')
  }

  return (
    <>
      <Navbar style={{backgroundColor:'#90ee90',height:'80px'}}>
      <Container>
        <Navbar.Brand>
          <div className='text-success d-flex align-items-center'>
            <Link to={'/'}><img style={{width:'60px'}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Stack_Overflow_icon.svg/768px-Stack_Overflow_icon.svg.png" alt="" />
            </Link> 
            <h3 className='text-decoration-none text-light mt-4'>Project Fair</h3>
          </div>
        </Navbar.Brand>
        {
          insideDashboard&&
          <div>
            <button onClick={handleLogout} className='btn fs-5'><i class="fa-solid fa-right-from-bracket"></i>Logout</button>
          </div>
        }
      </Container>
    </Navbar>
    </>
  )
}

export default Header