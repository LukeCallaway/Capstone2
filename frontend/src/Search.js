import React, {useState, useEffect, useContext} from 'react';
import UserContext from "./UserContext";
import { Navigate } from "react-router-dom";
import SearchResultCard from './SearchResultCard';

function Search({fetchDataWithName, fetchDataByNutrients, search}) {
  const currUser = useContext(UserContext)
  const INITIAL_STATE = {
    mealName: '',
    minCarbs: '',
    maxCarbs: '',
    minProtein: '',
    maxProtein: '',
    minFat: '',
    maxFat: ''
  };
  
  const [formData, setFormData] = useState(INITIAL_STATE);

  if(!currUser.username) return <Navigate to='/login' />

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData.mealName === '') fetchDataByNutrients(formData, 'mealName')
    else fetchDataWithName(formData.mealName, formData, 'mealName');
    setFormData(INITIAL_STATE);
  }

  return (
    <>
 
      <form onSubmit={handleSubmit} className='form'>
        <label htmlFor="mealName" className='form-labels'>Search By Meal Name</label>
        <br></br>
        <input
          className='form-input'
          id="mmealName"
          type="text"
          name="mealName"
          value={formData.mealName}
          onChange={handleChange}
        />
        <br></br>
        <label htmlFor="minCarbs" className='form-labels'>Min Carbs</label>
        <br></br>
        <input
          className='form-input'
          id="minCarbs"
          type="text"
          name="minCarbs"
          value={formData.minCarbs}
          onChange={handleChange}
        />
        <br></br>
        <label htmlFor="maxCarbs" className='form-labels'>Max Carbs</label>
        <br></br>
        <input
          className='form-input'
          id="maxCarbs"
          type="text"
          name="maxCarbs"
          value={formData.maxCarbs}
          onChange={handleChange}
        />
        <br></br>
        <label htmlFor="minProtein" className='form-labels'>Min Protein</label>
        <br></br>
        <input
          className='form-input'
          id="minProtein"
          type="text"
          name="minProtein"
          value={formData.minProtein}
          onChange={handleChange}
        />
        <br></br>
        <label htmlFor="maxProtein" className='form-labels'>Max Protein</label>
        <br></br>
        <input
          className='form-input'
          id="maxProtein"
          type="text"
          name="maxProtein"
          value={formData.maxProtein}
          onChange={handleChange}
        />
        <br></br>
        <label htmlFor="minFat" className='form-labels'>Min Fat</label>
        <br></br>
        <input
          className='form-input'
          id="minFat"
          type="text"
          name="minFat"
          value={formData.minFat}
          onChange={handleChange}
        />
        <br></br>
        <label htmlFor="maxFat" className='form-labels'>Max Fat</label>
        <br></br>
        <input
          className='form-input'
          id="maxFat"
          type="text"
          name="maxFat"
          value={formData.maxFat}
          onChange={handleChange}
        />
        <br></br>
        <button className='form-btn'>Search</button>
      </form>
      <div>
        {search ?
         search.map(m =>  <SearchResultCard id={m.id} img={m.image} title={m.title}/>)
          : 'No Results Found'
        }
      </div>
      </>
  );       }

export default Search;