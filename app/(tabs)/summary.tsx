import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { useFoodLog } from '@/contexts/FoodLogContext';
import NutrientProgress from '@/components/NutrientProgress';

export default function SummaryScreen() {
  const colorScheme = useColorScheme();
  const { dailySummary } = useFoodLog();
  const screenWidth = Dimensions.get('window').width;

  // Mock data for demonstration
  const nutrientData = {
    labels: ['Vit A', 'Vit C', 'Vit D', 'Iron', 'Calcium'],
    datasets: [
      {
        data: [80, 60, 30, 90, 70],
      },
    ],
  };

  const essentialNutrients = [
    { id: 'vitaminA', name: 'Vitamin A', target: 900, unit: 'μg' },
    { id: 'vitaminC', name: 'Vitamin C', target: 90, unit: 'mg' },
    { id: 'vitaminD', name: 'Vitamin D', target: 15, unit: 'μg' },
    { id: 'iron', name: 'Iron', target: 18, unit: 'mg' },
    { id: 'calcium', name: 'Calcium', target: 1000, unit: 'mg' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      {/* Daily Summary */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
          Daily Summary
        </Text>
        <View style={styles.summaryCard}>
          <Text style={[styles.calorieText, { color: Colors[colorScheme ?? 'light'].text }]}>
            {dailySummary?.totalCalories.toFixed(0) || 0} / 2000 kcal
          </Text>
          <Text style={[styles.calorieSubtext, { color: Colors[colorScheme ?? 'light'].text }]}>
            Daily Goal
          </Text>
        </View>
      </View>

      {/* Macronutrient Distribution */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
          Macronutrients
        </Text>
        <View style={styles.chartContainer}>
          <LineChart
            data={nutrientData}
            width={screenWidth - 32}
            height={220}
            chartConfig={{
              backgroundColor: Colors[colorScheme ?? 'light'].background,
              backgroundGradientFrom: Colors[colorScheme ?? 'light'].background,
              backgroundGradientTo: Colors[colorScheme ?? 'light'].background,
              decimalPlaces: 0,
              color: (opacity = 1) => Colors[colorScheme ?? 'light'].tint,
              labelColor: (opacity = 1) => Colors[colorScheme ?? 'light'].text,
              style: {
                borderRadius: 16,
              },
            }}
            bezier
            style={styles.chart}
          />
        </View>
      </View>

      {/* Nutrient Progress */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
          Nutrient Progress
        </Text>
        {essentialNutrients.map((nutrient) => (
          <NutrientProgress
            key={nutrient.id}
            name={nutrient.name}
            value={dailySummary?.nutrients[nutrient.id]?.value || 0}
            target={nutrient.target}
            unit={nutrient.unit}
          />
        ))}
      </View>

      {/* Deficiency Insights */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
          Deficiency Insights
        </Text>
        <View style={styles.insightCard}>
          <Text style={[styles.insightTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
            Vitamin D
          </Text>
          <Text style={[styles.insightText, { color: Colors[colorScheme ?? 'light'].text }]}>
            You're consistently below the recommended daily intake. Consider adding more fatty fish or fortified foods to your diet.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  summaryCard: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  calorieText: {
    fontSize: 32,
    fontWeight: '700',
  },
  calorieSubtext: {
    fontSize: 16,
    opacity: 0.7,
  },
  chartContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  insightCard: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 12,
    padding: 16,
  },
  insightTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  insightText: {
    fontSize: 16,
    lineHeight: 24,
  },
}); 