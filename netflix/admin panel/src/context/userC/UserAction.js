export const getUsersStart=()=>{
    return{
        type:"GET_USERS_START"
    }
}
export const getUsersSuccess=(users)=>{
    return{
        type:"GET_USERS_SUCCESS",
        payload:users
    }
}
export const getUsersFailure=()=>{
    return{
        type:"GET_USERS_FAILURE"
    }
}
export const deleteUserStart=()=>{
    return{
        type:"DELETE_USER_START"
    }
}
export const deleteUserSuccess=(id)=>{
    return{
        type:"DELETE_USER_SUCCESS",
        payload:id
    }
}
export const deleteUserFailure=()=>{
    return{
        type:"DELETE_USER_FAILURE"
    }
}
export const createUserStart=()=>{
    return{
        type:"CREATE_USER_START"
    }
}
export const createUserSuccess=(user)=>{
    return{
        type:"CREATE_USER_SUCCESS",
        payload:user
    }
}
export const createUserFailure=()=>{
    return{
        type:"CREATE_USER_FAILURE"
    }
}