import React, { useEffect, useState } from 'react'
import { Collapse } from 'react-bootstrap'
import profilePic from '../assets/Images/profile.jpg'
import { SERVER_URL } from '../Services/serverUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateUserProfileAPI } from '../Services/allAPI';

function Profile() {

  const [open, setOpen] = useState(false);
  const [userData,setUserData] = useState({
    username:"",password:"",email:"",linkedin:"",github:"",profileImage:""
  })
  const [existingImage,setExistingImage] = useState("")
  const [preview,setPreview] = useState("")

  useEffect(()=>{
    const userDetails = JSON.parse(sessionStorage.getItem("userDetails"))
    setUserData({
      ...userData,username:userDetails.username,password:userDetails.password,email:userDetails.email,github:userDetails.github,linkedin:userDetails.linkedin
    })
    setExistingImage(userDetails.profile)
  },[open])

  useEffect(()=>{
    if(userData.profileImage){
      setPreview(URL.createObjectURL(userData.profileImage))
    }
    else{
      setPreview("")
    }
  },[userData.profileImage])
  // console.log(userData);

  const handleProfileUpdate = async () =>{
    const {username,password,email,github,linkedin,profileImage} = userData
    if(!github||!linkedin){
      toast.info("Please fill form completely")
    }
    else{
      // proceed to api call
      const reqBody = new FormData()
      reqBody.append("username",username)
      reqBody.append("password",password)
      reqBody.append("email",email)
      reqBody.append("github",github)
      reqBody.append("linkedin",linkedin)
      preview?reqBody.append("profileImage",profileImage):reqBody.append("profileImage",existingImage)

      const token = sessionStorage.getItem("token")
      if(token){
        const reqHeader = {
          "Content-Type":preview?"multipart/form-data":"application/json",
          "Authorization":`Bearer ${token}`
        }
        // api call
        try{
          const result = await updateUserProfileAPI(reqBody,reqHeader)
          if(result.status==200){
            setOpen(!open)
            sessionStorage.setItem("userDetails",JSON.stringify(result.data))
          }
          else{
            console.log(result);
          }
        }catch(err){
          console.log(err);
        }
      }
    }
  }

  return (
    <>
      <div className="d-flex justify-content-between border rounded p-3">
        <h2>Profile</h2>
        <button onClick={() => setOpen(!open)} className='btn btn-outline-success rounded'><i class="fa-solid fa-angle-down fa-xl"></i></button>
      </div>
      <Collapse in={open}>
        <div id="example-collapse-text" className='row mt-3 justify-content-center  shadow'>
          <label className='text-center'>
            <input style={{display:'none'}} type="file" onChange={e=>setUserData({...userData,profileImage:e.target.files[0]})} />
            {
              existingImage==""?
              <img height={'200px'} width={'200px'} className='rounded-circle' src={preview?preview:profilePic} alt="upload image" />
              :
              <img height={'200px'} width={'200px'} className='rounded-circle' src={preview?preview:`${SERVER_URL}/uploads/${existingImage}`} alt="upload image" />
            }
            
          </label>
          <div className="mt-3 text-center">
            <input value={userData.github} onChange={e=>setUserData({...userData,github:e.target.value})} className='form-control' type="text" placeholder='Enter your Github Link' />
          </div>
          <div className="mt-3 text-center ">
            <input value={userData.linkedin} onChange={e=>setUserData({...userData,linkedin:e.target.value})} className='form-control' type="text" placeholder='Enter your Linkedin Link' />
          </div>
          <div className='mt-3 text-center mb-3'>
            <button onClick={handleProfileUpdate} className='btn btn-success '>Update</button>
          </div>
        </div>
      </Collapse>

      <ToastContainer autoClose={2500} theme='colored' />
    </>
  )
}

export default Profile