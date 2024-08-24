import React, {useState, useContext} from 'react'
import {Navigate} from 'react-router-dom'

import UserContext from "./UserContext";


const Signup = ({ doSignUp }) => {
  const INITIAL_STATE = {
    username: '',
    password: '',
    email: '',
    calories: '',
    protein: '',
    carbs: '',
    fats: ''
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
    doSignUp(formData);
  }

  return (
    <>
    <section>
    <h1 className="home-brand"><b>Capstone 2</b></h1>
    <p className="home-desc">A place to plan meals on a weekly basis to improve health</p>
  </section>
    <form onSubmit={handleSubmit}>
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

      <label htmlFor="email" className='form-labels'>Email</label>
      <br></br>
      <input
        className='form-input'
        id="email"
        type="text"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <br></br>

      <label htmlFor="calories" className='form-labels'>Calorie Target</label>
      <br></br>
      <input
        className='form-input'
        id="calories"
        type="text"
        name="calories"
        value={formData.calories}
        onChange={handleChange}
      />
      <br></br>

      <label htmlFor="protein" className='form-labels'>Protein Goal</label>
      <br></br>
      <input
        className='form-input'
        id="protein"
        type="text"
        name="protein"
        value={formData.protein}
        onChange={handleChange}
      />
      <br></br>

      <label htmlFor="carbs" className='form-labels'>Carbs Goal</label>
      <br></br>
      <input
        className='form-input'
        id="carbs"
        type="text"
        name="carbs"
        value={formData.carbs}
        onChange={handleChange}
      />
      <br></br>

      <label htmlFor="fats" className='form-labels'>Fats Goal</label>
      <br></br>
      <input
        className='form-input'
        id="fats"
        type="text"
        name="fats"
        value={formData.fats}
        onChange={handleChange}
      />
      <br></br>

      <button className='form-btn'>Sign Up</button>
    </form>
    </>
  )

}

export default Signup;