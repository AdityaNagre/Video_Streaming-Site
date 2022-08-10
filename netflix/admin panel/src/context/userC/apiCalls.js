import axios from "axios";
import { createUserFailure, createUserStart, createUserSuccess, deleteUserFailure, deleteUserStart, deleteUserSuccess, getUsersFailure, getUsersStart, getUsersSuccess } from "./UserAction";

export const fetchUsers=async(dispatch)=>{
    dispatch(getUsersStart());
    try {
        const res=await axios.get("/users",{
            headers:{
                token:"Bearer "+ JSON.parse(localStorage.getItem("user")).accessToken
            }
        });
        dispatch(getUsersSuccess(res.data))
    } catch (error) {
        dispatch(getUsersFailure())
    }
}

export const deleteUser=async(id,dispatch)=>{
    dispatch(deleteUserStart());
    try {
        await axios.delete(`/users/${id}`,{
            headers:{
                token:"Bearer "+ JSON.parse(localStorage.getItem("user")).accessToken
            }
        });
        dispatch(deleteUserSuccess(id))
    } catch (error) {
        dispatch(deleteUserFailure())
    }
}

export const createUser=async(user,dispatch)=>{
    dispatch(createUserStart());
    try {
        const res=await axios.get("/register/",user,{
            headers:{
                token:"Bearer "+ JSON.parse(localStorage.getItem("user")).accessToken
            }
        });
        dispatch(createUserSuccess(res.data))
    } catch (error) {
        dispatch(createUserFailure())
    }
}

