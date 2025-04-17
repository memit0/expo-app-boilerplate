import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

interface FoodItemProps {
  name: string;
  calories: number;
  servingSize: string;
  onRemove?: () => void;
  onEdit?: () => void;
}

export default function FoodItem({ name, calories, servingSize, onRemove, onEdit }: FoodItemProps) {
  const colorScheme = useColorScheme();

  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].card }]}>
      <View style={styles.content}>
        <View>
          <Text style={[styles.name, { color: Colors[colorScheme ?? 'light'].text }]}>
            {name}
          </Text>
          <Text style={[styles.details, { color: Colors[colorScheme ?? 'light'].text }]}>
            {servingSize} • {calories} kcal
          </Text>
        </View>
        <View style={styles.actions}>
          {onEdit && (
            <TouchableOpacity onPress={onEdit} style={styles.actionButton}>
              <Ionicons name="pencil-outline" size={20} color={Colors[colorScheme ?? 'light'].text} />
            </TouchableOpacity>
          )}
          {onRemove && (
            <TouchableOpacity onPress={onRemove} style={styles.actionButton}>
              <Ionicons name="trash-outline" size={20} color={Colors[colorScheme ?? 'light'].text} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    marginBottom: 8,
    padding: 12,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  details: {
    fontSize: 14,
    opacity: 0.7,
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
}); 