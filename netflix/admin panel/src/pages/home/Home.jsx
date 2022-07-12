import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useState } from "react";
import axios from "axios";
import { useMemo } from "react";


export default function Home() {
  const months=useMemo(()=>['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],[])
  const [userStats, setuserStats] = useState([])

  const fetchuserStats= async()=>{
    try {
      const fetchedData=await axios.get("users/stats",{
        headers:{
          token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYzQ3OWZiMGExOTU0ZjhhYjRkYzVjZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NzU3NjUwMn0.K7ezpAfoPKNYcBFZBSuE3ULinAC02XUtvQ6B2ut2hgY"
        }
      });
      const sortFData=fetchedData.data.sort((a,b)=>{return a._id-b._id})
      sortFData.map((e)=>{
        return setuserStats((prev)=>[...prev,
          {name:months[e._id-1],"New User": e.total}])
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(()=>{
    fetchuserStats();
  },[months])
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics" grid dataKey="New User"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}
