import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useFoodLog } from '@/contexts/FoodLogContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type WeightGoal = 'maintain' | 'lose' | 'gain';

const weightGoals: { id: WeightGoal; label: string; description: string }[] = [
  {
    id: 'maintain',
    label: 'Maintain Weight',
    description: 'Keep your current weight',
  },
  {
    id: 'lose',
    label: 'Lose Weight',
    description: 'Gradually reduce your weight',
  },
  {
    id: 'gain',
    label: 'Gain Weight',
    description: 'Gradually increase your weight',
  },
];

export default function GoalsScreen() {
  const router = useRouter();
  const { userProfile, setUserProfile } = useFoodLog();
  const [selectedGoal, setSelectedGoal] = useState<WeightGoal>('maintain');

  const handleNext = async () => {
    try {
      await setUserProfile({
        ...userProfile!,
        weightGoal: selectedGoal,
      });
      router.push('/onboarding/final');
    } catch (error) {
      console.error('Error saving weight goal:', error);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <View style={styles.header}>
            <ThemedText type="title" style={styles.title}>
              Weight Goals
            </ThemedText>
            <ThemedText style={styles.description}>
              Select your primary weight goal to help us personalize your nutrition plan
            </ThemedText>
          </View>

          <View style={styles.options}>
            {weightGoals.map((goal) => (
              <TouchableOpacity
                key={goal.id}
                style={[
                  styles.option,
                  selectedGoal === goal.id && styles.optionSelected,
                ]}
                onPress={() => setSelectedGoal(goal.id)}
              >
                <View style={styles.optionContent}>
                  <ThemedText type="defaultSemiBold" style={styles.optionLabel}>
                    {goal.label}
                  </ThemedText>
                  <ThemedText style={styles.optionDescription}>
                    {goal.description}
                  </ThemedText>
                </View>
                {selectedGoal === goal.id && (
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