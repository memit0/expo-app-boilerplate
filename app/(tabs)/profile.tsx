import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useFoodLog } from '@/contexts/FoodLogContext';
import { UserProfile } from '@/types';

type ActivityLevel = UserProfile['activityLevel'];
type DietaryPreference = UserProfile['dietaryPreference'];

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const { userProfile, setUserProfile } = useFoodLog();
  const [formData, setFormData] = useState({
    name: userProfile?.name || '',
    age: userProfile?.age.toString() || '',
    weight: userProfile?.weight.toString() || '',
    height: userProfile?.height.toString() || '',
    activityLevel: (userProfile?.activityLevel || 'moderate') as ActivityLevel,
    dietaryPreference: (userProfile?.dietaryPreference || 'omnivore') as DietaryPreference,
  });

  const activityLevels: { id: ActivityLevel; label: string }[] = [
    { id: 'sedentary', label: 'Sedentary' },
    { id: 'light', label: 'Light' },
    { id: 'moderate', label: 'Moderate' },
    { id: 'active', label: 'Active' },
    { id: 'veryActive', label: 'Very Active' },
  ];

  const dietaryPreferences: { id: DietaryPreference; label: string }[] = [
    { id: 'omnivore', label: 'Omnivore' },
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'vegan', label: 'Vegan' },
    { id: 'pescatarian', label: 'Pescatarian' },
  ];

  const handleSave = async () => {
    try {
      await setUserProfile({
        name: formData.name,
        age: parseInt(formData.age),
        weight: parseFloat(formData.weight),
        height: parseFloat(formData.height),
        activityLevel: formData.activityLevel,
        dietaryPreference: formData.dietaryPreference,
      });
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      {/* Personal Information */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
          Personal Information
        </Text>
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: Colors[colorScheme ?? 'light'].text }]}>Name</Text>
          <TextInput
            style={[styles.input, { color: Colors[colorScheme ?? 'light'].text }]}
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
          />
        </View>
        <View style={styles.row}>
          <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
            <Text style={[styles.label, { color: Colors[colorScheme ?? 'light'].text }]}>Age</Text>
            <TextInput
              style={[styles.input, { color: Colors[colorScheme ?? 'light'].text }]}
              value={formData.age}
              keyboardType="numeric"
              onChangeText={(text) => setFormData({ ...formData, age: text })}
            />
          </View>
          <View style={[styles.inputGroup, { flex: 1 }]}>
            <Text style={[styles.label, { color: Colors[colorScheme ?? 'light'].text }]}>Weight (kg)</Text>
            <TextInput
              style={[styles.input, { color: Colors[colorScheme ?? 'light'].text }]}
              value={formData.weight}
              keyboardType="numeric"
              onChangeText={(text) => setFormData({ ...formData, weight: text })}
            />
          </View>
        </View>
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: Colors[colorScheme ?? 'light'].text }]}>Height (cm)</Text>
          <TextInput
            style={[styles.input, { color: Colors[colorScheme ?? 'light'].text }]}
            value={formData.height}
            keyboardType="numeric"
            onChangeText={(text) => setFormData({ ...formData, height: text })}
          />
        </View>
      </View>

      {/* Activity Level */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
          Activity Level
        </Text>
        <View style={styles.optionsContainer}>
          {activityLevels.map((level) => (
            <TouchableOpacity
              key={level.id}
              style={[
                styles.optionButton,
                formData.activityLevel === level.id && {
                  backgroundColor: Colors[colorScheme ?? 'light'].tint,
                },
              ]}
              onPress={() => setFormData({ ...formData, activityLevel: level.id })}
            >
              <Text
                style={[
                  styles.optionText,
                  { color: formData.activityLevel === level.id ? 'white' : Colors[colorScheme ?? 'light'].text },
                ]}
              >
                {level.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Dietary Preference */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
          Dietary Preference
        </Text>
        <View style={styles.optionsContainer}>
          {dietaryPreferences.map((preference) => (
            <TouchableOpacity
              key={preference.id}
              style={[
                styles.optionButton,
                formData.dietaryPreference === preference.id && {
                  backgroundColor: Colors[colorScheme ?? 'light'].tint,
                },
              ]}
              onPress={() => setFormData({ ...formData, dietaryPreference: preference.id })}
            >
              <Text
                style={[
                  styles.optionText,
                  { color: formData.dietaryPreference === preference.id ? 'white' : Colors[colorScheme ?? 'light'].text },
                ]}
              >
                {preference.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Save Button */}
      <TouchableOpacity
        style={[styles.saveButton, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
        onPress={handleSave}
      >
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
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
  row: {
    flexDirection: 'row',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  optionButton: {
    padding: 12,
    borderRadius: 8,
    margin: 4,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  optionText: {
    fontSize: 16,
  },
  saveButton: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
}); 