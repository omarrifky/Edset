import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import BottomNavbar from '../components/bottomNavbar';

const GuestStack = createStackNavigator();

export default function AuthStack(setUser) {
  return (
    <GuestStack.Navigator initialRouteName='Login' headerMode='none'>
      <GuestStack.Screen name='Login' component={LoginScreen} />
      <GuestStack.Screen name='Signup' component={SignupScreen} />
      <GuestStack.Screen name='Bottom' component={BottomNavbar} options={{ headerShown: false, headerMode: false }}
      />
    </GuestStack.Navigator>
  );
}