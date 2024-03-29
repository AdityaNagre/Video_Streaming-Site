const authReducer=(state, action)=>{
    switch(action.type){
        case "LOGIN_START":
            return{
                user:null,
                isFetching: true,
                error:false
            };
        case "LOGIN_SUCCESS":
            return{
                user:action.payload,
                isFetching: false,
                error:false
            };
        case "LOGIN_END":
            return{
                user:null,
                isFetching: false,
                error:true
            };
        case "LOGIN_OUT":
            return{
                user:null,
                isFetching: false,
                error:false
            };
        default :
            return {...state};
    }
}

export default authReducer