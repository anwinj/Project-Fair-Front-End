import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import {Row, Col} from 'react-bootstrap'
import ProjectCard from '../Components/ProjectCard'
import { getAllProjectAPI } from '../Services/allAPI'

function Projects() {

  const [allProjects,setAllProjects] = useState([])
  const [searchKey,setSearchKey] = useState("")

  const getAllProjects = async ()=>{
    const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader = {
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
      }
      const result = await getAllProjectAPI(searchKey,reqHeader)
      if(result.status===200){
        setAllProjects(result.data)
      }
      else{
        console.log(result.data);
      }
    }
  }
  console.log(allProjects);

  useEffect(()=>{
    getAllProjects()
  },[searchKey])

  return (
    <>
      <Header />
      <div className='project-page-design mb-5'>
        <div className="d-flex justify-content-between m-5">
          <h1>All Projects</h1>
          <input onChange={e=>setSearchKey(e.target.value)} style={{height:'45px',width:'400px'}} className='rounded' type="text" placeholder='Search projects by technology used..' />
        </div>
        <Row className='container-fluid ms-4'>
          {
            allProjects?.length>0?allProjects.map((project,index)=>(
              <Col key={index} sm={12} md={6} lg={4} className='mb-4'>
              <ProjectCard project={project}/>
            </Col>
            )):
            <div className='text-danger fs-4 fw-bolder'>
              Nothing to display
            </div>
          }
        </Row>
      </div>
    </>
  )
}

export default Projects