import React, {useState, useEffect} from "react";
import "./listItem.scss";
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
} from "@material-ui/icons";
import axios from 'axios'
import { Link } from "react-router-dom";

export default function ListItem({ index, movieID }) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setmovie] = useState({})

  const fetchMovies= async()=>{
    try {
      const movieData= await axios.get(`movies/find/${movieID}`)
      setmovie(movieData.data)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    fetchMovies();
  }, [index, movieID])
  

  return (
    <Link to={"/watch"} state={{movie:movie}}>
    <div
      className="listItem"
      style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={movie.img}
        alt=""
      />
      {isHovered && (
        <>
          <video src={movie.trailer} autoPlay={true} loop />
          <div className="itemInfo">
            <div className="icons">
              <PlayArrow className="icon" />
              <Add className="icon" />
              <ThumbUpAltOutlined className="icon" />
              <ThumbDownOutlined className="icon" />
            </div>
            <div className="itemInfoTop">
              <span>movie.data.duration</span>
              <span className="limit">{movie.limit}</span>
              <span>{movie.year}</span>
            </div>
            <div className="desc">
             {movie.desc}
            </div>
            <div className="genre">{movie.genre}</div>
          </div>
        </>
      )}
    </div>
    </Link>
  );
}
