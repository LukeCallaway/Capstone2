import React, {useState, useEffect, useContext} from 'react';
import UserContext from "./UserContext";

function SearchResultCard({id, img, title, calories, carbs, protein, fats}) {




  return (
    <>
        <h2>{title}</h2>
        <img src={img} alt='food image'></img>
        <p>calories: {calories}</p>
        <p>carbs: {carbs}</p>
        <p>protein: {protein}</p>
        <p>fats: {fats}</p>

    </>
  );
}

export default SearchResultCard;