import axios from "axios";
import { loginFail, loginStart, loginSuccess } from "./AuthAction";

export const login=async (user, dispatch)=>{
    try {
        console.log("reached")
        dispatch(loginStart());
        const res= await axios.post('/auth/login', user);
        console.log(res.data);
        dispatch(loginSuccess(res.data))
    } catch (error) {
        dispatch(loginFail())
    }
    
}
