export const loginStart= ()=>{
    return {
        type: "LOGIN_START"
    }
}

export const loginSuccess=(userN)=>{
    return {
        type: "LOGIN_SUCCESS",
        payload: userN
    }
}

export const loginFail=()=>{
    return {
        type: "LOGIN_FAIL"
    }
}

export const logOut=()=>{
    return {
        type: "LOG_OUT"
    }
}