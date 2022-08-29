import React, {useEffect, useReducer, createContext } from "react";
import { AuthReducer } from "./AuthReducer";

const INITIAL_STATE= {
    userN: JSON.parse(localStorage.getItem("userN"))|| null,
    isFetching:false,
    error: false
}

export const AuthContext= createContext(INITIAL_STATE)
export const AuthContextProvider=({children})=>{
    const [state, dispatch]= useReducer(AuthReducer, INITIAL_STATE)

    useEffect(() => {
        try {
            localStorage.setItem("userN",JSON.stringify(state.userN))
        } catch (error) {
            console.log(error.message)
        }
    }, [state.userN])

    return(
        <AuthContext.Provider value={{
            userN:state.userN,
            isFetching:state.isFetching,
            error: state.error,
            dispatch
        }}>
            {children}
        </AuthContext.Provider>
    )
}



