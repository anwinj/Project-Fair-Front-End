import { commonAPI } from "./commonAPI"
import {SERVER_URL} from './serverUrl'

//register API 
export const registerAPI = async (user)=>{
    return await commonAPI("POST",`${SERVER_URL}/register`,user,"")
}

// login API
export const loginAPI = async (user)=>{
    return await commonAPI("POST",`${SERVER_URL}/login`,user,"")
}

// addProject API
export const addProjectAPI = async (reqBody,reqHeader) =>{
    return await commonAPI("POST",`${SERVER_URL}/add-project`,reqBody,reqHeader)
}

// homeprojectAPI
export const getHomeProjectAPI = async()=>{
    return await commonAPI("GET",`${SERVER_URL}/home-projects`,"","")
}

// allprojectAPI
export const getAllProjectAPI = async(searchKey,reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/all-projects?search=${searchKey}`,"",reqHeader)
}

// userprojectAPI
export const getUserProjectAPI = async(reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/user-projects`,"",reqHeader)
}

// deleteprojectAPI
export const deleteProjectAPI = async(id,reqHeader)=>{
    return await commonAPI("DELETE",`${SERVER_URL}/project/delete/${id}`,{},reqHeader)
}

// editprojectAPI
export const editProjectAPI = async (id,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/project/edit/${id}`,reqBody,reqHeader)
}

// updateprofileAPI
export const updateUserProfileAPI = async (reqBody,reqHeader) =>{
    return await commonAPI("PUT",`${SERVER_URL}/user/edit`,reqBody,reqHeader)
}