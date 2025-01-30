// import logo from './logo.svg';
import './App.css';
import React, {useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import 'bootstrap/dist/css/bootstrap.min.css';

import NavigationBar from './NavigationBar';
import Homepage from './Homepage'

import Login from './Login';
import Signup from './Signup';
import Search from './Search';
import NotFound from './NotFound';
import AddMealForm from './AddMealForm';
import SpoonacularApi from './apis/Spoonacular';
import UserApi from './apis/UserApi';
import useLocalStorageState from './hooks/useLocalStorage';

import UserContext from './UserContext';

function App() {
  const [token, setToken] = useLocalStorageState('token', '');
  const [currUser, setCurrUser] = useLocalStorageState('currUser', []);
  const [meals, setMeals] = useLocalStorageState('meals', currUser.meals);
  const [search, setSearch] = useLocalStorageState('meal', []);
  
  useEffect(() => {
    const setUserData = async () => {
      await UserApi.setToken(token);
      if(token !== ''){
        const decoded = jwtDecode(token);
        const user = await getUserInfo(decoded.username);
        setCurrUser(user);
        setMeals(user.meals);        
      }
    }
    setUserData();
  }, [token, setCurrUser, setMeals])

  const getUserInfo = async (username) => {
    const userInfo = await UserApi.getUserInfo(username);
    return userInfo.user;
  }

  const doLogin = async (data) => {
    try{
      const res = await UserApi.login(data);
      const decoded = jwtDecode(res.token);
      await UserApi.setToken(res.token);
      setToken(res.token);
  
      const user = await getUserInfo(decoded.username);
  
      setCurrUser(user);
      setMeals(user.meals)
    } catch(e){
      alert('Invalid Username or Password')
    }
  }

  const doSignUp = async (data) => {
    try{
      const res = await UserApi.register({...data});
      await UserApi.setToken(res.token);
      setCurrUser({username: data.username, 
                   email: data.email,
                   calories: data.calories,
                   protein: data.protein,
                   carbs: data.carbs,
                   fats: data.fats
                  });
      setToken(res.token);
      setMeals([]);
    } catch(e){
      alert('Username Taken');
    }
  }

  const doLogout = () => {
    setCurrUser([]);
    setToken('');
  }

  // add meal to database and local state
  const addUserMeal = async (data) => {
    await UserApi.addUserMeal(currUser.username, data);
    const getMeals = await UserApi.getUserInfo(currUser.username)
    setMeals(getMeals.user.meals)
  }

  const deleteUserMeal = async (id) => {
    await UserApi.deleteUserMeal(currUser.username, id)
    setMeals(meals.filter(m => m.id !== id))
  }

  const deleteAllUserMeals = async () => {
    await currUser.meals.map(m => UserApi.deleteUserMeal(currUser.username, m.id))
    setMeals([]);
  }

  const getMealsByDayAndTime = (day, time) => {
    const res = meals.filter(m => m.day === day && m.time === time);
    return res;
  }

  // fetching data from spoonacular api
  const fetchDataWithName = async (query, data, removedKey) => {
    const res = await SpoonacularApi.getMealsBySearch(query, data, removedKey);
    setSearch(res.data.results)
  }

  // fetching data from spoonacular api
  const fetchDataByNutrients = async (data, removedKey) => {
    const res = await SpoonacularApi.getMealsByNutrients(data, removedKey);
    setSearch(res.data);
  }

  // arr values become obj values
  const addToObj = (obj, arr) => {
    for(let i of arr){
      obj.calories += Number(i.calories);
      obj.protein += Number(i.protein);
      obj.carbs += Number(i.carbs);
      obj.fats += Number(i.fats);

    }
    return obj;
  }

  // return obj with total nutrients by day 
  // example Sundays breakfast + lunch + dinner nutrients
  const addTotalNutrients = (day) => {
    let nutrients = {'calories': 0, 'protein': 0, 'carbs': 0, 'fats': 0};
    const res = meals.filter(m => m.day === day);

    addToObj(nutrients, res);
    return nutrients;
  }

  return (
    <>
    <UserContext.Provider value={currUser}>
    <NavigationBar  doLogout={doLogout}/> 

    <Routes>
      <Route path='/' element={<Homepage deleteUserMeal={deleteUserMeal} deleteAllUserMeals={deleteAllUserMeals} addTotalNutrients={addTotalNutrients} getMealsByDayAndTime={getMealsByDayAndTime} meals={meals}/>} />
      <Route path='/login' element={<Login  doLogin={doLogin}/>} />
      <Route path='/signup' element={<Signup doSignUp={doSignUp}/>} />
      <Route path='/search' element={<Search addUserMeal={addUserMeal} fetchDataWithName={fetchDataWithName} fetchDataByNutrients={fetchDataByNutrients} search={search}/>} />
      <Route path='/add-meal' element={<AddMealForm addUserMeal={addUserMeal}/>} />

      <Route path='*' element={<NotFound />} />
    </Routes>
    </UserContext.Provider>
    </> 
  );
}

export default App;
