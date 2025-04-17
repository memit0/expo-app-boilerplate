import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { searchFoods } from '@/services/api';
import { FoodSearchResult } from '@/types';
import { useFoodLog } from '@/contexts/FoodLogContext';

export default function AddFoodModal() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { addFoodLog } = useFoodLog();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<FoodSearchResult[]>([]);
  const [selectedFood, setSelectedFood] = useState<FoodSearchResult | null>(null);
  const [servingSize, setServingSize] = useState('');

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      try {
        const results = await searchFoods(searchQuery);
        setSearchResults(results);
      } catch (error) {
        console.error('Error searching foods:', error);
      }
    }
  };

  const handleAddFood = async () => {
    if (selectedFood && servingSize) {
      try {
        await addFoodLog({
          date: new Date().toISOString().split('T')[0],
          mealType: 'lunch', // Default to lunch, can be changed
          food: {
            ...selectedFood,
            nutrients: [], // This would be populated with actual nutrient data
          },
          servingSize: parseFloat(servingSize),
        });
        router.back();
      } catch (error) {
        console.error('Error adding food:', error);
      }
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
          <Ionicons name="close" size={24} color={Colors[colorScheme ?? 'light'].text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>
          Add Food
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.searchInput, { color: Colors[colorScheme ?? 'light'].text }]}
          placeholder="Search for food..."
          placeholderTextColor={Colors[colorScheme ?? 'light'].text + '80'}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
          <Ionicons name="search" size={24} color={Colors[colorScheme ?? 'light'].text} />
        </TouchableOpacity>
      </View>

      {selectedFood ? (
        <View style={styles.selectedFood}>
          <Text style={[styles.foodName, { color: Colors[colorScheme ?? 'light'].text }]}>
            {selectedFood.name}
          </Text>
          <Text style={[styles.foodDetails, { color: Colors[colorScheme ?? 'light'].text }]}>
            {selectedFood.calories} kcal per {selectedFood.servingSize}{selectedFood.servingUnit}
          </Text>
          <View style={styles.servingInput}>
            <Text style={[styles.label, { color: Colors[colorScheme ?? 'light'].text }]}>
              Serving Size ({selectedFood.servingUnit}):
            </Text>
            <TextInput
              style={[styles.input, { color: Colors[colorScheme ?? 'light'].text }]}
              value={servingSize}
              onChangeText={setServingSize}
              keyboardType="numeric"
              placeholder="Enter serving size"
              placeholderTextColor={Colors[colorScheme ?? 'light'].text + '80'}
            />
          </View>
          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
            onPress={handleAddFood}
          >
            <Text style={styles.addButtonText}>Add Food</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.foodItem, { backgroundColor: Colors[colorScheme ?? 'light'].card }]}
              onPress={() => setSelectedFood(item)}
            >
              <Text style={[styles.foodName, { color: Colors[colorScheme ?? 'light'].text }]}>
                {item.name}
              </Text>
              <Text style={[styles.foodDetails, { color: Colors[colorScheme ?? 'light'].text }]}>
                {item.calories} kcal per {item.servingSize}{item.servingUnit}
              </Text>
            </TouchableOpacity>
          )}
          style={styles.resultsList}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  closeButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  searchButton: {
    padding: 8,
  },
  resultsList: {
    flex: 1,
  },
  foodItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  foodName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  foodDetails: {
    fontSize: 14,
    opacity: 0.7,
  },
  selectedFood: {
    padding: 16,
  },
  servingInput: {
    marginTop: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  addButton: {
    marginTop: 24,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
}); 