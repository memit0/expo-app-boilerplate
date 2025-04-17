import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFoodLog } from '@/contexts/FoodLogContext';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function FinalScreen() {
  const router = useRouter();
  const { userProfile } = useFoodLog();
  const { setIsOnboarded } = useOnboarding();

  const handleComplete = async () => {
    try {
      await setIsOnboarded(true);
      router.replace('/(tabs)/summary');
    } catch (error) {
      console.error('Error completing onboarding:', error);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <View style={styles.header}>
            <ThemedText type="title" style={styles.title}>
              All Set!
            </ThemedText>
            <ThemedText style={styles.description}>
              Your profile is complete. Here's a summary of your information:
            </ThemedText>
          </View>

          <View style={styles.summary}>
            <View style={styles.summaryItem}>
              <MaterialCommunityIcons name="account" size={24} color="#0A7EA4" />
              <View style={styles.summaryText}>
                <ThemedText type="defaultSemiBold">{userProfile?.name}</ThemedText>
                <ThemedText style={styles.summarySubtext}>
                  {userProfile?.age} years old
                </ThemedText>
              </View>
            </View>

            <View style={styles.summaryItem}>
              <MaterialCommunityIcons name="scale" size={24} color="#0A7EA4" />
              <View style={styles.summaryText}>
                <ThemedText type="defaultSemiBold">
                  {userProfile?.weight} kg
                </ThemedText>
                <ThemedText style={styles.summarySubtext}>
                  {userProfile?.height} cm
                </ThemedText>
              </View>
            </View>

            <View style={styles.summaryItem}>
              <MaterialCommunityIcons name="run" size={24} color="#0A7EA4" />
              <View style={styles.summaryText}>
                <ThemedText type="defaultSemiBold">
                  {userProfile?.activityLevel}
                </ThemedText>
                <ThemedText style={styles.summarySubtext}>
                  Activity Level
                </ThemedText>
              </View>
            </View>

            <View style={styles.summaryItem}>
              <MaterialCommunityIcons name="food-apple" size={24} color="#0A7EA4" />
              <View style={styles.summaryText}>
                <ThemedText type="defaultSemiBold">
                  {userProfile?.dietaryPreference}
                </ThemedText>
                <ThemedText style={styles.summarySubtext}>
                  Dietary Preference
                </ThemedText>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleComplete}>
            <ThemedText type="defaultSemiBold" style={styles.buttonText}>
              Start Tracking
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
  summary: {
    gap: 16,
    marginBottom: 32,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  summaryText: {
    flex: 1,
  },
  summarySubtext: {
    fontSize: 14,
    opacity: 0.7,
  },
  button: {
    backgroundColor: '#0A7EA4',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 'auto',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
}); 