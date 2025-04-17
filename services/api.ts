import { FoodSearchResult, FoodDetails } from '@/types';

const USDA_API_KEY = process.env.EXPO_PUBLIC_USDA_API_KEY;
const BASE_URL = 'https://api.nal.usda.gov/fdc/v1';

export async function searchFoods(query: string): Promise<FoodSearchResult[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/foods/search?api_key=${USDA_API_KEY}&query=${encodeURIComponent(query)}&pageSize=20`
    );
    
    if (!response.ok) {
      throw new Error('Failed to search foods');
    }

    const data = await response.json();
    return data.foods.map((food: any) => ({
      id: food.fdcId,
      name: food.description,
      brand: food.brandOwner,
      calories: food.foodNutrients?.find((n: any) => n.nutrientId === 1008)?.value || 0,
      servingSize: food.servingSize || 100,
      servingUnit: food.servingSizeUnit || 'g',
    }));
  } catch (error) {
    console.error('Error searching foods:', error);
    throw error;
  }
}

export async function getFoodDetails(fdcId: string): Promise<FoodDetails> {
  try {
    const response = await fetch(
      `${BASE_URL}/food/${fdcId}?api_key=${USDA_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to get food details');
    }

    const data = await response.json();
    return {
      id: data.fdcId,
      name: data.description,
      brand: data.brandOwner,
      servingSize: data.servingSize || 100,
      servingUnit: data.servingSizeUnit || 'g',
      nutrients: data.foodNutrients.map((nutrient: any) => ({
        id: nutrient.nutrientId,
        name: nutrient.nutrientName,
        value: nutrient.value,
        unit: nutrient.unitName,
      })),
    };
  } catch (error) {
    console.error('Error getting food details:', error);
    throw error;
  }
} 