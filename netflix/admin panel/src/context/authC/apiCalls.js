import axios from "axios";
import { loginEnd, loginStart, loginSuccess } from "./AuthAction";

const login=async(user,dispatch)=>{
    dispatch(loginStart())
    try {
        const res=await axios.post("auth/login", user);
        res.data.isAdmin && dispatch(loginSuccess(res.data))
    } catch (error) {
        dispatch(loginEnd())
    }
}

export {login}