import React, {useState, useEffect} from "react";
import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import "./home.scss";
import List from "../../components/list/List";
import axios from "axios";

const Home = (props) => {
  const [lists, setlists] = useState([])
  const [genre, setgenre] = useState(null)

  const fetchList= async ()=>{
    try {
      const res= await axios.get(`list${props.type ? "?type=" + props.type :""}${genre?"&genre=" + genre:""}`);
      // const res= await axios.get(`list${props.type ? "?type=" + props.type :""}${genre?"&genre=" + genre:""}`,{header:{token:xyz }  });
      setlists(res.data)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(()=>{
    fetchList();
  },[props.type, genre])

  return (
    <div className="home">
      <Navbar />
      <Featured type={props.type}/>
      {lists.map((list, index)=>{
        return  <List key={index} list={list}/>
      })}
    </div>
  );
};

export default Home;
