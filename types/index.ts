export interface FoodSearchResult {
  id: string;
  name: string;
  brand?: string;
  calories: number;
  servingSize: number;
  servingUnit: string;
}

export interface FoodDetails extends FoodSearchResult {
  nutrients: Nutrient[];
}

export interface Nutrient {
  id: number;
  name: string;
  value: number;
  unit: string;
}

export type UserProfile = {
  name: string;
  age: number;
  weight: number;
  height: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive';
  dietaryPreference: 'omnivore' | 'vegetarian' | 'vegan' | 'pescatarian';
  weightGoal: 'maintain' | 'lose' | 'gain';
};

export interface FoodLog {
  id: string;
  date: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks' | 'supplements';
  food: FoodDetails;
  servingSize: number;
}

export interface DailySummary {
  date: string;
  totalCalories: number;
  macros: {
    protein: number;
    carbs: number;
    fats: number;
  };
  nutrients: {
    [key: string]: {
      value: number;
      target: number;
      unit: string;
    };
  };
} 