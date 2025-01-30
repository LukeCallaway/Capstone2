import React, {useContext} from 'react';
import UserContext from "./UserContext";
import { Navigate, useNavigate} from "react-router-dom";
import { useFormik } from 'formik';
function AddMealFromSearchForm({addUserMeal, title, carbs, fats, protein, calories}) {
  const currUser = useContext(UserContext);
  const navigate = useNavigate()

  const validate = (values) => {
    const errors = {};
    if(!values.day) errors.day = 'Required' 
    if(!values.time) errors.time = 'Required' 
    return errors;
  }

  const formik = useFormik({
    initialValues: {
      day: '',
      time: ''
    },
    validate,
    onSubmit: (values) => {
      addUserMeal({name: title, 
                   carbs: Math.round(carbs), 
                   fats: Math.round(fats), 
                   protein: Math.round(protein), 
                   calories: Math.round(calories), 
                   ...values, 
                   userId: currUser.id})
      navigate('/')
    }
  })

  if(currUser === undefined || currUser.username === undefined) return <Navigate to='/login' />

  return (
    <>
 
      <form onSubmit={formik.handleSubmit} className='form'>

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

export default AddMealFromSearchForm;