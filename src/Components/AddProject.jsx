import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import uploadProjeectImg from '../assets/Images/upload-project.jpg'
import { ToastContainer,  toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectAPI } from '../Services/allAPI';
import { addProjectResponseContext } from '../../Context API/ContextShare';

function AddProject() {

  // get context
  const {addProjectResponse,setAddProjectResponse} = useContext(addProjectResponseContext)

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setProjectData({title:"",languages:"",overview:"",github:"",website:"",projectImage:""})
    setPreview("")
  }
  const handleShow = () => setShow(true);

  const [projectData,setProjectData] = useState({
    title:"",languages:"",overview:"",github:"",website:"",projectImage:""
  })
  // console.log(projectData);
  const [fileStatus,setFileStatus] = useState(false)
  const [preview,setPreview] = useState("")

  useEffect(()=>{
    if(projectData.projectImage.type==="image/png" || projectData.projectImage.type==="image/jpeg" || projectData.projectImage.type==="image/jpg"){
      setPreview(URL.createObjectURL(projectData.projectImage))
      setFileStatus(false)
    }
    else{
      setFileStatus(true)
      setPreview("")
      setProjectData({...projectData,projectImage:""})
    }
  },[projectData.projectImage])

  const handleAddProject = async ()=>{
    const {title,languages,overview,github,website,projectImage} = projectData
    if(!title||!languages||!overview||!github||!website||!projectImage){
      toast.warning("Please fill the from completely")
    }
    else{
      // api call - reqBody
      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("languages",languages)
      reqBody.append("overview",overview)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("projectImage",projectImage)
  
      // api call - reqHeader
      const token = sessionStorage.getItem("token")
      if(token){
        const reqHeader = {
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }

        // api call
        try{
          const result = await addProjectAPI(reqBody,reqHeader)
          if(result.status===200){
            console.log(result.data);
            handleClose()
            setAddProjectResponse(result.data)
          }
          else{
            toast.warning(result.response.data)
          }
        }catch(err){
          console.log(result);
        }
      }
      
    }

  }

  return (
    <>
      <button className='btn btn-success rounded' onClick={handleShow}>Add Project</button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-6">
              <label>
                <input type="file" style={{display:'none'}} onChange={e=>setProjectData({...projectData,projectImage:e.target.files[0]})}/>
                <img style={{width:'300px'}} src={preview?preview:uploadProjeectImg} alt="" />
              </label>
              {
                fileStatus&&<div className='text-danger'>*Please upload files with follwing extensions: png, jpg, jpeg*</div>
              }
            </div>
            <div className="col-lg-6">
              <div className="mb-3">
                <input type="text" className="form-control" placeholder="Project Title" value={projectData.title} onChange={e=>setProjectData({...projectData,title:e.target.value})} />
              </div>
              <div className="mb-3">
                <input type="text" className="form-control" placeholder="languages Used" value={projectData.languages} onChange={e=>setProjectData({...projectData,languages:e.target.value})}/>
              </div>
              <div className="mb-3">
                <input type="text" className="form-control" placeholder="Project Githib Link" value={projectData.github} onChange={e=>setProjectData({...projectData,github:e.target.value})} />
              </div>
              <div className="mb-3">
                <input type="text" className="form-control" placeholder="Project Website Link" value={projectData.website} onChange={e=>setProjectData({...projectData,website:e.target.value})} />
              </div>
              <div className="mb-3">
                <input type="text" className="form-control" placeholder="Project Description" value={projectData.overview} onChange={e=>setProjectData({...projectData,overview:e.target.value})} />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="warning" onClick={handleAddProject}>Add</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer autoClose={2500} theme='colored' />
    </>
  )
}

export default AddProject