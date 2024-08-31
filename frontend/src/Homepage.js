import React, {useContext} from "react";
// import './HomePage.css'
import UserContext from "./UserContext";
import { Navigate } from "react-router-dom";
import DayCard from './DayCard'

function Homepage({ getMealsByDayAndTime, deleteUserMeal, addTotalNutrients }) {
  const currUser = useContext(UserContext)
  if(currUser.username === undefined) return <Navigate to='/login' />

  return (
    <> 
        <DayCard day={'Sunday'} deleteUserMeal={deleteUserMeal} addTotalNutrients={addTotalNutrients} getMealsByDayAndTime={getMealsByDayAndTime} />
        {/* <DayCard day={'Monday'} deleteUserMeal={deleteUserMeal} addTotalNutrients={addTotalNutrients} getMealsByDayAndTime={getMealsByDayAndTime}/>
        <DayCard day={'Tuesday'} deleteUserMeal={deleteUserMeal} addTotalNutrients={addTotalNutrients} getMealsByDayAndTime={getMealsByDayAndTime}/>
        <DayCard day={'Wednesday'} deleteUserMeal={deleteUserMeal} addTotalNutrients={addTotalNutrients} getMealsByDayAndTime={getMealsByDayAndTime}/>
        <DayCard day={'Thursday'} deleteUserMeal={deleteUserMeal} addTotalNutrients={addTotalNutrients} getMealsByDayAndTime={getMealsByDayAndTime}/>
        <DayCard day={'Friday'} deleteUserMeal={deleteUserMeal} addTotalNutrients={addTotalNutrients} getMealsByDayAndTime={getMealsByDayAndTime}/>
        <DayCard day={'Saturday'} deleteUserMeal={deleteUserMeal} addTotalNutrients={addTotalNutrients} getMealsByDayAndTime={getMealsByDayAndTime}/> */}
        
    </>
  );
}

export default Homepage;