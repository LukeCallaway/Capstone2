import React, {useContext} from "react";
// import './HomePage.css'
import UserContext from "./UserContext";
import { Navigate } from "react-router-dom";
import DayCard from './DayCard'

function Homepage({ getMealsByDayAndTime }) {
  const currUser = useContext(UserContext)
  if(!currUser.username) return <Navigate to='/login' />

  return (
    <> 
        <DayCard day={'Sunday'} getMealsByDayAndTime={getMealsByDayAndTime} />
        <DayCard day={'Monday'} getMealsByDayAndTime={getMealsByDayAndTime}/>
        <DayCard day={'Tuesday'} getMealsByDayAndTime={getMealsByDayAndTime}/>
        <DayCard day={'Wednesday'} getMealsByDayAndTime={getMealsByDayAndTime}/>
        <DayCard day={'Thursday'} getMealsByDayAndTime={getMealsByDayAndTime}/>
        <DayCard day={'Friday'} getMealsByDayAndTime={getMealsByDayAndTime}/>
        <DayCard day={'Saturday'} getMealsByDayAndTime={getMealsByDayAndTime}/>
        
    </>
  );
}

export default Homepage;