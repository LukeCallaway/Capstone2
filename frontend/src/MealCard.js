import React from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import './MealCard.css'

function MealCard({day, mealType, getMealsByDayAndTime}) {
  const meal = getMealsByDayAndTime(day.toLowerCase(), mealType.toLowerCase())[0]

  return (
      <Card className="meal-card">
        <CardBody>
          <CardTitle >
            <h1 className="meal-card-title">{mealType}</h1>
          </CardTitle>
          <CardText >
          <p>Meal Name : {meal? meal.name : ''}</p>
          <p>Total Calories : {meal ? meal.calories : 0}</p>
          <p>Total Protein : {meal ? meal.protein : 0}</p>
          <p>Total Carbs : {meal ? meal.carbs : 0}</p>
          <p>Total Fats : {meal ? meal.fats : 0}</p>

          <button >
            Edit
          </button>
          <button>
            Clear
          </button>
          </CardText>
        </CardBody>
      </Card>
  );
}

export default MealCard;