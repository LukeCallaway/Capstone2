import React, {useState, useEffect, useContext} from 'react';
import UserContext from "./UserContext";

function SearchResultCard({id, img, title}) {




  return (
    <>
        <h2>{title}</h2>
        <img src={img} alt='food image'></img>
    </>
  );
}

export default SearchResultCard;