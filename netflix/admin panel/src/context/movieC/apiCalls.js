import axios from "axios";
import { getMoviesStart, getMoviesSuccess, getMoviesFailure, deleteMovieFailure,deleteMovieStart,deleteMovieSuccess,
    createMovieStart,createMovieSuccess,createMovieFailure} from "./MovieAction";

export const fetchMovies=async(dispatch)=>{
    dispatch(getMoviesStart());
    try {
        const res=await axios.get("/movies/",{
            headers:{
                token: "Bearer "+ JSON.parse(localStorage.getItem("user")).accessToken
            }
        });
        dispatch(getMoviesSuccess(res.data))
    } catch (error) {
        dispatch(getMoviesFailure)
    }
}

export const deleteMovie=async(id ,dispatch)=>{
    dispatch(deleteMovieStart());
    try {
        await axios.delete(`/movies/${id}`,{
            headers:{
                token: "Bearer "+ JSON.parse(localStorage.getItem("user")).accessToken
            }
        });
        dispatch(deleteMovieSuccess(id))
    } catch (error) {
        dispatch(deleteMovieFailure())
    }
}

export const createMovie=async(movie ,dispatch)=>{
    dispatch(createMovieStart());
    try {
        const res=await axios.post("/movies/", movie,{
            headers:{
                token: "Bearer "+ JSON.parse(localStorage.getItem("user")).accessToken
            }
        });
        dispatch(createMovieSuccess(res.data))
    } catch (error) {
        console.log(error.message)
        dispatch(createMovieFailure())
    }
}