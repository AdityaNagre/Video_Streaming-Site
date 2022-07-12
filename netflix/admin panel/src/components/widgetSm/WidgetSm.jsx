import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import axios from "axios";
import { useState, useEffect } from "react";


export default function WidgetSm() {
  const [newUsers, setnewUsers] = useState([])

  const getNewUsers=async ()=>{
    try {
      const res= await axios.get("/users?new=true", {
        headers:{
          token:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYzQ3OWZiMGExOTU0ZjhhYjRkYzVjZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NzU3NjUwMn0.K7ezpAfoPKNYcBFZBSuE3ULinAC02XUtvQ6B2ut2hgY"
        }
      });
      setnewUsers(res.data)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getNewUsers();
  }, [])
  
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {newUsers.map((e)=> {
          return  <li className="widgetSmListItem">
            <img
              src={e.profilePic?e.profilePic:"https://www.nakedtruth.in/wp-content/uploads/2021/11/Netflix-as-a...video-game-publisher.jpg"}
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{e.username}</span>
              <span className="widgetSmUserTitle">{e.email}</span>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </li>
        })}
        
      </ul>
    </div>
  );
}
