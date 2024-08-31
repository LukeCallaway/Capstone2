import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "";



class SpoonacularApi {
  static apiKey = ''
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

  // used if a dish name IS included in the search
  static async getMealsBySearch(query, data, removedKey){
    const params = SpoonacularApi.objToParams(data, removedKey)
    const res = await axios.get(`${SpoonacularApi.baseUrl}complexSearch?apiKey=${SpoonacularApi.apiKey}&query=${query}&addRecipeNutrition=true&number=1${params}`);
    console.log('get by name', res)
    return res;
  }

  // used if a dish name IS NOT included in the search
  static async getMealsByNutrients(data, removedKey){
    const params = SpoonacularApi.objToParams(data, removedKey);
    const res = await axios.get(`${SpoonacularApi.baseUrl}findByNutrients?apiKey=${SpoonacularApi.apiKey}&number=1${params}`);
    console.log(res)
    return res;
  }

  static async getNutrientsByMeal(id){
    // endpoint to retrieve the macros of a selected meal
    const res = await axios.get(`${SpoonacularApi.baseUrl}${id}/nutritionWidget.json?apiKey=${SpoonacularApi.apiKey}`);
    return res;
  }
}

export default SpoonacularApi;