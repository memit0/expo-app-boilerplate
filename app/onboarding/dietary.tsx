import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useFoodLog } from '@/contexts/FoodLogContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type DietaryPreference = 'omnivore' | 'vegetarian' | 'vegan' | 'pescatarian';

const dietaryPreferences: { id: DietaryPreference; label: string; description: string }[] = [
  {
    id: 'omnivore',
    label: 'Omnivore',
    description: 'Eat both plant and animal-based foods',
  },
  {
    id: 'vegetarian',
    label: 'Vegetarian',
    description: 'No meat, but includes dairy and eggs',
  },
  {
    id: 'vegan',
    label: 'Vegan',
    description: 'No animal products',
  },
  {
    id: 'pescatarian',
    label: 'Pescatarian',
    description: 'Vegetarian but includes fish and seafood',
  },
];

export default function DietaryScreen() {
  const router = useRouter();
  const { userProfile, setUserProfile } = useFoodLog();
  const [selectedPreference, setSelectedPreference] = useState<DietaryPreference>('omnivore');

  const handleNext = async () => {
    try {
      await setUserProfile({
        ...userProfile!,
        dietaryPreference: selectedPreference,
      });
      router.push('/onboarding/goals');
    } catch (error) {
      console.error('Error saving dietary preference:', error);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <View style={styles.header}>
            <ThemedText type="title" style={styles.title}>
              Dietary Preferences
            </ThemedText>
            <ThemedText style={styles.description}>
              Select your dietary preference to help us provide personalized food recommendations
            </ThemedText>
          </View>

          <View style={styles.options}>
            {dietaryPreferences.map((preference) => (
              <TouchableOpacity
                key={preference.id}
                style={[
                  styles.option,
                  selectedPreference === preference.id && styles.optionSelected,
                ]}
                onPress={() => setSelectedPreference(preference.id)}
                activeOpacity={0.7}
              >
                <View style={styles.optionContent}>
                  <ThemedText type="defaultSemiBold" style={styles.optionLabel}>
                    {preference.label}
                  </ThemedText>
                  <ThemedText style={styles.optionDescription}>
                    {preference.description}
                  </ThemedText>
                </View>
                {selectedPreference === preference.id && (
                  <MaterialCommunityIcons name="check-circle" size={24} color="#0A7EA4" />
                )}
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity 
            style={styles.button} 
            onPress={handleNext}
            activeOpacity={0.7}
          >
            <ThemedText type="defaultSemiBold" style={styles.buttonText}>
              Continue
            </ThemedText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    opacity: 0.7,
    lineHeight: 24,
  },
  options: {
    gap: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  optionSelected: {
    backgroundColor: 'rgba(10,126,164,0.1)',
  },
  optionContent: {
    flex: 1,
    gap: 4,
  },
  optionLabel: {
    fontSize: 16,
  },
  optionDescription: {
    fontSize: 14,
    opacity: 0.7,
  },
  button: {
    backgroundColor: '#0A7EA4',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 32,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
}); 