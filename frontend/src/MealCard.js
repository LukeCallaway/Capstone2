import React from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import './MealCard.css'
import { useNavigate } from "react-router-dom";

function MealCard({day, mealType, getMealsByDayAndTime, deleteUserMeal}) {
  // grabs user meals that correlate to a day [sunday, monday, tuesday, etc] and time [breakfast, lunch, dinner] 
  const meal = day ? getMealsByDayAndTime(day.toLowerCase(), mealType.toLowerCase())[0] : null;
  const navigate = useNavigate();

  return (
      <Card className="meal-card">
        <CardBody>
          <CardTitle >
            <h1 className="meal-card-title">{mealType}</h1>
          </CardTitle>
          <CardText >
          <p>Meal Name : {meal ? meal.name : ''}</p>
          <p>Total Calories : {meal ? meal.calories : 0}</p>
          <p>Total Protein : {meal ? meal.protein : 0}</p>
          <p>Total Carbs : {meal ? meal.carbs : 0}</p>
          <p>Total Fats : {meal ? meal.fats : 0}</p>

          {meal ?           
          <button onClick={() => deleteUserMeal(meal.id)}>
            Clear
          </button> : 
          <button onClick={() => navigate('/add-meal')}>
          Add
        </button>}

          </CardText>
        </CardBody>
      </Card>
  );
}

export default MealCard;