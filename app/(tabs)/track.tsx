import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { useFoodLog } from '@/contexts/FoodLogContext';
import FoodItem from '@/components/FoodItem';

export default function TrackScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { foodLogs, removeFoodLog } = useFoodLog();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const mealCategories = [
    { id: 'breakfast', name: 'Breakfast' },
    { id: 'lunch', name: 'Lunch' },
    { id: 'dinner', name: 'Dinner' },
    { id: 'snacks', name: 'Snacks' },
    { id: 'supplements', name: 'Supplements' },
  ];

  const handleAddFood = () => {
    router.push('/modal');
  };

  const handleRemoveFood = async (id: string) => {
    await removeFoodLog(id);
  };

  const getFoodsForMeal = (mealType: string) => {
    const dateStr = selectedDate.toISOString().split('T')[0];
    return foodLogs.filter(
      log => log.date === dateStr && log.mealType === mealType
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <ScrollView style={styles.scrollView}>
        {/* Date Selector */}
        <View style={styles.dateSelector}>
          <TouchableOpacity onPress={() => {
            const newDate = new Date(selectedDate);
            newDate.setDate(newDate.getDate() - 1);
            setSelectedDate(newDate);
          }}>
            <Ionicons name="chevron-back" size={24} color={Colors[colorScheme ?? 'light'].text} />
          </TouchableOpacity>
          <Text style={[styles.dateText, { color: Colors[colorScheme ?? 'light'].text }]}>
            {selectedDate.toLocaleDateString()}
          </Text>
          <TouchableOpacity onPress={() => {
            const newDate = new Date(selectedDate);
            newDate.setDate(newDate.getDate() + 1);
            setSelectedDate(newDate);
          }}>
            <Ionicons name="chevron-forward" size={24} color={Colors[colorScheme ?? 'light'].text} />
          </TouchableOpacity>
        </View>

        {/* Meal Categories */}
        {mealCategories.map((category) => {
          const foods = getFoodsForMeal(category.id);
          return (
            <View key={category.id} style={styles.mealCategory}>
              <View style={styles.mealHeader}>
                <Text style={[styles.mealTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
                  {category.name}
                </Text>
                <TouchableOpacity 
                  style={styles.addButton}
                  onPress={handleAddFood}
                >
                  <Ionicons name="add-circle-outline" size={24} color={Colors[colorScheme ?? 'light'].tint} />
                </TouchableOpacity>
              </View>
              {foods.map((food) => (
                <FoodItem
                  key={food.id}
                  name={food.food.name}
                  calories={food.food.calories * (food.servingSize / food.food.servingSize)}
                  servingSize={`${food.servingSize}${food.food.servingUnit}`}
                  onRemove={() => handleRemoveFood(food.id)}
                />
              ))}
            </View>
          );
        })}
      </ScrollView>

      {/* Floating Add Button */}
      <TouchableOpacity 
        style={[styles.floatingButton, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
        onPress={handleAddFood}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  dateText: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 16,
  },
  mealCategory: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  mealTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  addButton: {
    padding: 4,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
}); 