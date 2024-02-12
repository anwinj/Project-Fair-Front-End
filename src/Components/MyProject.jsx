import React, { useContext, useEffect, useState } from 'react'
import AddProject from './AddProject'
import EditProject from './EditProject'
import { deleteProjectAPI, getUserProjectAPI } from '../Services/allAPI'
import { addProjectResponseContext, editProjectResponseContext } from '../../Context API/ContextShare'
import { ToastContainer,  toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyProject() {
  // get Context
  const {addProjectResponse,setAddProjectResponse} = useContext(addProjectResponseContext)
  const {editProjectResponse,setEditProjectResponse} = useContext(editProjectResponseContext)

  const [allProjects,setAllProjects] = useState([])

  const getUserProjects = async ()=>{
    const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader = {
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
      }
      const result = await getUserProjectAPI(reqHeader)
      if(result.status===200){
        setAllProjects(result.data)
      }
      else{
        console.log(result.data);
      }
    }
  }
  // console.log(allProjects);

  const handleDeleteProject = async(pid)=>{
    const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader = {
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      }
      try{
        const result = await deleteProjectAPI(pid,reqHeader)
        if(result.status===200){
          getUserProjects()
        }
        else{
          toast.warning(result.response.data)
        }
      }catch(err){
        console.log(err);
      }
    }
  }

  useEffect(()=>{
    getUserProjects()
  },[addProjectResponse,editProjectResponse])

  return (
    <>
      <div className='p-3'>
        <div className="d-flex justify-content-between align-items-center">
          <h2>My Projects</h2>
          <div> <AddProject/> </div>
        </div>
        {
          allProjects?.length>0?allProjects.map((project,index)=>(
            <div key={index} className="d-flex justify-content-between align-items-center mt-4 border rounded p-3">
              <h5 className='text-danger'>{project.title}</h5>
              <div className='d-flex  align-items-center'>
                <EditProject project={project}/>
                <a className='btn' href={project.website} target='_blank'><i class="fa-solid fa-link fa-2xl"></i></a>
                <a className='btn' href={project.github} target='_blank'><i class="fa-brands fa-github fa-2xl"></i></a>
                <button onClick={()=>handleDeleteProject(project?._id)} className='btn'><i class="fa-solid fa-trash fa-2xl"></i></button>
              </div>
            </div>
          )):
          <div className='text-danger fs-4 fw-bolder'>No projects to display</div>
        }
        
      </div>
      <ToastContainer autoClose={2500} theme='colored' />
    </>
  )
}

export default MyProject