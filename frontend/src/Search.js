import React, {useState, useEffect, useContext} from 'react';
import UserContext from "./UserContext";
import { Navigate } from "react-router-dom";
import SearchResultCard from './SearchResultCard';
import { useFormik } from 'formik';

function Search({fetchDataWithName, fetchDataByNutrients, search}) {
  const currUser = useContext(UserContext);

  const validate = (values) => {
    const errors = {};
    // if all fields are empty
    if(!values.mealName && 
       !values.minCarbs && 
       !values.maxCarbs && 
       !values.minProtein && 
       !values.maxProtein && 
       !values.minFat && 
       !values.maxFat) errors.form = "At least one field required"
    return errors;
  }
  const formik = useFormik({
    initialValues: {
      mealName: '',
      minCarbs: '',
      maxCarbs: '',
      minProtein: '',
      maxProtein: '',
      minFat: '',
      maxFat: ''
    },
    validate,
    onSubmit: (values) => {
      if(values.mealName === ''){
        fetchDataByNutrients({...values}, 'mealName');
      } else{
        fetchDataWithName(values.mealName, {...values},  'mealName');     
      }  
    }
  })

  if(currUser.username === undefined) return <Navigate to='/login' />

  return (
    <>
 
      <form onSubmit={formik.handleSubmit} className='form'>
      {formik.errors.form ? <div className='errors'>{formik.errors.form}</div> : null}

        <label htmlFor="mealName" className='form-labels'>Search By Meal Name</label>
        <br></br>
        <input
          className='form-input'
          id="mmealName"
          type="text"
          name="mealName"
          value={formik.values.mealName}
          onChange={formik.handleChange}
        />
        <br></br>
        <label htmlFor="minCarbs" className='form-labels'>Min Carbs</label>
        <br></br>
        <input
          className='form-input'
          id="minCarbs"
          type="text"
          name="minCarbs"
          value={formik.values.minCarbs}
          onChange={formik.handleChange}
        />
        <br></br>
        <label htmlFor="maxCarbs" className='form-labels'>Max Carbs</label>
        <br></br>
        <input
          className='form-input'
          id="maxCarbs"
          type="text"
          name="maxCarbs"
          value={formik.values.maxCarbs}
          onChange={formik.handleChange}
        />
        <br></br>
        <label htmlFor="minProtein" className='form-labels'>Min Protein</label>
        <br></br>
        <input
          className='form-input'
          id="minProtein"
          type="text"
          name="minProtein"
          value={formik.values.minProtein}
          onChange={formik.handleChange}
        />
        <br></br>
        <label htmlFor="maxProtein" className='form-labels'>Max Protein</label>
        <br></br>
        <input
          className='form-input'
          id="maxProtein"
          type="text"
          name="maxProtein"
          value={formik.values.maxProtein}
          onChange={formik.handleChange}
        />
        <br></br>
        <label htmlFor="minFat" className='form-labels'>Min Fat</label>
        <br></br>
        <input
          className='form-input'
          id="minFat"
          type="text"
          name="minFat"
          value={formik.values.minFat}
          onChange={formik.handleChange}
        />
        <br></br>
        <label htmlFor="maxFat" className='form-labels'>Max Fat</label>
        <br></br>
        <input
          className='form-input'
          id="maxFat"
          type="text"
          name="maxFat"
          value={formik.values.maxFat}
          onChange={formik.handleChange}
        />
        <br></br>
        <button type='submit' className='form-btn'>Search</button>
      </form>
      <div>
        {search ?
         search.map(m =>  <SearchResultCard 
          id={m.id} img={m.image} title={m.title} 
          carbs={m.carbs ? m.carbs : m.nutrition.nutrients[3].amount} 
          protein={m.protein ? m.protein : m.nutrition.nutrients[10].amount} 
          fats={m.fat ? m.fat : m.nutrition.nutrients[1].amount} 
          calories={m.calories ? m.calories : m.nutrition.nutrients[0].amount}/>)
          : 'No Results Found'
        }
      </div>
      </>
  );       
}

export default Search;