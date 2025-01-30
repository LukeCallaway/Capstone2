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
    
    if(values.carbs < 120) errors.carbs = 'Minimum 120g Carbs'
    if(values.carbs > 700) errors.carbs = 'Maximum 700g Carbs'

    if(values.protein < 15) errors.protein = 'Minimum 15g Protein'
    if(values.protein > 400) errors.protein = 'Maximum 400g Protein'

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
  if(!currUser || currUser.username !== undefined) return <Navigate to='/' />

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
      {formik.values.username !== '' && formik.errors.username ? <div className='errors'>{formik.errors.username}</div> : null}

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
      {formik.values.password !== '' &&  formik.errors.password ? <div className='errors'>{formik.errors.password}</div> : null}

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
      {formik.values.email !== '' && formik.errors.email ? <div className='errors'>{formik.errors.email}</div> : null}

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
      {formik.values.calories !== '' && formik.errors.calories ? <div className='errors'>{formik.errors.calories}</div> : null}

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
      {formik.values.protein !== '' && formik.errors.protein ? <div className='errors'>{formik.errors.protein}</div> : null}

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
      {formik.values.carbs !== '' && formik.errors.carbs ? <div className='errors'>{formik.errors.carbs}</div> : null}

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
      {formik.values.fats !== '' && formik.errors.fats ? <div className='errors'>{formik.errors.fats}</div> : null}

      <button type='submit' className='form-btn'>Sign Up</button>
    </form>
    </>
  )

}

export default Signup;