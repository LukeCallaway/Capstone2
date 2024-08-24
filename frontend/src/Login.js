import React, {useState, useContext} from 'react'
import { Navigate} from 'react-router-dom'

import UserContext from "./UserContext";

// import './Login.css'

function Login ({ doLogin }) {


  const INITIAL_STATE = {
    username: '',
    password: ''
  }
  const [formData, setFormData] = useState(INITIAL_STATE);
  
  const currUser = useContext(UserContext)
  if(currUser.username) return <Navigate to='/' />

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    doLogin(formData);

  }

  return (
    <>
  <section>
    <h1 className="home-brand"><b>Capstone 2</b></h1>
    <p className="home-desc">Welcome Back!</p>
  </section>

    <form onSubmit={handleSubmit} className='form'>
      <label htmlFor="username" className='form-labels'>Username</label>
      <br></br>
      <input
        className='form-input'
        id="username"
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
      />
      <br></br>
      <label htmlFor="password" className='form-labels'>Password</label>
      <br></br>
      <input
        className='form-input'
        id="password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <br></br>
      <button className='form-btn'>Log In</button>
    </form>
    </>
  )
}

export default Login;