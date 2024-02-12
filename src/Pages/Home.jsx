import React, { useEffect, useState } from 'react'
import landingImg from '../assets/Images/LandingImg.png'
import { Link, useNavigate } from 'react-router-dom'
import ProjectCard from '../Components/ProjectCard'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getHomeProjectAPI } from '../Services/allAPI';

function Home() {
  const navigate = useNavigate()
  const [isLoggedIn,setIsLoggedIn] = useState(false)
  const [allProjects,setAllProjects] = useState([])

  const getHomeProject = async()=>{
    const result = await getHomeProjectAPI()
    if(result.status===200){
      setAllProjects(result.data)
    }
    else{
      console.log(result);
    }
  }

  // console.log(allProjects);

  useEffect(()=>{
    getHomeProject()
    if(sessionStorage.getItem("token")){
      setIsLoggedIn(true)
    }
    else{
      setIsLoggedIn(false)
    }
  },[])

  const handleProjectPage = ()=>{
    if(sessionStorage.getItem("token")){
      navigate('/projects')
    }
    else{
      toast.warning("Please login to explore our projects!!!!")
    }
  }
  

  return (
  <>
    {/* landing page section*/}
    <div style={{width:'100%',height:'100vh',backgroundColor:'#90ee90',overflow:'hidden'}} className='rounded d-flex align-items-center'>
      <div style={{width:'100%'}} className="row">
        <div className="col-lg-6">
          <div className='d-flex align-items-center ms-5 mt-5'>
            <img style={{width:'200px'}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Stack_Overflow_icon.svg/768px-Stack_Overflow_icon.svg.png" alt="" />
            <h1 style={{fontSize:'60px'}} className='mt-5 text-light'>Project Fair</h1>
          </div>
          <p className='ms-5 fs-5'>One Stop Destination for all software development Projects. Where users can add and manage their projects. As well as access all the projects in our website. What are you waiting for !!!</p>
          {isLoggedIn?<Link to={'/dashboard'} className='btn btn-warning ms-5 rounded p-2 mt-3'>Manage your Projects</Link>
          :<Link to={'/login'} className='btn btn-warning ms-5 rounded p-2 mt-3'>Start to explore</Link>}
        </div>
        <div className="col-lg-2"></div>
        <div className="col-lg-4">
          <img style={{width:'750px',marginLeft:'-200px'}} src={landingImg} alt="" />
        </div>
      </div>
    </div>

    {/* all projects section */}
    <div className="projects mt-5">
      <h1 className='text-center mb-5'>Explore Our Projects</h1>
      <marquee>
        <div className='d-flex justify-content-between '>
          {
            allProjects.length>0?allProjects.map((project,index)=>(
              <div key={index} className='me-5'>
                <ProjectCard project={project}/>
              </div>
            )):null
          }
        </div>
      </marquee>
      <div className="text-center mt-3">
        <button onClick={handleProjectPage} className='btn btn-warning rounded'>View More Projects</button>
      </div>
    </div>
    <ToastContainer autoClose={2500} theme='colored' />
  </> 
  )
}

export default Home