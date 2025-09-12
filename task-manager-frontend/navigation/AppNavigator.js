// navigation/AppNavigator.js
import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import TaskListScreen from '../screens/TaskListScreen';
import AddTaskScreen from '../screens/AddTaskScreen';
import SplashScreen from '../screens/SplashScreen';
import { getToken } from '../utils/auth';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Brief splash, then always show Login first per spec
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <SplashScreen />;

  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Register" 
        component={RegisterScreen} 
        options={{ 
          title: 'Create Account',
          headerStyle: { backgroundColor: '#2e78b7' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' }
        }} 
      />
      <Stack.Screen 
        name="TaskList" 
        component={TaskListScreen} 
        options={{ 
          title: 'Task Manager',
          headerLeft: null, // Prevent back navigation
          headerStyle: { backgroundColor: '#2e78b7' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' }
        }} 
      />
      <Stack.Screen 
        name="AddTask" 
        component={AddTaskScreen} 
        options={{ 
          title: 'Add Task',
          headerStyle: { backgroundColor: '#2e78b7' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' }
        }} 
      />
    </Stack.Navigator>
  );
}
