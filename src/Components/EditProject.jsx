import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import uploadProjeectImg from '../assets/Images/upload-project.jpg'
import { SERVER_URL } from '../Services/serverUrl';
import { editProjectAPI } from '../Services/allAPI';
import { toast } from 'react-toastify';
import { editProjectResponseContext } from '../../Context API/ContextShare';


function EditProject({project}) {

  // get context 
  const {editProjectResponse,setEditProjectResponse} = useContext(editProjectResponseContext)

  const [projectData,setProjectData] = useState({
    id:project._id,title:project.title,languages:project.languages,overview:project.overview,github:project.github,website:project.website,projectImage:""
  })

  const [show, setShow] = useState(false);
  const [preview,setPreview] = useState("")

  useEffect(()=>{
    if(projectData.projectImage){
      setPreview(URL.createObjectURL(projectData.projectImage))
    }
    else{
      setPreview("")
    }
  },[projectData.projectImage])

  const handleClose = () =>{ 
    setProjectData({
      id:project._id,title:project.title,languages:project.languages,overview:project.overview,github:project.github, website:project.website,projectImage:""
    })
    setPreview("")
    setShow(false);
  }
  const handleShow = () => setShow(true);
  // console.log(projectData);


  const handleUpdate = async () =>{
    const {id,title,languages,overview,github,website,projectImage} = projectData
    if(!title||!languages||!overview||!github||!website){
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
      preview?reqBody.append("projectImage",projectImage):reqBody.append("projectImage",project.projectImage)

      // api call - reqHeader
      const token = sessionStorage.getItem("token")
      if(token){
        const reqHeader = {
          "Content-Type":preview?"multipart/form-data":"application/json",
          "Authorization":`Bearer ${token}`
        }
        // api call
        try{
          const result = await editProjectAPI(id,reqBody,reqHeader)
          if(result.status===200){
            toast.success(`Project "${result.data.title}" updated successfully`)
            handleClose()
            setEditProjectResponse(result.data)
          }
          else{
            toast.warning(result.response.data)
          }
        }catch(err){
          console.log(err);
        }
      }
    }  
  }  
  
  
  return (
    <>
      <button className='btn rounded' onClick={handleShow}><i class="fa-solid fa-pen-to-square fa-2xl"></i></button>

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
                <input type="file" style={{display:'none'}} onChange={e=>setProjectData({...projectData,projectImage:e.target.files[0]})} />
                <img style={{width:'300px'}} src={preview?preview:`${SERVER_URL}/uploads/${project.projectImage}`}  alt="" />
              </label>
            </div>
            <div className="col-lg-6">
              <div className="mb-3">
                <input type="text" value={projectData.title} className="form-control" onChange={e=>setProjectData({...projectData,title:e.target.value})}  placeholder="Project Title"/>
              </div>
              <div className="mb-3">
                <input type="text" value={projectData.languages} className="form-control"  onChange={e=>setProjectData({...projectData,languages:e.target.value})} placeholder="languages Used" />
              </div>
              <div className="mb-3">
                <input type="text" value={projectData.github} className="form-control"  onChange={e=>setProjectData({...projectData,github:e.target.value})} placeholder="Project Githib Link" />
              </div>
              <div className="mb-3">
                <input type="text" value={projectData.website} className="form-control"  onChange={e=>setProjectData({...projectData,website:e.target.value})} placeholder="Project Website Link" />
              </div>
              <div className="mb-3">
                <input type="text" value={projectData.overview} className="form-control"  onChange={e=>setProjectData({...projectData,overview:e.target.value})} placeholder="Project Description" />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="warning" onClick={handleUpdate}>Update</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditProject