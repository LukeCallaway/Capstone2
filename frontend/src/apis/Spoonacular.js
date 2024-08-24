import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "";



class SpoonacularApi {
  static apiKey = '35882e9e41a74c1d919273583120c85f'
  static baseUrl = 'https://api.spoonacular.com/recipes/'

  // turn an object into str 
  // used to turn obj into url params
  // return => `&key=value` 
  static objToParams = (obj, removedKey) => {
    let str = '';
    for(let [key,value] of Object.entries(obj)){
        if( key !== removedKey && value !== ''){
          str += (`&${key}=${value}`)
        } 
    }
    return str;
  }

// , minCarbs = 0, maxCarbs = 100, minProtein = 0, maxProtein = 100, minFats = 0, maxFats = 100
  static async getMealsBySearch(query, data, removedKey){
    const params = SpoonacularApi.objToParams(data, removedKey)
    const res = await axios.get(`${SpoonacularApi.baseUrl}complexSearch?apiKey=${SpoonacularApi.apiKey}&query=${query}&addRecipeNutrition=true&number=1${params}`);
    return res;
  }

  static async getMealsByNutrients(data, removedKey){
    const params = SpoonacularApi.objToParams(data, removedKey);
    const res = await axios.get(`${SpoonacularApi.baseUrl}findByNutrients?apiKey=${SpoonacularApi.apiKey}&number=1${params}`);
    return res;
  }

  static async getNutrientsByMeal(id){
    // endpoint to retrieve the macros of a selected meal
    // res.calories res.carbs res.fat res.protein => "{num}g" <= res for each of the keys {numberOfEach grams}
    const res = await axios.get(`${SpoonacularApi.baseUrl}${id}/nutritionWidget.json?apiKey=${SpoonacularApi.apiKey}`);
    return res;
  }
}

export default SpoonacularApi;