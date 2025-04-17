import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

interface NutrientProgressProps {
  name: string;
  value: number;
  target: number;
  unit?: string;
}

export default function NutrientProgress({ name, value, target, unit = '' }: NutrientProgressProps) {
  const colorScheme = useColorScheme();
  const percentage = Math.min((value / target) * 100, 100);
  
  // Determine color based on percentage
  const getColor = () => {
    if (percentage < 50) return '#ff3b30'; // red
    if (percentage < 80) return '#ffcc00'; // yellow
    return '#34c759'; // green
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.name, { color: Colors[colorScheme ?? 'light'].text }]}>
          {name}
        </Text>
        <Text style={[styles.value, { color: Colors[colorScheme ?? 'light'].text }]}>
          {value.toFixed(1)}{unit} / {target.toFixed(1)}{unit}
        </Text>
      </View>
      <View style={[styles.progressBar, { backgroundColor: Colors[colorScheme ?? 'light'].card }]}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${percentage}%`,
              backgroundColor: getColor(),
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
  },
  value: {
    fontSize: 14,
    opacity: 0.7,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
}); 