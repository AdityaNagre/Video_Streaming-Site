import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import { useState, useEffect } from "react";
import "./featured.scss";
import axios from 'axios'

export default function Featured({ type }) {
  const [latest, setlatest] = useState({})


  const fetchLatest= async()=>{
    try {
      const movies=await axios.get(`/movies/random?type=${type}`)
      setlatest(movies.data[0])
      console.log(movies.data[0])
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    fetchLatest();
  }, [type])
  

  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movie" ? "Movies" : "Series"}</span>
          <select name="genre" id="genre">
            <option>Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}
      <img
        src={latest.img}
        alt=""
      />
      <div className="info">
        <img
          src={latest.imgTitle}
          alt=""
        />
        <span className="desc">
          {latest.desc}
        </span>
        <div className="buttons">
          <button className="play">
            <PlayArrow />
            <span>Play</span>
          </button>
          <button className="more">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
}
