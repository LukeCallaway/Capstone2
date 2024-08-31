import React, {useState, useContext} from 'react'
import { Navigate} from 'react-router-dom'
import { useFormik } from 'formik';
import UserContext from "./UserContext";

// import './Login.css'

function Login ({ doLogin }) {
  const validate = (values) => {
    const errors = {};
    if(!values.username) errors.username = 'Required'
    if(!values.password) errors.password = 'Required'
    return errors;
  }

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validate,
    onSubmit: (values) => {
      doLogin({...values})
    }
  })

  const currUser = useContext(UserContext)
  if(currUser.username !== undefined) return <Navigate to='/' />


  return (
    <>
  <section>
    <h1 className="home-brand"><b>Capstone 2</b></h1>
    <p className="home-desc">Welcome Back!</p>
  </section>

    <form onSubmit={formik.handleSubmit} className='form'>
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
      {formik.errors.username ? <div className='errors'>{formik.errors.username}</div> : null}
      <br></br>
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
      {formik.errors.password ? <div className='errors'>{formik.errors.password}</div> : null}
      <br></br>
      <button type='submit' className='form-btn'>Log In</button>
    </form>
    </>
  )
}

export default Login;