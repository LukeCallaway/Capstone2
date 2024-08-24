import React from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import MealCard from './MealCard'
import './DayCard.css'

function DayCard({ day, getMealsByDayAndTime}) {
  
  return (
      <Card className="day-card">
        <CardBody>
          <CardTitle className="day-card-title">
            <h1>{day}</h1>
          </CardTitle>

          <CardText >
            <h2></h2>
            <MealCard day={day} mealType={'Breakfast'} getMealsByDayAndTime={getMealsByDayAndTime}/>
            <MealCard day={day} mealType={'Lunch'} getMealsByDayAndTime={getMealsByDayAndTime}/>
            <MealCard day={day} mealType={'Dinner'} getMealsByDayAndTime={getMealsByDayAndTime}/>
            <p>
              Total Calories: 0 Total Protein: 0 Total Carbs: 0 Total Fats: 0 
            </p>
          </CardText>
        </CardBody>
      </Card>
  );
}

export default DayCard;