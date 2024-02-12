import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Form} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginAPI, registerAPI } from '../Services/allAPI';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { tokenAuthenticationContext } from '../../Context API/TokenAuth';


function Auth({insideRegister}) {

  // get context
  const {isAuthorised,setIsAuthorised} = useContext(tokenAuthenticationContext)

  const navigate = useNavigate()
  const [userData,setUserData] = useState({
    username:"",email:"",password:""
  })
  const [loginStatus,setLoginStatus] = useState(false)

  const handlRegister = async(e)=>{
    e.preventDefault()
    // console.log(userData);
    const {username,email,password} = userData
    if(!username || !email || !password){
      toast.info("Please fill the form completely")
    }
    else{
      // toast.success("Proceed to api call")
      try{
        const result = await registerAPI(userData)
        // console.log(result);
        if(result.status==200){
          toast.success(`${result.data.username} has been successfully registered!!!`)
          setUserData({username:"",email:"",password:""})
          setTimeout(()=>{
            navigate('/login')
          },3000)
        }
        else{
          toast.warning(result.response.data)
        }
      }catch(err){
        console.log(err);
      }
    }
  }

  const handleLogin = async (e)=>{
    e.preventDefault()
    const {email,password} = userData
    if(!email||!password){
      toast.info("Please fill the form completely!!!")
    }
    else{
      try{
        const result = await loginAPI({email,password})
        console.log(result);
        if(result.status===200){
          setLoginStatus(true)
          sessionStorage.setItem("username",result.data.existingUser.username)
          sessionStorage.setItem("token",result.data.token)
          sessionStorage.setItem("userDetails",JSON.stringify(result.data.existingUser))
          setIsAuthorised(true)
          setTimeout(()=>{
            navigate('/')
            setUserData({email:"",password:""})
            setLoginStatus(false)
          },2500)
          
        }
        else{
          toast.warning(result.response.data)
        }
      }catch(err){
        console.log(err);
      }
    }
  }

  return (
    <div style={{width:'100%',height:'100vh'}} className='d-flex justify-content-center align-items-center'>
      <div className='container w-75'>
        <Link className='d-flex align-items-center' to={'/'}><i class="fa-solid fa-arrow-left fa-lg"></i><h5 className="ms-2">Back To Home</h5></Link>
        <div className="card shadow bg-success rounded">
          <div className="row align-items-center p-5">
            <div className="col-lg-6">
              <img style={{width:'450px'}} src="https://ncetir.com/Images/login@4x.png" alt="login" />
            </div>
            <div className="col-lg-6 d-flex flex-column align-items-center">
              <div className="d-flex align-items-center">
                <Link to={'/'}><img style={{width:'100px'}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Stack_Overflow_icon.svg/768px-Stack_Overflow_icon.svg.png" alt="" />
                </Link> 
                <h2 className='text-decoration-none text-light mt-4'>Project Fair</h2>
              </div>
              <h5 className='fw-bolder mt-2 pb-3 text-light ms-3'>
                  {insideRegister?'Sign up to your Account':'Sign In to your Account'}
              </h5>
              <Form className='w-75'>
                {
                  insideRegister&&(<Form.Group className="mb-3" controlId="formBasicUsername">
                      <Form.Control className='rounded' type="text" placeholder="Enter username" onChange={e=>setUserData({...userData,username:e.target.value})} value={userData.username} />
                  </Form.Group>)
                }
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control className='rounded' type="email" placeholder="Enter email" onChange={e=>setUserData({...userData,email:e.target.value})} value={userData.email} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control className='rounded' type="password" placeholder="Enter password" onChange={e=>setUserData({...userData,password:e.target.value})} value={userData.password} />
                </Form.Group>

                {
                  insideRegister?
                  <div>
                    <button className='btn btn-warning rounded mb-3' onClick={handlRegister}>Register</button>
                    <p className='text-light'>Already have an Account? Click here to <Link to={'/login'}>login</Link> </p>
                  </div>:

                  <div>
                    <div>
                      <button className='btn btn-warning rounded mb-3'onClick={handleLogin}>Login
                        {loginStatus&&<Spinner animation="border" />}
                      </button>
  
                    </div>
                    <p className='text-light'>New User? Click here to <Link to={'/register'}>register</Link> </p>
                  </div>
                }

              </Form>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer autoClose={2500} theme='colored' />
    </div>
  )
}

export default Auth