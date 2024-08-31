import React, {useContext} from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import MealCard from './MealCard'
import './DayCard.css'
import UserContext from "./UserContext";
import Macros from './helpers/Macros'

function DayCard({ day, getMealsByDayAndTime, addTotalNutrients, deleteUserMeal}) {
  const currUser = useContext(UserContext)
  const dayTotals = addTotalNutrients(day.toLowerCase())

  return (
      <Card className="day-card">
        <CardBody>
          <CardTitle className="day-card-title">
            <h1>{day}</h1>
          </CardTitle>

          <CardText >
            <MealCard deleteUserMeal={deleteUserMeal} day={day} mealType={'Breakfast'} getMealsByDayAndTime={getMealsByDayAndTime}/>
            <MealCard deleteUserMeal={deleteUserMeal} day={day} mealType={'Lunch'} getMealsByDayAndTime={getMealsByDayAndTime}/>
            <MealCard deleteUserMeal={deleteUserMeal} day={day} mealType={'Dinner'} getMealsByDayAndTime={getMealsByDayAndTime}/>
            <div className="day-total-nutrients">
              <p className={`day-total-nutrients ${Macros.isEnoughCalories(dayTotals.calories, currUser.calories) ? 'enough' : 'not-enough'} `}>Total Calories: {dayTotals.calories}  </p> 
              <p className={`day-total-nutrients ${Macros.isEnoughProtein(dayTotals.protein, currUser.protein) ? 'enough' : 'not-enough'} `}>Total Protein: {dayTotals.protein} </p>
              <p className={`day-total-nutrients ${Macros.isEnoughCarbs(dayTotals.carbs, currUser.carbs)? 'enough' : 'not-enough'} `}>Total Carbs: {dayTotals.carbs} </p>
              <p className={`day-total-nutrients ${Macros.isEnoughFats(dayTotals.fats, currUser.fats) ? 'enough' : 'not-enough'} `}>Total Fats: {dayTotals.fats} </p>
            </div>
          </CardText>
        </CardBody>
      </Card>
  );
}

export default DayCard;