import React, {useState, useEffect, useContext} from 'react';
import UserContext from "./UserContext";
import { Navigate, useNavigate } from "react-router-dom";
import { Field, useFormik } from 'formik';
function AddMealForm({addUserMeal, addMeal}) {
  const currUser = useContext(UserContext);
  const navigate = useNavigate();

  const validate = (values) => {
    const errors = {};
    if(!values.day) errors.day = 'Required' 
    if(!values.time) errors.time = 'Required' 
    return errors;
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      carbs: '',
      protein: '',
      fats: '',
      calories: '',
      day: '',
      time: ''
    },
    validate,
    onSubmit: (values) => {
      addUserMeal({...values, userId: currUser.id})
      addMeal({...values})
      navigate('/')
    }
  })

  if(currUser.username === undefined) return <Navigate to='/login' />

  return (
    <>
 
      <form onSubmit={formik.handleSubmit} className='form'>
        <label htmlFor="name" className='form-labels'>Meal Name</label>
        <br></br>
        <input
          required
          className='form-input'
          id="name"
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        <br></br>

        <label htmlFor="calories" className='form-labels'>Total Calories</label>
        <br></br>
        <input
          required
          className='form-input'
          id="calories"
          type="text"
          name="calories"
          value={formik.values.calories}
          onChange={formik.handleChange}
        />
        <br></br>

        <label htmlFor="carbs" className='form-labels'>Total Carbs</label>
        <br></br>
        <input
          required
          className='form-input'
          id="carbs"
          type="text"
          name="carbs"
          value={formik.values.carbs}
          onChange={formik.handleChange}
        />
        <br></br>

        <label htmlFor="protein" className='form-labels'>Total Protein</label>
        <br></br>
        <input
          required
          className='form-input'
          id="protein"
          type="text"
          name="protein"
          value={formik.values.protein}
          onChange={formik.handleChange}
        />
        <br></br>

        <label htmlFor="fats" className='form-labels'>Total fats</label>
        <br></br>
        <input
          required  
          className='form-input'
          id="fats"
          type="text"
          name="fats"
          value={formik.values.fats}
          onChange={formik.handleChange}
        />
        <br></br>

    <div className='meal-form-radio'>
      <div>
    <label>
      Breakfast
      <input type='radio' name='time' value='breakfast' onChange={formik.handleChange}/>
    </label>
    </div>
    <div>
    <label>
      Lunch
      <input type='radio' name='time' value='lunch' onChange={formik.handleChange}/>
    </label>
    </div>
    <div>
    <label>
      Dinner
      <input type='radio' name='time' value='dinner' onChange={formik.handleChange}/>
    </label>
    </div>
    </div>
    {formik.errors.time ? <div className='errors'>{formik.errors.time}</div> : null}

    <label htmlFor="day">Select Day</label>
    <select onChange={formik.handleChange} id="day" name="day" >
        <option value="" label='Choose An Option'>Choose An Option</option>
        <option value="sunday" label='sunday'>Sunday</option>
        <option value="monday" label='monday'>Monday</option>
        <option value="tuesday" label='tuesday'>Tuesday</option>
        <option value="wednesday" label='wednesday'>Wednesday</option>
        <option value="thursday" label='thursday'>Thursday</option>
        <option value="friday" label='friday'>Friday</option>
        <option value="saturday" label='saturday'>Saturday</option>
    </select>
    {formik.errors.day ? <div className='errors'>{formik.errors.day}</div> : null}

        <button type='submit' className='form-btn' >Add</button>
    </form>

      </>
  );       
}

export default AddMealForm;