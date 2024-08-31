import React, {useState, useContext} from 'react'
import {Navigate} from 'react-router-dom'
import { useFormik } from 'formik';
import UserContext from "./UserContext";

const Signup = ({ doSignUp }) => {

    const validate = (values) => {
    const errors = {};
    if(!values.username) errors.username = 'Required'
    if(!values.password) errors.password = 'Required'
    if(!values.email) errors.email = 'Required'

    if(values.calories < 1200) errors.calories = 'Minimum 1200g Calories'
    if(values.calories > 4000) errors.calories = 'Maximum 4000g Calories'
    
    if(values.carbs < 15) errors.carbs = 'Minimum 15g Carbs'
    if(values.carbs > 400) errors.carbs = 'Maximum 400g Carbs'

    if(values.protein < 120) errors.protein = 'Minimum 120g Protein'
    if(values.protein > 700) errors.protein = 'Maximum 700g Protein'

    if(values.fats < 20) errors.fats = 'Minimum 20g Fats'
    if(values.fats > 180) errors.fats = 'Maximum 180g Fats'

    return errors;
  }

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      email: '',
      calories: '',
      carbs: '',
      protein: '',
      fats: ''
    },
    validate,
    onSubmit: values => {
      doSignUp({...values})
    }
  })

  const currUser = useContext(UserContext)
  if(currUser.username !== undefined) return <Navigate to='/' />

  return (
    <>
    <section>
    <h1 className="home-brand"><b>Capstone 2</b></h1>
    <p className="home-desc">A place to plan meals on a weekly basis to improve health</p>
  </section>
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="username" className='form-labels'>Username</label>
      <br></br>
      <input
        className='form-input'
        id="username"
        type="text"
        name="username"
        value={formik.values.username}
        onChange={formik.handleChange}
      />
      <br></br>
      {formik.errors.username ? <div className='errors'>{formik.errors.username}</div> : null}

      <label htmlFor="password" className='form-labels'>Password</label>
      <br></br>
      <input
        className='form-input'
        id="password"
        type="password"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
      />
      <br></br>
      {formik.errors.password ? <div className='errors'>{formik.errors.password}</div> : null}

      <label htmlFor="email" className='form-labels'>Email</label>
      <br></br>
      <input
        className='form-input'
        id="email"
        type="text"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
      />
      <br></br>
      {formik.errors.email ? <div className='errors'>{formik.errors.email}</div> : null}

      <label htmlFor="calories" className='form-labels'>Calorie Target</label>
      <br></br>
      <input
        className='form-input'
        id="calories"
        type="text"
        name="calories"
        value={formik.values.calories}
        onChange={formik.handleChange}
      />
      <br></br>
      {formik.errors.calories ? <div className='errors'>{formik.errors.calories}</div> : null}

      <label htmlFor="protein" className='form-labels'>Protein Goal</label>
      <br></br>
      <input
        className='form-input'
        id="protein"
        type="text"
        name="protein"
        value={formik.values.protein}
        onChange={formik.handleChange}
      />
      <br></br>
      {formik.errors.protein ? <div className='errors'>{formik.errors.protein}</div> : null}

      <label htmlFor="carbs" className='form-labels'>Carbs Goal</label>
      <br></br>
      <input
        className='form-input'
        id="carbs"
        type="text"
        name="carbs"
        value={formik.values.carbs}
        onChange={formik.handleChange}
      />
      <br></br>
      {formik.errors.carbs ? <div className='errors'>{formik.errors.carbs}</div> : null}

      <label htmlFor="fats" className='form-labels'>Fats Goal</label>
      <br></br>
      <input
        className='form-input'
        id="fats"
        type="text"
        name="fats"
        value={formik.values.fats}
        onChange={formik.handleChange}
      />
      <br></br>
      {formik.errors.fats ? <div className='errors'>{formik.errors.fats}</div> : null}

      <button type='submit' className='form-btn'>Sign Up</button>
    </form>
    </>
  )

}

export default Signup;