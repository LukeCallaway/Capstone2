class Macros {
    constructor(calories, protein, carbs, fats) {
        this.calories = calories;
        this.protein = protein;
        this.carbs = carbs;
        this.fats = fats;
    }

    isEnoughhCalories(calories){
        return this.calories >= calories
    }

    isEnoughhProtein(protein){
        return this.protein >= protein
    }

    isEnoughhCarbs(carbs){
        return this.carbs >= carbs
    }
    
    isEnoughhFats(fats){
        return this.fats >= fats
    }
}