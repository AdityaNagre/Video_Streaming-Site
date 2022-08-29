export const AuthReducer= (state, action)=>{
    switch(action.type){
        case "LOGIN_START":
            return{
                userN: null,
                isFetching: true,
                error:false
            }
        case "LOGIN_SUCCESS":
            return{
                userN: action.payload,
                isFetching: false,
                error:false
            }
        case "LOGIN_FAIL":
            return{
                userN: null,
                isFetching: false,
                error:true
            }
        case "LOG_OUT":
            return{
                userN: null,
                isFetching: false,
                error:false
            }
        default :
            return {...state}
    }
}