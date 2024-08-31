class Macros {

    static isEnoughCalories(calories, userCalories){
        return calories >= userCalories
    }

    static isEnoughProtein(protein, userProtein){
        return protein >= userProtein
    }

    static isEnoughCarbs(carbs, userCarbs){
        return carbs >= userCarbs
    }
    
    static isEnoughFats(fats, userFats){
        return fats >= userFats
    }
}

export default Macros;