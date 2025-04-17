import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProfile, FoodLog, DailySummary } from '@/types';

interface FoodLogContextType {
  userProfile: UserProfile | null;
  foodLogs: FoodLog[];
  dailySummary: DailySummary | null;
  setUserProfile: (profile: UserProfile) => Promise<void>;
  addFoodLog: (log: Omit<FoodLog, 'id'>) => Promise<void>;
  removeFoodLog: (id: string) => Promise<void>;
  updateFoodLog: (id: string, log: Partial<FoodLog>) => Promise<void>;
}

const FoodLogContext = createContext<FoodLogContextType | undefined>(undefined);

export function FoodLogProvider({ children }: { children: React.ReactNode }) {
  const [userProfile, setUserProfileState] = useState<UserProfile | null>(null);
  const [foodLogs, setFoodLogs] = useState<FoodLog[]>([]);
  const [dailySummary, setDailySummary] = useState<DailySummary | null>(null);

  // Load data from AsyncStorage on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [profileData, logsData] = await Promise.all([
        AsyncStorage.getItem('userProfile'),
        AsyncStorage.getItem('foodLogs'),
      ]);

      if (profileData) {
        setUserProfileState(JSON.parse(profileData));
      }
      if (logsData) {
        setFoodLogs(JSON.parse(logsData));
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const setUserProfile = async (profile: UserProfile) => {
    try {
      await AsyncStorage.setItem('userProfile', JSON.stringify(profile));
      setUserProfileState(profile);
    } catch (error) {
      console.error('Error saving user profile:', error);
    }
  };

  const addFoodLog = async (log: Omit<FoodLog, 'id'>) => {
    try {
      const newLog = {
        ...log,
        id: Date.now().toString(),
      };
      const updatedLogs = [...foodLogs, newLog];
      await AsyncStorage.setItem('foodLogs', JSON.stringify(updatedLogs));
      setFoodLogs(updatedLogs);
      updateDailySummary(updatedLogs);
    } catch (error) {
      console.error('Error adding food log:', error);
    }
  };

  const removeFoodLog = async (id: string) => {
    try {
      const updatedLogs = foodLogs.filter(log => log.id !== id);
      await AsyncStorage.setItem('foodLogs', JSON.stringify(updatedLogs));
      setFoodLogs(updatedLogs);
      updateDailySummary(updatedLogs);
    } catch (error) {
      console.error('Error removing food log:', error);
    }
  };

  const updateFoodLog = async (id: string, log: Partial<FoodLog>) => {
    try {
      const updatedLogs = foodLogs.map(item =>
        item.id === id ? { ...item, ...log } : item
      );
      await AsyncStorage.setItem('foodLogs', JSON.stringify(updatedLogs));
      setFoodLogs(updatedLogs);
      updateDailySummary(updatedLogs);
    } catch (error) {
      console.error('Error updating food log:', error);
    }
  };

  const updateDailySummary = (logs: FoodLog[]) => {
    // Calculate daily summary based on food logs
    const today = new Date().toISOString().split('T')[0];
    const todayLogs = logs.filter(log => log.date === today);

    const summary: DailySummary = {
      date: today,
      totalCalories: 0,
      macros: {
        protein: 0,
        carbs: 0,
        fats: 0,
      },
      nutrients: {},
    };

    todayLogs.forEach(log => {
      summary.totalCalories += log.food.calories * (log.servingSize / log.food.servingSize);
      
      // Add macro and nutrient calculations here
      // This is a simplified version
    });

    setDailySummary(summary);
  };

  return (
    <FoodLogContext.Provider
      value={{
        userProfile,
        foodLogs,
        dailySummary,
        setUserProfile,
        addFoodLog,
        removeFoodLog,
        updateFoodLog,
      }}
    >
      {children}
    </FoodLogContext.Provider>
  );
}

export function useFoodLog() {
  const context = useContext(FoodLogContext);
  if (context === undefined) {
    throw new Error('useFoodLog must be used within a FoodLogProvider');
  }
  return context;
} 