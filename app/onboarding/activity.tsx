import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useFoodLog } from '@/contexts/FoodLogContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive';

const activityLevels: { id: ActivityLevel; label: string; description: string }[] = [
  {
    id: 'sedentary',
    label: 'Sedentary',
    description: 'Little or no exercise, desk job',
  },
  {
    id: 'light',
    label: 'Lightly Active',
    description: 'Light exercise 1-3 days/week',
  },
  {
    id: 'moderate',
    label: 'Moderately Active',
    description: 'Moderate exercise 3-5 days/week',
  },
  {
    id: 'active',
    label: 'Very Active',
    description: 'Hard exercise 6-7 days/week',
  },
  {
    id: 'veryActive',
    label: 'Extremely Active',
    description: 'Hard exercise daily & physical job',
  },
];

export default function ActivityScreen() {
  const router = useRouter();
  const { userProfile, setUserProfile } = useFoodLog();
  const [selectedLevel, setSelectedLevel] = useState<ActivityLevel>('moderate');

  const handleNext = async () => {
    try {
      await setUserProfile({
        ...userProfile!,
        activityLevel: selectedLevel,
      });
      router.push('/onboarding/dietary');
    } catch (error) {
      console.error('Error saving activity level:', error);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <View style={styles.header}>
            <ThemedText type="title" style={styles.title}>
              Activity Level
            </ThemedText>
            <ThemedText style={styles.description}>
              Select your activity level to help us calculate your daily calorie needs
            </ThemedText>
          </View>

          <View style={styles.options}>
            {activityLevels.map((level) => (
              <TouchableOpacity
                key={level.id}
                style={[
                  styles.option,
                  selectedLevel === level.id && styles.optionSelected,
                ]}
                onPress={() => setSelectedLevel(level.id)}
              >
                <View style={styles.optionContent}>
                  <ThemedText type="defaultSemiBold" style={styles.optionLabel}>
                    {level.label}
                  </ThemedText>
                  <ThemedText style={styles.optionDescription}>
                    {level.description}
                  </ThemedText>
                </View>
                {selectedLevel === level.id && (
                  <MaterialCommunityIcons name="check-circle" size={24} color="#0A7EA4" />
                )}
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.button} onPress={handleNext}>
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