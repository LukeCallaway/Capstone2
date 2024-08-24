// import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import {Navigate, Routes, Route, useNavigate} from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import 'bootstrap/dist/css/bootstrap.min.css';

import NavigationBar from './NavigationBar';
import Homepage from './Homepage'

import Login from './Login';
import Signup from './Signup';
import Search from './Search';
import NotFound from './NotFound';

import SpoonacularApi from './apis/Spoonacular';
import UserApi from './apis/UserApi';
import useLocalStorageState from './hooks/useLocalStorage';

import UserContext from './UserContext';

function App() {
  const [token, setToken] = useLocalStorageState('token', '');
  const [currUser, setCurrUser] = useLocalStorageState('currUser', []);
  const [meals, setMeals] = useLocalStorageState('meals', []);
  const [search, setSearch] = useState([]);
  // const [sundayMeals, setSundayMeals] = useLocalStorageState('sundayMeals', []);
  // const [mondayMeals, setMondayMeals] = useLocalStorageState('mondayMeals', []);
  // const [tuesdayMeals, setTuesdayMeals] = useLocalStorageState('tuesdayMeals', []);
  // const [wednesdayMeals, setWednesdayMeals] = useLocalStorageState('wednesdayMeals', []);
  // const [thursdayMeals, setThursdayMeals] = useLocalStorageState('thursdayMeals', []);
  // const [fridayMeals, setFridayMeals] = useLocalStorageState('fridayMeals', []);
  // const [saturdayMeals, setSaturdayMeals] = useLocalStorageState('saturdayMeals', []);

  const getUserInfo = async (username) => {
    const userInfo = await UserApi.getUserInfo(username);
    return userInfo.user;
  }

  // useEffect(() => {
  //   async function getUserMeals(){
  //     console.log('getting user meals')
  //     // query db for all meals the user has 
  //   }
  // })

  const doLogin = async (data) => {
    const res = await UserApi.login(data);
    const decoded = jwtDecode(res.token);
    await UserApi.setToken(res.token);
    setToken(res.token);

    const user = await getUserInfo(decoded.username);

    setCurrUser(user);
    setMeals(user.meals)
  }

  const doSignUp = async (data) => {
    const res = await UserApi.register({...data});
    setCurrUser({username: data.username, 
                 email: data.email,
                 calories: data.calories,
                 protein: data.protein,
                 carbs: data.carbs,
                 fats: data.fats
                });
    setToken(res);
  }

  const doLogout = () => {
    setCurrUser([]);
    setToken('');
  }

  const fetchDataWithName = async (query, data, removedKey) => {
    const res = await SpoonacularApi.getMealsBySearch(query, data, removedKey);
    setSearch(res.data.results)
  }

  const fetchDataByNutrients = async (data, removedKey) => {
    const res = await SpoonacularApi.getMealsByNutrients(data, removedKey);
    setSearch(res.data);
  }

  const getMealsByDayAndTime = (day, time) => {
    const res = meals.filter(m => m.day === day && m.time === time);
    return res;
  }

  const addTotalNutrients = (day, nutrient) => {
    return
  }
  return (
    <>
    <UserContext.Provider value={currUser}>
    <NavigationBar  doLogout={doLogout}/> 

    <Routes>
      <Route path='/' element={<Homepage getMealsByDayAndTime={getMealsByDayAndTime} meals={meals}/>} />
      <Route path='/login' element={<Login  doLogin={doLogin}/>} />
      <Route path='/signup' element={<Signup doSignUp={doSignUp}/>} />
      <Route path='/search' element={<Search  fetchDataWithName={fetchDataWithName} fetchDataByNutrients={fetchDataByNutrients} search={search}/>} />

      <Route path='*' element={<NotFound />} />
    </Routes>
    </UserContext.Provider>
    </>
  );
}

export default App;
