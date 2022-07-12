export const loginStart=()=>{
    return{
        type:"LOGIN_START"
    }
}
export const loginSuccess=(user)=>{
    return {
        type:"LOGIN_SUCCESS",
        payload: user
    }
}
export const loginEnd=()=>{
    return{
        type:"LOGIN_END"
    }
}

export const logOut=()=>{
    return{
        type:"LOG_OUT"
    }
}